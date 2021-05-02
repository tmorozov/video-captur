import { logElement } from "./globals.js";

export function log(msg) {
  logElement.innerHTML += msg + "\n";
}
