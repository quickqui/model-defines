import { Model } from "@quick-qui/model-core";
import { WithNamespace, WithParameters } from "../BaseDefine";
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
/**
 * @deprecated 使用info model。
 */
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
  resources: string[];
  order?: number;
}
