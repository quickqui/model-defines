import { ModelValidator, ValidateError, Model } from "@quick-qui/model-core";
import { WithDomainModel, existEntity, DomainModel } from "./DomainModel";
import { getNameInsureCategory } from "../BaseDefine";
import Ajv from "ajv";
import schema from "./DomainModelSchema.json";

export class DomainValidator implements ModelValidator {
  validate(model: Model): ValidateError[] {
    let re: ValidateError[] = [];
    //TODO 没有完全实现

    injectValidate(model, re);
    const m = model as Model & WithDomainModel
    bySchema(m.domainModel)
    return re;
  }
}
function injectValidate(model: object, re: ValidateError[]) {
  const m = model as Model & WithDomainModel;
  if (m.domainModel) {
    m.domainModel.entities.forEach(entity => {
      if (entity.inject) {
        try {
          const name = getNameInsureCategory(entity.inject.ref, "entity");
          if (!existEntity(m, name)) {
            re.push(
              new ValidateError(`entity/${entity.name}`,`no entity find in injection - expect=${name}`)
            );
          }
        } catch (e) {
          re.push(new ValidateError(`entity/${entity.name}`,e.message));
        }
      }
    });
  }
}

function bySchema(model: DomainModel): boolean {
  const ajv = new Ajv();
  const valid = ajv.validate(schema, model);
  if (!valid) {
    console.log(ajv.errors);
  }
  return true;
}
