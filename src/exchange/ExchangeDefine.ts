import { Model, ValidateError } from "@quick-qui/model-core";
import { deepMerge, withNamespace, withBuildingContext } from "../Merge";
import { ExchangeValidator } from "./ExchangeValidator";

const define = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },
  merge(model: Model, piece: any, buildingContext: any): Model {
    return deepMerge(model, {
      exchangeModel: {
        exchanges: withBuildingContext(
          withNamespace(piece.exchanges??[], buildingContext),
          buildingContext
        )
      }
    });
  },

  validateAfterMerge(model: Model): ValidateError[] {
    return new ExchangeValidator().validate(model);
  },
  validateAfterWeave(model: Model): ValidateError[] {
    return [];
  },
  weavers: []
};
export default define;
