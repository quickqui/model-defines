import { Model, ValidateError } from "@quick-qui/model-core";
import { WithPresentationModel } from "./PageModel";
import { deepMerge } from "../Util";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(model: Model, piece: any): Model {
    //   return {
    //     ..._model,
    //     presentationModel: {
    //       ..._model.presentationModel,
    //       presentations: [
    //         ...(_model.presentationModel?.presentations ?? []),
    //         ...(piece.presentations ?? [])
    //       ]
    //     }
    //   } as Model;
    // },
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
