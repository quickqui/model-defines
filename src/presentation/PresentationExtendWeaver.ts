import { Model, WeaveLog, ModelWeaver } from "@quick-qui/model-core";
import _ from "lodash";
import { getNameInsureCategory } from "../BaseDefine";
import { mergeByKey } from "../Merge";
import { withPresentationModel } from "./PageModel";
import {
  Presentation,
  PresentationModel,
  PropertyRule,
} from "./PresentationModel";

export default class PresentationExtendWeaver implements ModelWeaver {
  name = "presentationExtend";
  weave(model: Model): [Model, WeaveLog[]] {
    const logs: WeaveLog[] = [];
    const m = withPresentationModel(model);
    if (m) {
      m.presentationModel.presentations.forEach((presentation) => {
        if (presentation.extend) {
          const extendTargetName = getNameInsureCategory(
            presentation.extend,
            "presentations"
          );
          const extendTarget = getPresentation(
            m.presentationModel,
            extendTargetName
          );
          if (!extendTarget) {
            logs.push(
              new WeaveLog(
                `presentations/${presentation.name}`,
                `no extend presentation find, expected - ${extendTargetName}`,
                true
              )
            );
          } else {
            const index = _(m.presentationModel.presentations).findIndex(
              (p) => p.name === presentation.name
            );
            const newP = doExtend(presentation, extendTarget);
            m.presentationModel.presentations[index] = newP;
            logs.push(
              new WeaveLog(
                `presentations/${presentation.name}`,
                `extend presentation, base - ${extendTargetName}, sub - ${presentation.name}`
              )
            );
          }
        }
      });
      return [m, logs];
    }
    return [model, []];
  }
}
function doExtend(sub: Presentation, base: Presentation): Presentation {
  //TODO 有些特殊字段需要特殊处理。
  return {
    ...base,
    ...sub,
    propertyRules: mergeByKey(
      base.propertyRules,
      sub.propertyRules,
      "property"
    ) as PropertyRule[],
    abstract: false,
    annotations: { ...base.annotations, ...sub.annotations },
  };
}
function getPresentation(
  m: PresentationModel,
  name: string
): Presentation | undefined {
  return m.presentations.find((p) => p.name === name);
}
