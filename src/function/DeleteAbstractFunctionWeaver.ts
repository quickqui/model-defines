import { ModelWeaver, ModelWeaveLog, Model } from "@quick-qui/model-core";
import { WithFunctionModel } from "./FunctionModel";



export class DeleteAbstractFunctionWeaver implements ModelWeaver {
  name = "deleteAbstractFunctions";
  order = 10000
  weave(model: Model): [Model, ModelWeaveLog[]] {
      const m = model as Model & WithFunctionModel
      const abstracts = m.functionModel?.functions.filter(fun => fun.abstract)
      m.functionModel.functions = (m.functionModel.functions??[]).filter(fun=>{
          return !(fun.abstract ?? false)
      })
      return [m,abstracts.map(fun=>{
          return new ModelWeaveLog(`functions/${fun.name}`,`abstract function deleted - ${fun.name}`)
      })]
  }
}