import { Model, ValidateError } from "@quick-qui/model-core";
import { pageWeavers } from "./PageWeaver";
import { WithPresentationModel } from "./PageModel";
import { deepMerge } from "../Util";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(model: Model & WithPresentationModel, piece: any): Model {
    const _model = model as Model;
    // return {
    //   ..._model,
    //   pageModel: {
    //     ..._model.pageModel,
    //     pages: [...(_model.pageModel?.pages || []), ...(piece.pages || [])]
    //   }
    // } as Model;
    return deepMerge(model, {pageModel:{pages:piece.pages??[]}})
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
