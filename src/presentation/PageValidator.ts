import { ModelValidator, ValidateError, Model } from "@quick-qui/model-core";
import { withPresentationModel } from "./PageModel";
import { withFunctionModel } from "../function/FunctionModel";

export class PageValidator implements ModelValidator {
  validate(model: Model): ValidateError[] {
    return functionExistsValidator(model);
  }
}

function functionExistsValidator(model: Model): ValidateError[] {
  const fm = withFunctionModel(model);
  if (!fm) {
    if (withPresentationModel(model)?.pageModel?.pages?.length ?? 0 > 0) {
      return [new ValidateError("model", "no function model find")];
    } else {
      return [];
    }
  }
  return (
    withPresentationModel(model)
      ?.pageModel.pages.map(page => {
        const funNames: string[] = page.places.map(place => place.function);
        funNames
          .map(functionName => {
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
            }
          })
          .flat();
      })
      .flat() ?? []
  );
}
