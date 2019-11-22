import { Model, ValidateError } from "@quick-qui/model-core";
import { pageWeavers } from "./PageWeaver";
import { WithPresentationModel } from "./PageModel";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(model: Model, piece: any): Model {
    const _model = model as Model & WithPresentationModel;
    return {
      ..._model,
      pageModel: {
        ..._model.pageModel,
        pages: [...(_model.pageModel?.pages || []), ...(piece.pages || [])]
      }
    } as Model;
  },

  validateAfterMerge(model: Model): ValidateError[] {
    return [];
  },
  validateAfterWeave(model: Model): ValidateError[] {
    return [];
  },
  weavers: pageWeavers
};
export default define;
