import { isFunction, isString } from "../validators";
import { Events } from "./model/event";
import { Listener } from "./model/listener";
import { Unsubscribe } from "./model/unsubscribe";

export class EventEmitter<T extends string> {
  private readonly events: Events = {};

  /**
   * Subscribe for an event
   * @param event
   * @param listener function that will be invoked when certain event happen
   * @returns Unsubscribe callback
   */
  public subscribe(event: T, listener: Listener): Unsubscribe {
    if (!isString(event)) {
      throw new TypeError("event must be valid string");
    }

    if (!isFunction(listener)) {
      throw new TypeError("listener must be valid function");
    }

    if (typeof this.events[event] !== "object") {
      this.events[event] = [];
    }

    if (this.events[event].indexOf(listener) > -1) {
      throw new Error(
        `There is already registered listener for "${event}" event`
      );
    }

    this.events[event].push(listener);
    return () => this.unsubscribe(event, listener);
  }

  /**
   * Unsubscribe listener of event
   * @param event
   * @returns
   */
  private unsubscribe(event: T, listener: Listener): void {
    if (!isString(event)) {
      throw new Error("event must be valid string");
    }

    if (!isFunction(listener)) {
      throw new Error("listener must be a function");
    }

    if (
      typeof this.events[event] === "object" &&
      this.events[event].indexOf(listener) > -1
    ) {
      this.events[event].splice(this.events[event].indexOf(listener), 1);
    }
  }

  /**
   * Invoke an event
   * @param event
   * @param args data that will be passed to listener
   */
  public emit(event: T, ...args: unknown[]): void {
    if (!isString(event)) {
      throw new Error("event must be valid string");
    }

    if (!this.events[event]) {
      return;
    }

    this.events[event].forEach((listener) => {
      listener.apply(this, args);
    });
  }
}
