import { Model } from "@quick-qui/model-core";
import { withPresentationModel } from "./PageModel";
import { Property } from "../domain/DomainModel";
import { StringKeyObject } from "../BaseDefine";

export interface PresentationModel {
  presentations: Presentation[];
}

export interface Presentation {
  //TODO presentation定位方式需要进一步考虑，是否需要resource？
  name: string;
  resource?: string; //entity 或者 command
  propertyRules: PropertyRule[];
  //NOTE 操作元素的配置放在这里。比如下来paging，下拉filter之类的元素的配置（存在？形式？） 可以放在这里。
  uiElementRules: StringKeyObject;
}

//NOTE: PropertyRule 在定义表现的时候是有用的，比如在狭窄的时候不显示xx属性。
//NOTE: PropertyRule 在功能里面也是有用的，比如在某某功能的某个entity是不写xx属性的。还有可能跟权限有结合

export interface PropertyRule {
  property: string;
  rules: string[]; //hidden, masked, enabled/disabled, Component
  order?: number;
}

export function findPresentation(
  model: Model,
  presentationName : string| undefined,
  resourceName: string
): Presentation | undefined {
  const presentations = withPresentationModel(model)?.presentationModel
    ?.presentations;
  const re = presentations?.find(
    presentation =>
      presentation.name === presentationName &&
      presentation.resource === resourceName
  );
  if (!re) {
    //TODO 寻找default？default机制是否是一个合适的定义。
    //造成了机制在model本身之外。可以考虑weave到place或者比如 presentation extend机制。
    //还好，不是很大的问题，都是限制在presentation之内的问题。
    return presentations?.find(presentation => presentation.name === "default");
  }
  return re;
}

