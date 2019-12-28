import _ from "lodash";
import { WithFunctionModel } from "./FunctionModel";
import { Model, ValidateError } from "@quick-qui/model-core";
import { functionWeavers } from "./FunctionWeavers";
import { FunctionValidator } from "./FunctionValidator";
import { deepMerge, withNamespace, withBuildingContext } from "../Merge";

const functionDefine = {
  validatePiece(): ValidateError[] {
    return [];
  },

  merge(model: Model, piece: any, buildingContext: any): Model {
    return deepMerge(model, {
      functionModel: {
        functions: withBuildingContext(
          withNamespace(piece.functions??[], buildingContext),
          buildingContext
        )
      }
    });
  },
  validateAfterMerge(model: Model): ValidateError[] {
    return new FunctionValidator().validate(model);
  },
  validateAfterWeave(): ValidateError[] {
    return [];
  },
  weavers: functionWeavers
};
export default functionDefine;
