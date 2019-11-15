import { Annotation, Extend } from "../BaseDefine";

export interface WithFunctionModel {
  functionModel: FunctionModel;
}

export interface FunctionModel {
  functions: Function[];
}

export interface Function {
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
  links: Link[];
  annotations: Annotation[];
}
interface Command {
  implementation: string;
  parameters: object;
  prefill: object;
}
interface Query {
  filter: object;
  sort: object;
}

interface Link {
  label: string;
  type: "entity" | "list";
  page: string;
  args: object;
}

interface Entry {
  menuPath: string;
  icon: string;
}
