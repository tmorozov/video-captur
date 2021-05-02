import {
  preview,
  recording,
  downloadButton,
  recordingTimeMS,
} from "./globals.js";
import { log } from "./log.js";
import { startRecording, stop } from "./service.js";

const constrans = {
    video: true,
    audio: true,
};

export function onCameraSelect(e) {
    if (e.target.value) {
        constrans.video = {
            deviceId: e.target.value
        };
    } else {
        constrans.video = true;
    }
}

export function onStart() {
  navigator.mediaDevices
    .getUserMedia(constrans)
    .then((stream) => {
      preview.srcObject = stream;
      downloadButton.href = stream;
      preview.captureStream = preview.captureStream || preview.mozCaptureStream;
      return new Promise((resolve) => (preview.onplaying = resolve));
    })
    .then(() => startRecording(preview.captureStream(), recordingTimeMS))
    .then((recordedChunks) => {
      let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      recording.src = URL.createObjectURL(recordedBlob);
      downloadButton.href = recording.src;
      downloadButton.download = "RecordedVideo.webm";

      log(
        "Successfully recorded " +
          recordedBlob.size +
          " bytes of " +
          recordedBlob.type +
          " media."
      );
    })
    .catch(log);
}

export function onStop() {
  stop(preview.srcObject);
}
