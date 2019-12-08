import { WithAnnotations } from "../Annotation";
import { PresentationModel } from "./PresentationModel";
import { Model } from "@quick-qui/model-core";

export function withPresentationModel(
  model: Model
): WithPresentationModel | undefined {
  if ((model as any).presentationModel && (model as any).pageMode) {
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

export interface Page extends WithAnnotations {
  name: string;
  menuPath?: string;
  icon?: string;
  gride: string;
  places: Place[];
}
export interface Place {
  function: string;
  // position: string
  // size: string
  presentation: string;
}
