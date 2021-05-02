import { logElement } from "./globals";

export function log(msg) {
  logElement.innerHTML += msg + "\n";
}
