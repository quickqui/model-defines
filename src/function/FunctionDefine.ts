import _ from "lodash";
import { WithFunctionModel } from "./FunctionModel";
import { Model, ValidateError } from "@quick-qui/model-core";
import { functionWeavers } from "./FunctionWeavers";
import { FunctionValidator } from "./FunctionValidator";
import { deepMerge } from "../Merge";

const functionDefine = {
  validatePiece(): ValidateError[] {
    return [];
  },

  merge(model: Model , piece: any): Model {
    return deepMerge(model, {
      functionModel: { functions: piece.functions ?? [] }
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
