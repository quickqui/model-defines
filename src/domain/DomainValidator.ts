import { ModelValidator, ValidateError, Model } from "@quick-qui/model-core";
import { WithDomainModel, existEntity } from "./DomainModel";
import { getNameInsureCategory } from "../BaseDefine";

export class DomainValidator implements ModelValidator {
  validate(model: Model): ValidateError[] {
    let re: ValidateError[] = [];
    //TODO 没有完全实现

    const m = model as Model & WithDomainModel;
    if (m.domainModel) {
      m.domainModel.entities.forEach(entity => {
        if (entity.inject) {
          try {
            const name = getNameInsureCategory(entity.inject.ref, "entity");
            if (!existEntity(m, name)) {
              re.push(
                new ValidateError(
                  `no entity find in injection - expect=${name}`
                )
              );
            }
          } catch (e) {
            re.push(new ValidateError(e.message));
          }
        }
      });
    }

    return re;
  }
}
