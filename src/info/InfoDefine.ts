import { Model, ValidateError } from "@quick-qui/model-core";
import { deepMerge, withNamespace, withBuildingContext } from "../Merge";
import { InfoValidator, resourceRefEntity } from "./InfoValidator";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(model: Model, piece: any, buildingContext: any): Model {
    return deepMerge(model, {
      infoModel: {
        infos: withBuildingContext(
          withNamespace(piece.infos ?? [], buildingContext),
          buildingContext
        ),
      },
    });
  },

  validateAfterMerge(model: Model): ValidateError[] {
    return new InfoValidator().validate(model);
  },
  validateAfterWeave(model: Model): ValidateError[] {
    return resourceRefEntity(model);
  },
  weavers: [],
};
export default define;
