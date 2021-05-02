const startButton = document.getElementById("start");

startButton.addEventListener(
  "click",
  async function () {
    navigator.getUserMedia(
      { audio: true },
      async function (e) {
        const audioContext = new AudioContext();
        await audioContext.audioWorklet.addModule("clap-detect-processor.js");
        const audioInput = audioContext.createMediaStreamSource(e); // creates an audio node from the mic stream
        const clapDetectNode = new AudioWorkletNode(
          audioContext,
          "clap-detect-processor"
        );
        audioInput.connect(clapDetectNode);
        clapDetectNode.connect(audioContext.destination);
      },
      (err) => console.error(err.message)
    );
  },
  true
);
