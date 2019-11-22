import { WithAnnotations } from "../BaseDefine";
import { PresentationModel } from "./PresentationModel";

export interface WithPresentationModel{
    presentationModel:PresentationModel
    pageModel:PageModel
}

export interface PageModel{
    pages: Page[];
}

export interface Page extends WithAnnotations{
    name:string
    menuPath: string
    icon?: string
    gride: string
    places: Place[]
}
export interface Place {
    function: string
    // position: string
    // size: string
    presentation: string
}
