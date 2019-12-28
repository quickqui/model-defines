import { ModelWeaveLog, Model } from "@quick-qui/model-core";
import { WithAnnotations } from "../Annotation";
import _ = require("lodash");
import { Inject, WithNamespace } from "../BaseDefine";

export interface WithDomainModel {
  domainModel: DomainModel;
}

export function withDomainModel(model: Model): WithDomainModel | undefined {
  if ((model as any).domainModel) {
    return model as WithDomainModel;
  } else {
    return undefined;
  }
}
export interface DomainModel {
  entities: Entity[];
  enums: Enum[];
}

/*TODO 如何支持，动态的属性？多种子类？
  不同的子类型有不同的属性。
*/

export interface Entity extends WithAnnotations, WithNamespace {
  properties: Property[];
  //inject 是推模式，当前定义注入到之前模式，当前定义最终不生效。
  //TODO 考虑是否要拉模式
  inject?: Inject;
}

export interface Property {
  name: string;
  //TODO 如果没有type就要有relation，validate需要体现这个限制
  type?: string | List;
  constraints?: Constraint[];
  default?: any;
  relation?: Relation;
}

export interface List {
  itemType: string;
}

export interface Enum extends WithAnnotations, WithNamespace {
  values: string[];
  type: string;
}

type Constraint = string;

interface Relation {
  n: "one" | "many";
  to: string;
}

export function forEachEntity(
  model: Model & WithDomainModel,
  fun: (entity: Entity) => [Entity, ModelWeaveLog[]]
): [Model, ModelWeaveLog[]] {
  const entities = model.domainModel!.entities;
  let logs: ModelWeaveLog[] = [];
  let newEntities: Entity[] = [];
  entities.forEach(entity => {
    let [en, log] = fun(entity);
    newEntities.push(en);
    if (log) logs = logs.concat(log);
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
