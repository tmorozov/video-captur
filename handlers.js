import {
  preview,
  recording,
  downloadButton,
  recordingTimeMS,
} from "./globals.js";
import { log } from "./log.js";
import { startRecording, stop } from "./service.js";

export function onStart() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
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
