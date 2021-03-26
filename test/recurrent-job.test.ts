import { RecurrentJob } from "../src/recurrent-job";
import { Config } from "../src/config";

describe("given RecurrentJob", () => {
  jest.useFakeTimers();

  const defaultTaskName = "test";
  const getJob = (config?: Partial<Config>) => {
    const defaultConfig: Config = {
      name: defaultTaskName,
      task: () => {
        return;
      },
      interval: 1000
    };

    return new RecurrentJob({
      ...defaultConfig,
      ...config
    });
  };

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("when invalid config provided, throws a TypeError", () => {
    expect(() => new RecurrentJob(undefined as any)).toThrow(
      new TypeError(
        "config is not valid. Use RecorrentJobBuilder as recommended"
      )
    );

    expect(() => new RecurrentJob(null as any)).toThrow(
      new TypeError(
        "config is not valid. Use RecorrentJobBuilder as recommended"
      )
    );

    expect(() => new RecurrentJob({} as any)).toThrow(
      new TypeError(
        "config is not valid. Use RecorrentJobBuilder as recommended"
      )
    );
  });

  test("when start invoked twice, throws an Error", () => {
    const job = getJob();
    job.start();
    expect(() => job.start()).toThrow(
      new Error(`${defaultTaskName} already started`)
    );
  });

  test("when stop invoked for not started job, throws an error", () => {
    const job = getJob();
    expect(() => job.stop()).toThrow(
      new Error(`${defaultTaskName} not started yet`)
    );
  });

  test("when stop invoked, job gets stopped and stopped event listener invoked", (callback) => {
    const job = getJob();
    job.subscribe("stopped", () => {
      expect(job.isRunning).toBe(false);
      callback();
    });
    job.start();
    expect(job.isRunning).toBe(true);
    job.stop();
  });

  test("when error occur, stop the job if stopOnFail set true", () => {
    const job = getJob({
      stopOnFail: true,
      task: () => {
        throw new Error();
      }
    });

    job.start();
    jest.runAllTimers();
    expect(job.isRunning).toBe(false);
  });

  test("when job succedeed, success event listener gets invoked", (callback) => {
    const job = getJob();
    job.subscribe("success", () => {
      callback();
    });
    job.start();
    jest.advanceTimersByTime(1100);
    job.stop();
  });

  test("when job throws an error, error event listener gets invoked", (callback) => {
    const job = getJob({
      task: () => {
        throw new Error();
      }
    });
    job.subscribe("error", () => {
      callback();
    });
    job.start();
    jest.advanceTimersByTime(1100);
    job.stop();
  });

  test("when job invoked, invoked event listener gets invoked", (callback) => {
    const job = getJob();
    job.subscribe("invoked", (jobName: string) => {
      expect(jobName).toEqual(defaultTaskName);
      callback();
    });
    job.start();
    jest.advanceTimersByTime(1100);
    job.stop();
  });
});
