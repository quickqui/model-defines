import _ from "lodash";
import { Function, WithFunctionModel } from "./FunctionModel";
import {
  ModelDefine,
  Model,
  ModelWeaveLog,
  ValidateError
} from "@quick-qui/model-core";
import { functionWeavers } from "./FunctionWeavers";
import { FunctionValidator } from "./FunctionValidator";

const functionDefine = {
  validatePiece(piece: any): ValidateError[] {
    return [];
  },

  merge(model: Model & WithFunctionModel, piece: any): Model {
    return {
      ...model,
      functionModel: {
        ...model.functionModel,
        functions: [
          ...(model.functionModel?.functions ?? []),
          ...(piece.functions ?? [])
        ]
      }
    };
  },
  validateAfterMerge(model: Model): ValidateError[] {
    return new FunctionValidator().validate(model);
  },
  validateAfterWeave(model: Model): ValidateError[] {
    return [];
  },
  weavers: functionWeavers
};
export default functionDefine;
