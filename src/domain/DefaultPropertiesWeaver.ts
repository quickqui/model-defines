import { Entity, WithDomainModel } from "./DomainModel";
import _ from "lodash";

import { forEachEntity } from "./DomainModel";

import { ModelWeaveLog, ModelWeaver, Model } from "@quick-qui/model-core/";

//TODO 这个weaver不一定是domain基础级的。不是数据库就一定要这个。
export class DefaultPropertiesWeaver implements ModelWeaver {
  name = "defaultProperties";
  weave(model: Model): [Model, ModelWeaveLog[]] {
    return forEachEntity(model as Model & WithDomainModel, defaultProperties);
  }
}

function defaultProperties(entity: Entity): [Entity, ModelWeaveLog[]] {
  const idPro = entity.properties.find(
    prop => prop.name.toLowerCase() === "id"
  );
  if (_.isNil(idPro)) {
    return [
      _.assign(entity, {
        properties: entity.properties.concat([
          { name: "id", type: "ID", }//constraints: ["required"] }
          // { name: "createdAt", type: "DateTime", constraints: ["required"] },
          // { name: "updatedAt", type: "DateTime", constraints: ["required"] }
        ])
      }),
      [
        new ModelWeaveLog(
          `entities/${entity.name}`,
          `Added default properties - 'id'`
        )
      ]
    ];
  } else {
    return [entity, []];
  }
}
