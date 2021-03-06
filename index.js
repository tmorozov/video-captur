// @ts-nocheck
import { startButton, stopButton, videoSelect } from "./globals.js";
import { onStart, onStop, onCameraSelect } from "./handlers.js";

startButton.addEventListener("click", onStart, false);
stopButton.addEventListener("click", onStop, false);

navigator.mediaDevices
  .enumerateDevices()
  .then((devices) => {
    devices.forEach((device, i) => {
      let option = document.createElement("option");
      option.value = device.deviceId;
      if (device.kind === "videoinput") {
        option.text = device.label || "Camera " + (videoSelect.length + 1);
        videoSelect.appendChild(option);
      }
    });
  })
  .catch(log);

  let option = document.createElement("option");
  option.value = null;
  option.text = 'none'
  videoSelect.appendChild(option);
  
  videoSelect.addEventListener("change", onCameraSelect, true);