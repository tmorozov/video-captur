export const preview = document.getElementById("preview");
export const recording = document.getElementById("recording");
export const startButton = document.getElementById("startButton");
export const stopButton = document.getElementById("stopButton");
export const downloadButton = document.getElementById("downloadButton");
export const logElement = document.getElementById("log");
export const videoSelect = document.getElementById("videoSourceSelect");

export const recordingTimeMS = 5000;

export function wait(delayInMS) {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
}
