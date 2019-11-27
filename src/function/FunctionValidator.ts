import { ModelValidator, Model, ValidateError } from "@quick-qui/model-core";
import {
  existFunction,
  FunctionModel,
  withFunctionModel
} from "./FunctionModel";
import "../Util";
import { getNameInsureCategory } from "../BaseDefine";
import enjoi from "enjoi";
import * as joi from "@hapi/joi";
import schema from "./FunctionModelSchema.json";
export class FunctionValidator implements ModelValidator {
  validate(model: Model): ValidateError[] {
    let re: ValidateError[] = [];
    //TODO 没有完全实现
    //TODO 注意：resource跟domain/entity不完全相同。
    return [
      ...extendValidate(model),
      ...withFunctionModel(model)?.functionModel?.p(bySchema) ?? []
    ];
  }
}

function extendValidate(model: object): ValidateError[] {
  const re: ValidateError[] = [];
  withFunctionModel(model)?.functionModel.functions.forEach(fun => {
    if (fun.extend) {
      try {
        const name = getNameInsureCategory(fun.extend.ref, "function");
        if (!existFunction(model, name)) {
          re.push(
            new ValidateError(
              `function/${fun.name}`,
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

function bySchema(model: FunctionModel): ValidateError[] {
  const s = enjoi.schema(schema);
  const { error, value } = joi.validate(model, s, { abortEarly: false });
  return (
    error?.details.map(detail => {
      return new ValidateError(`${detail.context}`, detail.message);
    }) ?? []
  );
}
