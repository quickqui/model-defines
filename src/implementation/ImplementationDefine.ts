import { Model, ValidateError } from "@quick-qui/model-core";
import { WithImplementationModel } from "./ImplementationModel";
import { deepMerge, withNamespace, withBuildingContext } from "../Merge";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(
    model: Model & WithImplementationModel,
    piece: any,
    buildingContext: any
  ): Model {
    return deepMerge(model, {
      implementationModel: {
        implementations: withBuildingContext(
          withNamespace(piece.implementations??[], buildingContext),
          buildingContext
        )
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
