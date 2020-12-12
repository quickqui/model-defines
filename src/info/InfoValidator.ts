import { ModelValidator, Model, ValidateError } from "@quick-qui/model-core";
import { withInfoModel, InfoModel } from "./InfoModel";
import enjoi from "enjoi";
import * as joi from "@hapi/joi";
import schema from "./InfoSchema.json";
export class InfoValidator implements ModelValidator {
  validate(model: Model): ValidateError[] {
    let re: ValidateError[] = [];
    //TODO 没有完全实现
    return withInfoModel(model)?.infoModel?.applyTo(bySchema) ?? [];
  }
}
const s = enjoi.schema(schema);

function bySchema(model: InfoModel): ValidateError[] {
  return model.infos
    .map(info => {
      const { error, value } = joi.validate(info, s, { abortEarly: false });
      return (
        error?.details.map(
          detail =>
            new ValidateError(
              `infos/${info.name ?? "_noName"}`,
              detail.message
            )
        ) ?? [] 
      );
    })
    .flat();
}
