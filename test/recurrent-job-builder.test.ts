import { RecurrentJob } from "../src/recurrent-job";
import { RecurrentJobBuilder } from "../src/recurrent-job-builder";

describe("given RecurrentJobBuilder", () => {
  test("when runtime check fails for name, throws a TypeError", () => {
    expect(() => new RecurrentJobBuilder().name({} as any)).toThrow(
      new TypeError("name must be string")
    );

    expect(() => new RecurrentJobBuilder().name(undefined as any)).toThrow(
      new TypeError("name must be string")
    );

    expect(() => new RecurrentJobBuilder().name(null as any)).toThrow(
      new TypeError("name must be string")
    );
  });

  test("when runtime check fails for interval, throws a TypeError", () => {
    expect(() => new RecurrentJobBuilder().interval({} as any)).toThrow(
      new TypeError("interval must be number")
    );

    expect(() => new RecurrentJobBuilder().interval(undefined as any)).toThrow(
      new TypeError("interval must be number")
    );

    expect(() => new RecurrentJobBuilder().interval(null as any)).toThrow(
      new TypeError("interval must be number")
    );
  });

  test("when runtime check fails for task, throws a TypeError", () => {
    expect(() => new RecurrentJobBuilder().task({} as any)).toThrow(
      new TypeError("task must be a function")
    );

    expect(() => new RecurrentJobBuilder().task(undefined as any)).toThrow(
      new TypeError("task must be a function")
    );

    expect(() => new RecurrentJobBuilder().task(null as any)).toThrow(
      new TypeError("task must be a function")
    );
  });

  test("when build invoked, it returns a RecurrentJob instance", () => {
    const builder = new RecurrentJobBuilder();
    const job = builder
      .name("test")
      .interval(1000)
      .task(() => {
        return;
      })
      .build();

    expect(job instanceof RecurrentJob).toBe(true);
  });
});
