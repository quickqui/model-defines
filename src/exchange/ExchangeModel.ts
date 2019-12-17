import { Model } from "@quick-qui/model-core";
import { StringKeyObject } from "../BaseDefine";

export function withExchangeModel(model: Model): WithExchangeModel | undefined {
  if ((model as any).exchangeModel) {
    return model as WithExchangeModel;
  } else {
    return undefined;
  }
}

export interface WithExchangeModel {
  exchangeModel: ExchangeModel;
}

export interface ExchangeModel {
  exchanges: Exchange[];
}

export interface Exchange {
  from: string; 
  to: string; //externals, front, back, database, 
  protocol: string; //dp, rest, grapghql
  extension?: string;
  resources: string[];
  order?: number;
  parameters?: StringKeyObject // url if external...
}
