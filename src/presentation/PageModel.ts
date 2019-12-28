import { WithAnnotations } from "../Annotation";
import { PresentationModel } from "./PresentationModel";
import { Model } from "@quick-qui/model-core";
import { WithNamespace } from "../BaseDefine";

export function withPresentationModel(
  model: Model
): WithPresentationModel | undefined {
  if ((model as any).presentationModel && (model as any).pageModel) {
    return model as WithPresentationModel;
  } else {
    return undefined;
  }
}

export interface WithPresentationModel {
  presentationModel: PresentationModel;
  pageModel: PageModel;
}

export interface PageModel {
  pages: Page[];
}
        //TODO page 有没有参数？ 用于在page跳转的时候相互传递？

export interface Page extends WithAnnotations, WithNamespace {
  order?: number; //NOTE 升序排列。-10000最前面
  menuPath?: string;
  icon?: string;
  layout: any;
  places: Place[];
}
export interface Place {
  function: string;
  // position: string
  // size: string
  presentation: string;
  layout:any
}
