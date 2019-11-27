import { ModelValidator, ValidateError, Model } from "@quick-qui/model-core";
import {
  WithDomainModel,
  existEntity,
  DomainModel,
  withDomainModel
} from "./DomainModel";
import { getNameInsureCategory } from "../BaseDefine";
import enjoi from "enjoi";
import * as joi from "@hapi/joi";
import schema from "./DomainModelSchema.json";

export class DomainValidator implements ModelValidator {
  validate(model: Model): ValidateError[] {
    //TODO 没有完全实现

    return [
      ...injectValidate(model),
      ...withDomainModel(model)?.domainModel?.p(bySchema) ?? []
    ];
  }
}
function injectValidate(model: object): ValidateError[] {
  const re: ValidateError[] = [];
  const m = model as Model & WithDomainModel;
  if (m.domainModel) {
    m.domainModel.entities.forEach(entity => {
      if (entity.inject) {
        try {
          const name = getNameInsureCategory(entity.inject.ref, "entity");
          if (!existEntity(m, name)) {
            re.push(
              new ValidateError(
                `entity/${entity.name}`,
                `no entity find in injection - expect=${name}`
              )
            );
          }
        } catch (e) {
          re.push(new ValidateError(`entity/${entity.name}`, e.message));
        }
      }
    });
  }
  return re;
}

function bySchema(model: DomainModel): ValidateError[] {
  const s = enjoi.schema(schema);
  const { error, value } = joi.validate(model, s, { abortEarly: false });
  return (
    error?.details.map(detail => {
      return new ValidateError(`${detail.context}`, detail.message);
    }) ?? []
  );
}
