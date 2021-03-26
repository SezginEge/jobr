import { Config } from "./config";
import { RecurrentJob } from "./recurrent-job";
import { isFunction, isNumber, isString } from "./validators";

export class RecurrentJobBuilder {
  private config: Partial<Config> = {};

  name(name: Config["name"]) {
    if (!isString(name)) {
      throw new TypeError("name must be string");
    }

    this.config.name = name;
    return this;
  }

  task(task: Config["task"]) {
    if (!isFunction(task)) {
      throw new TypeError("task must be a function");
    }

    this.config.task = task;
    return this;
  }

  interval(interval: Config["interval"]) {
    if (!isNumber(interval)) {
      throw new TypeError("interval must be number");
    }

    this.config.interval = interval;
    return this;
  }

  stopOnFail(stopOnFail: Config["stopOnFail"]) {
    this.config.stopOnFail = stopOnFail;
    return this;
  }

  build() {
    return new RecurrentJob(this.config as Config);
  }
}
