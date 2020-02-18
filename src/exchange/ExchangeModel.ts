import { Model } from "@quick-qui/model-core";
import { StringKeyObject, WithNamespace, WithParameters } from "../BaseDefine";
import { WithAnnotations } from "../Annotation";

export function withExchangeModel(model: Model): WithExchangeModel | undefined {
  if ((model as any).exchangeModel) {
    return model as WithExchangeModel;
  } else {
    return undefined;
  }
}

export function exchanges(model: Model): Exchange[] {
  return withExchangeModel(model)?.exchangeModel?.exchanges ?? [];
}

export interface WithExchangeModel {
  exchangeModel: ExchangeModel;
}

export interface ExchangeModel {
  exchanges: Exchange[];
}

export interface Exchange
  extends WithNamespace,
    WithAnnotations,
    WithParameters {
  from: string;
  to: string; //externals, front, back, database,
  protocol: string; //dp, rest, grapghql
  //TODO exchange的extension是用于实现的，不合适，考虑放到implementation模型。
  extension?: string;
  resources: string[];
  order?: number;
}
