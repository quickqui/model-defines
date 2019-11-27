interface Object {
  p;
  _: () => _.Object<Object>;
}
Object.prototype.p = function<O, T>(this: O, fun: (obj: O) => T): T {
  return fun(this);
};
Object.prototype._ = function() {
  return _(this);
};
