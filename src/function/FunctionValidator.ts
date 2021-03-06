import { ModelValidator, Model, ValidateError } from "@quick-qui/model-core";
import {
  existFunction,
  FunctionModel,
  withFunctionModel
} from "./FunctionModel";
import { getNameInsureCategory } from "../BaseDefine";
import enjoi from "enjoi";
import * as joi from "@hapi/joi";
import schema from "./FunctionSchema.json";
import _ from "lodash";
import '@quick-qui/util/dist/extensions'
export class FunctionValidator implements ModelValidator {
  validate(model: Model): ValidateError[] {
    let re: ValidateError[] = [];
    //TODO 没有完全实现
    return [
      ...extendValidate(model),
      ...(withFunctionModel(model)?.functionModel?.applyTo(bySchema) ?? [])
    ];
  }
}

function extendValidate(model: Model): ValidateError[] {
  const re: ValidateError[] = [];
  withFunctionModel(model)?.functionModel.functions.forEach(fun => {
    if (fun.extend) {
      try {
        const name = getNameInsureCategory(fun.extend, "functions");
        if (!existFunction(model, name)) {
          re.push(
            new ValidateError(
              `functions/${fun.name}`,
              `no function find in extend - expect=${name}`
            )
          );
        }
      } catch (e) {
        re.push(new ValidateError(`function/${fun.name}`, e.message));
      }
    }
  });
  return re;
}

const s = enjoi.schema(schema);
function bySchema(model: FunctionModel): ValidateError[] {
  return model.functions
    .filter(fun => !(fun.abstract === true))
    .map(fun => {
      const { error, value } = joi.validate(fun, s, { abortEarly: false });

      return (
        error?.details.map(
          detail =>
            new ValidateError(
              `functions/${fun.name ?? "_noName"}`,
              detail.message
            )
        ) ?? []
      );
    })
    .flat();
}
