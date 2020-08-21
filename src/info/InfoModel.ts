import { WithAnnotations } from "../Annotation";
import { StringKeyObject, WithNamespace, WithParameters } from "../BaseDefine";
import { Model } from "@quick-qui/model-core";

export interface Info extends WithAnnotations, WithNamespace, WithParameters {
  scope: string; // global? domain session config page local
  type: string; // resource event
  resources?: string[];
  events?: string[];
  init?: object

  //annotations:
  // - implementation:
  // - - at: front\back
  // - - source: resolve/storage/rest/graphQl/fake, 
  //TODO config/session的source是啥？
  // - - fakeData:...
  // - - order
  //NOTE exchange model 应该是算是infoMode的一个实现
}
export function withInfoModel(model: Model): WithInfoModel | undefined {
  if ((model as any).infoModel) {
    return model as WithInfoModel;
  } else {
    return undefined;
  }
}

export function infos(model: Model): Info[] {
  return withInfoModel(model)?.infoModel?.infos ?? [];
}

export interface WithInfoModel {
  infoModel: InfoModel;
}

export interface InfoModel {
  infos: Info[];
}
