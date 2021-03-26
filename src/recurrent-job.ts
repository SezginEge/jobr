import { Config } from "./config";
import { EventEmitter } from "./event-emitter";
import { Job } from "./job";
import { isConfig } from "./validators";

export type RecurrentJobEvents =
  | "created"
  | "started"
  | "stopped"
  | "invoked"
  | "success"
  | "error";

export class RecurrentJob
  extends EventEmitter<RecurrentJobEvents>
  implements Job<RecurrentJobEvents> {
  private readonly _config: Config;
  private _interval?: ReturnType<typeof setInterval>;

  constructor(config: Config) {
    super();
    if (!isConfig(config)) {
      throw new TypeError(
        "config is not valid. Use RecorrentJobBuilder as recommended"
      );
    }

    this._config = config;
  }

  get isRunning() {
    return !!this._interval;
  }

  private async run() {
    this.emit("invoked", this._config.name);
    try {
      const result = await this._config.task.call(this);
      this.emit("success", result);
    } catch (error) {
      this.emit("error", error);
      if (this._config.stopOnFail) {
        this.stop();
      }
    }
  }

  /**
   * Starts the job
   * @throws an error if job already started
   */
  start() {
    if (this._interval) {
      throw new Error(`${this._config.name} already started`);
    }

    this._interval = setInterval(() => {
      this.run();
    }, this._config.interval);
    this.emit("started");
  }

  /**
   * Stops the job
   * @throws an error if job is not started yet
   */
  stop() {
    if (!this._interval) {
      throw new Error(`${this._config.name} not started yet`);
    }

    clearInterval(this._interval);
    this._interval = undefined;
    this.emit("stopped");
  }
}
