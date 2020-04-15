import { Model, ValidateError } from "@quick-qui/model-core";
import { pageWeavers } from "./PageWeaver";
import { WithPresentationModel } from "./PageModel";
import { deepMerge, withNamespace, withBuildingContext } from "../Merge";
import { PageValidator } from "./PageValidator";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(
    model: Model & WithPresentationModel,
    piece: any,
    buildingContext: any
  ): Model {
    return deepMerge(model, {
      pageModel: {
        pages:  withBuildingContext( withNamespace(piece.pages ?? [], buildingContext),buildingContext)
      }
    });
  },

  validateAfterMerge(model: Model): ValidateError[] {
    return new PageValidator().validate(model);
  },
  validateAfterWeave(model: Model): ValidateError[] {
    return [];
  },
  weavers: pageWeavers
};
export default define;
