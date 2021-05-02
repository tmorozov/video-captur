import { wait } from "./globals";
import { log } from "./log";

export function startRecording(stream, lengthInMS) {
  let recorder = new MediaRecorder(stream);
  let data = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();
  log(recorder.state + " for " + lengthInMS / 1000 + " seconds...");

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.name);
  });

  let recorded = wait(lengthInMS).then(
    () => recorder.state == "recording" && recorder.stop()
  );

  return Promise.all([stopped, recorded]).then(() => data);
}

export function stop(stream) {
  stream.getTracks().forEach((track) => track.stop());
}
