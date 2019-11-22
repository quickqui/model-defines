import { Model, ValidateError } from "@quick-qui/model-core";
import { WithPresentationModel } from "./PageModel";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(model: Model, piece: any): Model {
    const _model = model as Model & WithPresentationModel;
    return {
      ..._model,
      presentationModel: {
        ..._model.presentationModel,
        presentations: [
          ...(_model.presentationModel?.presentations ?? []),
          ...(piece.presentations ?? [])
        ]
      }
    } as Model;
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
