import _ from "lodash";
import { Model, ValidateError } from "@quick-qui/model-core";
import { functionWeavers } from "./FunctionWeavers";
import { FunctionValidator, resourceRefEntity } from "./FunctionValidator";
import { deepMerge, withNamespace, withBuildingContext } from "../Merge";

const functionDefine = {
  validatePiece(): ValidateError[] {
    return [];
  },

  merge(model: Model, piece: any, buildingContext: any): Model {
    return deepMerge(model, {
      functionModel: {
        functions: withBuildingContext(
          withNamespace(piece.functions ?? [], buildingContext),
          buildingContext
        ),
      },
    });
  },
  validateAfterMerge(model: Model): ValidateError[] {
    return new FunctionValidator().validate(model);
  },
  validateAfterWeave(model: Model): ValidateError[] {
    return resourceRefEntity(model);
  },
  weavers: functionWeavers,
};
export default functionDefine;
