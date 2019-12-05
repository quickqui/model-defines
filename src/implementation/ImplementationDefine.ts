import { Model, ValidateError } from "@quick-qui/model-core";
import { WithImplementationModel } from "./ImplementationModel";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(model: Model & WithImplementationModel, piece: any): Model {
    return {
      ...model,
      implementationModel: {
        ...model.implementationModel,
        implementations: [
          ...(model.implementationModel?.implementations ?? []),
          ...(piece.implementations ?? [])
        ]
      }
    };
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
