import { EventEmitter } from "../src/event-emitter";

describe("given EventEmitter", () => {
  test("when runtime check fails for subscribe, throws a TypeError", () => {
    const eventEmitter = new EventEmitter();

    const listener = () => {};
    const event = "success";

    expect(() => eventEmitter.subscribe(null as any, listener)).toThrow(
      new TypeError("event must be valid string")
    );

    expect(() => eventEmitter.subscribe(undefined as any, listener)).toThrow(
      new TypeError("event must be valid string")
    );

    expect(() => eventEmitter.subscribe({} as any, listener)).toThrow(
      new TypeError("event must be valid string")
    );

    expect(() => eventEmitter.subscribe(event, null as any)).toThrow(
      new TypeError("listener must be valid function")
    );

    expect(() => eventEmitter.subscribe(event, undefined as any)).toThrow(
      new TypeError("listener must be valid function")
    );

    expect(() => eventEmitter.subscribe(event, {} as any)).toThrow(
      new TypeError("listener must be valid function")
    );
  });

  test("when subscribe invoked with same listener, throws an error", () => {
    const eventEmitter = new EventEmitter();
    const listener = () => {};
    const eventName = "success";
    eventEmitter.subscribe(eventName, listener);
    expect(() => eventEmitter.subscribe(eventName, listener)).toThrow(
      new Error(`There is already registered listener for "${eventName}" event`)
    );
  });

  test("when subscribed, returns unsubscribe reference", () => {
    const eventEmitter = new EventEmitter();
    const eventName = "success";
    const listener = () => {};
    const unsubscribe = eventEmitter.subscribe(eventName, listener);
    expect(typeof unsubscribe).toBe("function");
    unsubscribe();
    expect(() => eventEmitter.subscribe(eventName, listener)).not.toThrow();
  });

  test("when runtime check fails for emit, throws a TypeError", () => {
    const eventEmitter = new EventEmitter();

    expect(() => eventEmitter.emit(null as any)).toThrow(
      new TypeError("event must be valid string")
    );

    expect(() => eventEmitter.emit(undefined as any)).toThrow(
      new TypeError("event must be valid string")
    );

    expect(() => eventEmitter.emit({} as any)).toThrow(
      new TypeError("event must be valid string")
    );
  });

  test("when emit invoked, listener gets invoked", (callback) => {
    const eventEmitter = new EventEmitter();
    const eventName = "success";
    eventEmitter.subscribe(eventName, () => {
      callback();
    });
    eventEmitter.emit(eventName);
  });
});
