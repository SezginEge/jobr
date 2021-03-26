import { Listener } from "./event-emitter/model/listener";
import { Unsubscribe } from "./event-emitter/model/unsubscribe";

export interface Job<T> {
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  subscribe: (event: T, listener: Listener) => Unsubscribe;
}
