import { ModelValidator, ValidateError, Model } from "@quick-qui/model-core";
import { withPresentationModel, PageModel } from "./PageModel";
import { withFunctionModel } from "../function/FunctionModel";
import _ from "lodash";

import enjoi from "enjoi";
import * as joi from "@hapi/joi";
import schema from "./PageSchema.json";
export class PageValidator implements ModelValidator {
  validate(model: Model): ValidateError[] {
    return withPresentationModel(model)?.pageModel?.q_applyTo(bySchema) ?? []

  }
}

export function pageFunctionExistsValidator(model: Model): ValidateError[] {
  const fm = withFunctionModel(model);
  if (!fm) {
    if (withPresentationModel(model)?.pageModel?.pages?.length ?? 0 > 0) {
      return [new ValidateError("model", "no function model find")];
    } else {
      return [];
    }
  }
  const re = withPresentationModel(model)?.pageModel.pages.flatMap(page => {
    const funNames: string[] = page.places.map(place => place.function);
    return funNames.flatMap(functionName => {
      const findFunction = fm.functionModel.functions.find(
        fun => fun.name === functionName
      );
      if (!findFunction) {
        return [
          new ValidateError(
            `pages/${page.name}`,
            `no function find - ${functionName}`
          )
        ];
      } else {
        return [];
      }
    });
  });
  return re ?? [];
}

const s = enjoi.schema(schema);
function bySchema(model: PageModel): ValidateError[] {
  return (model.pages ?? [])
    .map(page => {
      const { error, value } = joi.validate(page, s, { abortEarly: false });
      return (
        error?.details.map(
          detail =>
            new ValidateError(`pages/${page.name ?? "_noName"}`, detail.message)
        ) ?? []
      );
    })
    .flat();
}
