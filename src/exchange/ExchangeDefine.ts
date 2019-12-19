import { Model, ValidateError } from "@quick-qui/model-core";
import { deepMerge } from "../Merge";
import { ExchangeValidator } from "./ExchangeValidator";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(model: Model, piece: any): Model {
    return deepMerge(model, {
      exchangeModel: { exchanges: piece.exchanges ?? [] }
    });
  },

  validateAfterMerge(model: Model): ValidateError[] {
    return new ExchangeValidator().validate(model);
  },
  validateAfterWeave(model: Model): ValidateError[] {
    return [];
  },
  weavers: []
};
export default define;
