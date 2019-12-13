import { Model } from "@quick-qui/model-core";
import { withPresentationModel } from "./PageModel";
import { Property } from "../domain/DomainModel";

export interface PresentationModel {
  presentations: Presentation[];
}

//TODO 操作元素的配置放在哪里？比如下来paging，下拉filter之类的元素的配置（存在？形式？） 可以放在这里。
export interface Presentation {
  name: string;
  resource: string; //entity 或者 command
  propertyRules: PropertyRule[];
}

//NOTE: PropertyRule 在定义表现的时候是有用的，比如在狭窄的时候不显示xx属性。
//NOTE: PropertyRule 在功能里面也是有用的，比如在某某功能的某个entity是不写xx属性的。还有可能跟权限有结合

interface PropertyRule {
  property: string;
  rules: string[]; //hidden, masked, enabled/disabled, Component
  order?: number;
}

export function findPresentation(
  model: Model,
  presentationName: string,
  resourceName: string
): Presentation | undefined {
  const re = withPresentationModel(
    model
  )?.presentationModel?.presentations?.find(
    presentation =>
      presentation.name === presentationName &&
      presentation.resource === resourceName
  );
  return re;
}

export function rulesHelp(
  presentation: Presentation | undefined,
  property: Property
): { isHidden: boolean } {
  const rule: PropertyRule | undefined = presentation?.propertyRules?.find(
    propertyRule => propertyRule.property === property.name
  );

  return {
    //TODO 引入白名单， 当有property定义shown的时候，其他自动hidden
    isHidden: rule?.rules?.find(it => it === "hidden") ? true : false
  };
}
