document.getElementById('speakButton').addEventListener('click', () => {
    const textInput = document.getElementById('textInput').value;

    if (!textInput) {
        alert('Please enter some text.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(textInput);
    const synth = window.speechSynthesis;

    // Start speaking
    synth.speak(utterance);

    // Prepare for recording the speech
    const audioChunks = [];
    const mediaRecorder = new MediaRecorder(new AudioContext().createMediaStreamDestination().stream);

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const downloadLink = document.getElementById('downloadButton');
        downloadLink.href = audioUrl;
        downloadLink.download = 'speech.wav';
        downloadLink.style.display = 'block';
    };

    mediaRecorder.start();

    // Stop recording after the utterance has finished
    utterance.onend = () => {
        mediaRecorder.stop();
    };
});