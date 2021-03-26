/**
 * Validators that used to check runtime types
 */
import { Config } from "./config";

export const isString = (obj: string) => {
  return !!obj && typeof obj === "string";
};

export const isFunction = (obj: unknown) => {
  return !!obj && typeof obj === "function";
};

export const isNumber = (obj: number) => {
  return !!obj && typeof obj === "number";
};

const isObject = (obj: unknown) => {
  return !!obj && typeof obj === "object";
};

export const isConfig = (obj: Config) => {
  return (
    isObject(obj) &&
    isString(obj.name) &&
    isFunction(obj.task) &&
    isNumber(obj.interval)
  );
};
