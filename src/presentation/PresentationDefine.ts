import { Model, ValidateError } from "@quick-qui/model-core";
import { deepMerge, withNamespace } from "../Merge";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(model: Model, piece: any, buildingContext: any): Model {
    return deepMerge(model, {
      presentationModel: {
        presentations: withNamespace(piece.presentations??[], buildingContext)
      }
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
