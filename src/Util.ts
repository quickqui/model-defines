import l from "lodash";
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
