import { Model } from "@quick-qui/model-core";
import { WithNamespace } from "../BaseDefine";
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
}

export interface Implementation extends WithAnnotations,  WithNamespace{
  lifeCycle?: { [key: string]: any };
  parameters?: { [key: string]: any };
  injections?: string[]
}

//TODO 草稿，不一定需要。
export interface Deployment {
  name: string;
  //NOTE docker/npm/../outer?
  type: string;
}
