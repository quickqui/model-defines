
import { Model, ModelValidator, ValidateError } from "@quick-qui/model-core";
import enjoi from "enjoi";
import { ImplementationModel, withImplementationModel } from ".";
import schema from "./ImplementationSchema.json";
export class ImplementationValidator implements ModelValidator {
  validate(model: Model): ValidateError[] {
    return [
      ...(withImplementationModel(model)?.implementationModel?.q_applyTo(bySchema) ?? []),
    ];
  }
}
const s = enjoi.schema(schema);
function bySchema(model: ImplementationModel): ValidateError[] {
  return model.implementations
    .filter((im) => !(im.abstract === true))
    .map((im) => {
      const { error } = s.validate(im, { abortEarly: false });

      return (
        error?.details.map(
          (detail) =>
            new ValidateError(
              `implementations/${im.name ?? "_noName"}`,
              detail.message
            )
        ) ?? []
      );
    })
    .flat();
}
