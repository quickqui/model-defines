import { ModelValidator, Model, ValidateError } from "@quick-qui/model-core";
import { withInfoModel, InfoModel } from "./InfoModel";
import enjoi from "enjoi";
import schema from "./InfoSchema.json";
import { existEntity, WithDomainModel } from "../domain/DomainModel";
export class InfoValidator implements ModelValidator {
  validate(model: Model): ValidateError[] {
    return [
      // ...resourceRefEntity(model),
      ...(withInfoModel(model)?.infoModel?.q_applyTo(bySchema) ?? []),
    ];
  }
}
export function resourceRefEntity(model: Model): ValidateError[] {
  const re: ValidateError[] = [];

  withInfoModel(model)?.infoModel.infos.forEach((info) => {
    const re: ValidateError[] = [];
    (info.entities ?? []).forEach((entity) => {
      if (!existEntity(model as WithDomainModel, entity))
        re.push(
          new ValidateError(
            `info/${info.name}`,
            `no entity for resource find - expect=${entity}`
          )
        );
    });
  });
  return re;
}
const s = enjoi.schema(schema);

function bySchema(model: InfoModel): ValidateError[] {
  return model.infos
    .map((info) => {
      const { error } = s.validate(info, { abortEarly: false });
      return (
        error?.details.map(
          (detail) =>
            new ValidateError(`infos/${info.name ?? "_noName"}`, detail.message)
        ) ?? []
      );
    })
    .flat();
}
