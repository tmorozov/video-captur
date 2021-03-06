const startButton = document.getElementById("start");
startButton.addEventListener(
  "click",
  async function () {
    const audioContext = new AudioContext();
    await audioContext.audioWorklet.addModule("white-noise-processor.js");
    const whiteNoiseNode = new AudioWorkletNode(
      audioContext,
      "white-noise-processor"
    );
    whiteNoiseNode.connect(audioContext.destination);
  },
  true
);
