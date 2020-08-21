interface DefineHelper<T> {
  wrapped: T | undefined;
}
export function help(fun:Function| undefined):FunctionDefineHelper{
    return new FunctionDefineHelper(fun)
}
export class FunctionDefineHelper implements DefineHelper<Function> {
  constructor(public wrapped: Function | undefined) {}
  func = (name: string, extend?: string): DefineHelper<Function> => {
    const f = {
      name,
      extend,
    };
    return new FunctionDefineHelper(this.wrapped);
  };
}
