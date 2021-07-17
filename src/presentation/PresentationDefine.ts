import { Model, ValidateError } from "@quick-qui/model-core";
import { deepMerge, withNamespace, withBuildingContext } from "../Merge";
import PresentationExtendWeaver from "./PresentationExtendWeaver";
import { PresentationValidator } from './PresentationValidator';

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(model: Model, piece: any, buildingContext: any): Model {
    return deepMerge(model, {
      presentationModel: {
        presentations: withBuildingContext( withNamespace(piece.presentations??[], buildingContext),buildingContext)
      }
    });
  },

  validateAfterMerge(model: Model): ValidateError[] {
    return new PresentationValidator().validate(model);
  },
  validateAfterWeave(model: Model): ValidateError[] {
    return [];
  },
  weavers: [new PresentationExtendWeaver()]
};
export default define;
