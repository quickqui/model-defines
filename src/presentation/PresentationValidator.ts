import { ValidateError, ModelValidator, Model } from "@quick-qui/model-core";
import { withPresentationModel } from "./PageModel";
import enjoi from "enjoi";
import schema from "./PresentationSchema.json";
import { PresentationModel } from "./PresentationModel";

export class PresentationValidator implements ModelValidator {
  validate(model: Model): ValidateError[] {
    return withPresentationModel(model)?.presentationModel?.q_applyTo(bySchema) ?? [];
  }
}

const s = enjoi.schema(schema);
function bySchema(model: PresentationModel): ValidateError[] {
  return (model.presentations ?? [])
    .map(presentation => {
      const { error, value } = s.validate(presentation,  {
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
