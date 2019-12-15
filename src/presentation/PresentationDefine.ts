import { Model, ValidateError } from "@quick-qui/model-core";
import { WithPresentationModel } from "./PageModel";
import { deepMerge } from "../Merge";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(model: Model, piece: any): Model {
    return deepMerge(model, {
      presentationModel: { presentations: piece.presentations ?? [] }
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
