import { ModelWeaver, Model, WeaveLog } from "@quick-qui/model-core";
import {
  DomainModel,
  Entity,
  Property,
  withDomainModel,
} from "./DomainModel";
import * as R from "ramda";
import _ from "lodash";
import { getNameInsureCategory } from "../BaseDefine";
import { deepMerge, mergeByKey } from "../Merge";

export class InjectedWeaver implements ModelWeaver {
  name = "inject";
  weave(model: Model): [Model, WeaveLog[]] {
    const withDomain = withDomainModel(model);
    if (!withDomain) {
      return [model, []];
    }
    const [domainModel, logs] = pushAll(withDomain.domainModel!, []);
    return [{ ...model, domainModel }, logs];
  }
}

function pushAll(
  model: DomainModel,
  logs: WeaveLog[]
): [DomainModel, WeaveLog[]] {
  const withInject = model.entities.find(
    R.propSatisfies(R.complement(R.isNil), "inject")
  );
  if (withInject) {
    const [newModel, log] = push(model, withInject);
    return pushAll(newModel, _(logs).concat(log).value());
  } else {
    return [model, logs];
  }
}

function getEntity(model: DomainModel, name: string): Entity | undefined {
  return model.entities.find(R.propEq("name", name));
}

function push(model: DomainModel, entity: Entity): [DomainModel, WeaveLog] {
  if (entity.inject) {
    const target = getEntity(
      model,
      getNameInsureCategory(entity.inject, "entities")
    );
    if (target) {
      //TODO 处理冲突，同名的property 需要一个合并策略。
      const newProperties = mergeByKey(target.properties, entity.properties);
      target.properties = newProperties as Property[];
      return [
        {
          //! inject的情况，自身被删掉了，注入到inject对象中去了。
          entities: model.entities.filter(
            R.complement(R.propEq("name", entity.name))
          ),
          enums: model.enums,
        },
        new WeaveLog(
          `entities/${target.name}`,
          `Injected - from entities/${entity.name} to entities/${target.name}`
        ),
      ];
    } else {
      throw new Error(`no such entity - ${target}`);
    }
  } else {
    throw new Error("no inject find");
  }
}
