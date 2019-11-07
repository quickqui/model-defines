import * as _ from "lodash";
import { Function, WithFunctionModel } from "./FunctionModel"
import { ModelDefine, Model, ModelWeaveLog, ValidateError } from "@quick-qui/model-core";


const functionDefine ={
    
    
    validatePiece(piece: any):ValidateError[]{
        return []
    },
  
    merge(model: Model & WithFunctionModel , piece: any): Model {
        return {
            ...model,
            functionModel: {
                ...model.functionModel,
                functions: _(model.functionModel ? model.functionModel.functions : []).concat(piece.functions).value(),
            }
        }
    },
    validateAfterMerge(model: Model): ValidateError[] {
        return []
    },
    validateAfterWeave(model: Model): ValidateError[] {
        return []
    },
    weavers:[]
}
export default functionDefine