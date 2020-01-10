import { Model } from "@quick-qui/model-core";
import { withPresentationModel } from "./PageModel";
import { Property } from "../domain/DomainModel";
import { StringKeyObject, WithNamespace } from "../BaseDefine";
import { WithAnnotations } from "../Annotation";

export interface PresentationModel {
  presentations: Presentation[];
}

export interface Presentation extends WithAnnotations, WithNamespace {
  //NOTE presentations由他处以name引用，不管其他。（所以也没有类似resource这样的方法）
  propertyRules?: PropertyRule[];
  //NOTE 操作元素的配置放在这里。比如下来paging，下拉filter之类的元素的配置（存在？形式？） 可以放在这里。
  uiElementRules?: StringKeyObject;
}

//NOTE: PropertyRule 在定义表现的时候是有用的，比如在狭窄的时候不显示xx属性。
//NOTE: PropertyRule 在功能里面也是有用的，比如在某某功能的某个entity是不写xx属性的。还有可能跟权限有结合

export interface PropertyRule {
  property: string;
  rules?: string[]; //hidden, masked, enabled/disabled, Component
  order?: number;
}

