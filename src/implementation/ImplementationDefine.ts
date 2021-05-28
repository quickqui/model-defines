import { Model, ValidateError } from "@quick-qui/model-core";
import { WithImplementationModel } from "./ImplementationModel";
import { deepMerge, withNamespace, withBuildingContext } from "../Merge";
import { ImplementationExtendWeaver } from "./ExtendWeaver";
import { ImplementationValidator } from "./ImplementationValidator";

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
          withNamespace(piece.implementations ?? [], buildingContext),
          buildingContext
        )
      }
    });
  },

  validateAfterMerge(model: Model): ValidateError[] {
    return new ImplementationValidator().validate(model);
  },
  validateAfterWeave(model: Model): ValidateError[] {
    return [];
  },
  weavers: [new ImplementationExtendWeaver()]
};
export default define;
