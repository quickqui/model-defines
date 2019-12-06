import l from "lodash";
import  mergeOptions from "merge-options";

declare global {
  interface Object {
    p;
    _;
  }
}
Object.prototype.p = function<O, T>(this: O, fun: (obj: O) => T): T {
  return fun(this);
};
Object.prototype._ = function() {
  return l(this);
};

export function deepMerge<T>(obj: T, source: any): T {
  return mergeOptions.call({ concatArrays: true }, obj, source) as T;
}
