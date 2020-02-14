import { Model } from "@quick-qui/model-core";
import { WithNamespace, StringKeyObject } from "../BaseDefine";
import { WithAnnotations } from "../Annotation";

export function withImplementationModel(
  model: Model
): WithImplementationModel | undefined {
  if ((model as any).implementationModel) {
    return model as WithImplementationModel;
  } else {
    return undefined;
  }
}

export interface WithImplementationModel {
  implementationModel: ImplementationModel;
}

export interface ImplementationModel {
  implementations: Implementation[];
  env?: StringKeyObject;
}

export interface Implementation extends WithAnnotations, WithNamespace {
  lifeCycle?: StringKeyObject;
  parameters?: StringKeyObject;
  injections?: string[];
  runtime: string;
  env?: StringKeyObject;
}

//TODO 草稿，不一定需要。
export interface Deployment {
  name: string;
  //NOTE docker/npm/../outer?
  type: string;
}
