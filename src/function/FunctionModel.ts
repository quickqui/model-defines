import { Annotation, Extend, WithAnnotations } from "../BaseDefine";
import { Model } from "@quick-qui/model-core";
import _ = require("lodash");

export interface WithFunctionModel {
  functionModel: FunctionModel;
}

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
  prefill?: object;
}
interface Query {
  parameters?: object;
  filter?: object;
  sort?: object;
}

interface Link {
  label: string;
  type: "entity" | "list";
  page: string;
  args: object;
}

interface Entry {
  menuPath: string;
  icon?: string;
}

export function getFunction(
  model: Model & WithFunctionModel,
  name: string
): Function | undefined {
  return model.functionModel!.functions.find(fun => {
    return fun.name === name;
  });
}
export function existFunction(
  model: Model & WithFunctionModel,
  name: string
): boolean {
  return !_(getFunction(model, name)).isNil();
}
