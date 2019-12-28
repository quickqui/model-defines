import { ModelWeaver, Model, ModelWeaveLog } from "@quick-qui/model-core";
import { WithFunctionModel, FunctionModel, Function } from "./FunctionModel";
import { getNameInsureCategory } from "../BaseDefine";
import _ = require("lodash");

export class ExtendWeaver implements ModelWeaver {
  name = "extend";
  weave(model: Model): [Model, ModelWeaveLog[]] {
    const logs: ModelWeaveLog[] = [];
    const m = model as Model & WithFunctionModel;
    m.functionModel.functions.forEach(fun => {
      if (fun.extend) {
        const extendTargetName = getNameInsureCategory(
          fun.extend,
          "functions"
        );
        const extendTarget = getFunction(m.functionModel, extendTargetName);
        if (!extendTarget) {
          logs.push(
            //TODO 这里应该是validate log？
            new ModelWeaveLog(
              `functions/${fun.name}`,
              `no extend function find, expected - ${extendTargetName}`
            )
          );
          
        } else {
          const index = _(m.functionModel.functions).findIndex(
            (f: Function) => fun.name === f.name
          );
          const newFunction = doExtend(fun, extendTarget);
          m.functionModel.functions[index] = newFunction;
          logs.push(
            new ModelWeaveLog(
              `functions/${fun.name}`,
              `extend function, base - ${extendTargetName}, sub - ${fun.name}`
            )
          );
          
        }
      }
    });
    return [m, logs];
  }
}
function doExtend(sub: Function, base: Function): Function {
  //TODO 有些特殊字段需要特殊处理。
  return {
    ...base,
    ...sub,
    abstract: false,
    annotations: { ...base.annotations, ...sub.annotations }
  };
}
function getFunction(m: FunctionModel, name: string): Function | undefined {
  return m.functions.find(fun => fun.name === name);
}
