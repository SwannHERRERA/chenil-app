import pino, { Logger } from "pino";

export class MyLogger {
  private static logger?: Logger;

  public static getLogger() {
    if (typeof this.logger === "undefined") {
      this.logger = pino();
    }
    return this.logger;
  }
}
