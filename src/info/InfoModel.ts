import { WithAnnotations } from "../Annotation";
import {
  StringKeyObject,
  WithNamespace,
  WithParameters,
  Ref,
  parseRef,
} from "../BaseDefine";
import { Model } from "@quick-qui/model-core";

export function findInfo(
  model: WithInfoModel,
  scope: string | undefined,
  name: string
): Info | undefined {
  if (scope !== undefined) {
    return model.infoModel.infos.find(
      (info) => info.scope === scope && info.name === name
    );
  } else {
    return model.infoModel.infos.find((info) => info.name === name);
  }
}

export interface Info extends WithAnnotations, WithNamespace, WithParameters {
  scope: string; // global? domain session config page local model user tenant
  type: string; // resource event
  resources?: string[];
  events?: string[];
  default?: object;
  overwrite?: object;

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
