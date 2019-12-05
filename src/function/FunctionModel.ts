import { Extend, StringKeyObject } from "../BaseDefine";
import { Annotation, WithAnnotations } from "../Annotation";
import { Model } from "@quick-qui/model-core";
import _ = require("lodash");

export interface WithFunctionModel {
  functionModel: FunctionModel;
}

export function withFunctionModel(model: Model): WithFunctionModel | undefined {
  if ((model as any).functionModel) {
    return model as WithFunctionModel;
  } else {
    return undefined;
  }
}

//TODO extension for model 
// declare module "@quick-qui/model-core"{
//   export interface Model{
//      wFunctionModel(this:Model):WithFunctionModel| undefined
//   }
// }

// Model.prototype.wFunctionModel = function(this:Model){
//   return withFunctionModel(this)
// }




export interface FunctionModel {
  functions: Function[];
}
//TODO  没有想清楚，function的建模到底如何，在此之前，仅支持支持完全extend形式，crud、button、card……
//TODO  问题： model不应该过问实现。当crud是否是一种实现方式？应该说，crud是一种function，这种function，它有着“天然”的实现。
//      暂时以放在annotation的办法解决。
export interface Function extends WithAnnotations {
  abstract?: boolean;
  name: string;
  resource: string;
  extend?: Extend;
  //TODO 问题，如果有多个command，prefill应该听谁的？
  commands?: Command[];
  query?: Query[];
  //TODO 移到annotation中。
  roles?: string[];
  //TODO 移到annotation中。
  entry?: Entry;
  //TODO 问题：只有list才有links？
  links?: Link[];
}
interface Command {
  prefill?: StringKeyObject;
}
interface Query {
  parameters?: StringKeyObject;
  filter?: StringKeyObject;
  sort?: StringKeyObject;
}

interface Link {
  label: string;
  type: "entity" | "list";
  page: string;
  args: StringKeyObject;
}

interface Entry {
  menuPath: string;
  icon?: string;
}

export function getFunction(
  model: Model ,
  name: string
): Function | undefined {
  return withFunctionModel(model)?.functionModel.functions.find(fun => {
    return fun.name === name;
  });
}
export function existFunction(
  model: Model ,
  name: string
): boolean {
  return !_(getFunction(model, name)).isNil();
}
