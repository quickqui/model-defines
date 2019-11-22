import { ModelWeaveLog, Model } from "@quick-qui/model-core";
import { Inject } from "../BaseDefine";
import _ = require("lodash");

export interface WithDomainModel {
  domainModel: DomainModel;
}

export interface DomainModel {
  entities: Entity[];
  enums: Enum[];
}

export interface Entity {
  name: string;
  properties: Property[];
  //inject 是推模式，当前定义注入到之前模式，当前定义最终不生效。
  //TODO 考虑是否要拉模式
  inject?: Inject;
  //TODO 随时考虑这个东西在这里的合理性。目前的用途是brief字段，严格来讲这个东西不应该是entity的属性。
  directives?: object;
}

export interface Property {
  name: string;
  type: string | List;
  constraints?: Constraint[];
  default?: any;
  relation?: Relation;
}

export interface List {
  itemType: string;
}

export interface Enum {
  values: string[];
}

type Constraint = string;

interface Relation {
  n: "one" | "many";
  to: string;
}

export function forEachEntity(
  model: Model & WithDomainModel,
  fun: (entity: Entity) => [Entity, ModelWeaveLog?]
): [Model, ModelWeaveLog[]] {
  const entities = model.domainModel!.entities;
  let logs: ModelWeaveLog[] = [];
  let newEntities: Entity[] = [];
  entities.forEach(entity => {
    let [en, log] = fun(entity);
    newEntities.push(en);
    if (log) logs.push(log);
  });
  return [
    {
      ...model,
      domainModel: {
        ...model.domainModel!,
        entities: newEntities
      }
    },
    logs
  ];
}
export function eachEntity<T>(
  model: Model & WithDomainModel,
  fun: (entity: Entity) => T
): T[] {
  return model.domainModel!.entities.map(fun);
}
export function getEntity(
  model: Model & WithDomainModel,
  name: string
): Entity | undefined {
  return model.domainModel!.entities.find(entity => {
    return entity.name === name;
  });
}
export function existEntity(
  model: Model & WithDomainModel,
  name: string
): boolean {
  return !_(getEntity(model, name)).isNil();
}
