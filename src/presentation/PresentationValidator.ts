import { ValidateError, ModelValidator, Model } from "@quick-qui/model-core";
import { withPresentationModel } from "./PageModel";
import enjoi from "enjoi";
import schema from "./PresentationSchema.json";
import { PresentationModel } from "./PresentationModel";
import * as joi from "@hapi/joi";

export class PresentationValidator implements ModelValidator {
  validate(model: Model): ValidateError[] {
    return withPresentationModel(model)?.presentationModel?.applyTo(bySchema) ?? [];
  }
}

const s = enjoi.schema(schema);
function bySchema(model: PresentationModel): ValidateError[] {
  return (model.presentations ?? [])
    .map(presentation => {
      const { error, value } = joi.validate(presentation, s, {
        abortEarly: false
      });
      return (
        error?.details.map(
          detail =>
            new ValidateError(
              `presentations/${presentation.name ?? "_noName"}`,
              detail.message
            )
        ) ?? []
      );
    })
    .flat();
}
