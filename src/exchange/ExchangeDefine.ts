import { Model, ValidateError } from "@quick-qui/model-core";
import { deepMerge } from "../Merge";

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
    return [];
  },
  validateAfterWeave(model: Model): ValidateError[] {
    return [];
  },
  weavers: []
};
export default define;
