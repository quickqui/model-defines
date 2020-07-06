import { ModelWeaver, Model, ModelWeaveLog } from "@quick-qui/model-core";
import { getNameInsureCategory } from "../BaseDefine";
import _ = require("lodash");
import {
  WithImplementationModel,
  ImplementationModel,
  Implementation,
} from ".";

export class ImplementationExtendWeaver implements ModelWeaver {
  name = "implementationExtend";
  weave(model: Model): [Model, ModelWeaveLog[]] {
    const logs: ModelWeaveLog[] = [];
    const m = model as Model & WithImplementationModel;
    m.implementationModel.implementations.forEach((imp) => {
      if (imp.extend) {
        const extendTargetName = getNameInsureCategory(
          imp.extend,
          "implementations"
        );
        const extendTarget = getImplementation(
          m.implementationModel,
          extendTargetName
        );
        if (!extendTarget) {
          logs.push(
            //TODO 这里应该是validate log？
            new ModelWeaveLog(
              `implementations/${imp.name}`,
              `no extend implementation find, expected - ${extendTargetName}`,true
            )
          );
        } //TODO else if(extendTarget.abstract !== true) logs push ()
        else {
          const index = _(m.implementationModel.implementations).findIndex(
            (i: Implementation) => imp.name === i.name
          );
          const newFunction = doExtend(imp, extendTarget);
          m.implementationModel.implementations[index] = newFunction;
          logs.push(
            new ModelWeaveLog(
              `implementations/${imp.name}`,
              `extend implementation, base - ${extendTargetName}, sub - ${imp.name}`
            )
          );
        }
      }
    });
    return [m, logs];
  }
}
function doExtend(sub: Implementation, base: Implementation): Implementation {
  //TODO 有些特殊字段需要特殊处理。
  return {
    ...base,
    ...sub,
    abstract: false,
    env: { ...base.env, ...sub.env },
    parameters: { ...base.parameters, ...sub.parameters },
    annotations: { ...base.annotations, ...sub.annotations },
  };
}
function getImplementation(
  m: ImplementationModel,
  name: string
): Implementation | undefined {
  return m.implementations.find((imp) => imp.name === name);
}
