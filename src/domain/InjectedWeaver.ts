import { ModelWeaver, Model, ModelWeaveLog } from "@quick-qui/model-core";
import { WithDomainModel, DomainModel, Entity, Property } from "./DomainModel";
import * as R from "ramda";
import _ from "lodash";
import { getNameInsureCategory } from "../BaseDefine";
import { deepMerge, mergeByKey } from "../Merge";

export class InjectedWeaver implements ModelWeaver {
  name = "inject";
  weave(model: Model): [Model, ModelWeaveLog[]] {
    const [domainModel, logs] = pushAll(
      (model as Model & WithDomainModel).domainModel!,
      []
    );
    return [{ ...model, domainModel }, logs];
  }
}

function pushAll(
  model: DomainModel,
  logs: ModelWeaveLog[]
): [DomainModel, ModelWeaveLog[]] {
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

function push(
  model: DomainModel,
  entity: Entity
): [DomainModel, ModelWeaveLog] {
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
        new ModelWeaveLog(
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
