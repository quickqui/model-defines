import { Model, ValidateError } from "@quick-qui/model-core";
import { pageWeavers } from "./PageWeaver";
import { WithPresentationModel } from "./PageModel";
import { mergeInPath } from "../Merge";
import { PageValidator, pageFunctionExistsValidator } from "./PageValidator";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(
    model: Model & WithPresentationModel,
    piece: any,
    buildingContext: any
  ): Model {
    return mergeInPath(model,['pageModel','pages'],piece.pages??[],buildingContext)
  },

  validateAfterMerge(model: Model): ValidateError[] {
    return new PageValidator().validate(model);
  },
  validateAfterWeave(model: Model): ValidateError[] {
    return pageFunctionExistsValidator(model);
  },
  weavers: pageWeavers
};
export default define;
