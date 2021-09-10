import { ModelWeaver, WeaveLog, Model } from "@quick-qui/model-core";
import { WithFunctionModel, withFunctionModel } from "./FunctionModel";


export const deleteAbstractFunctionsOrder = 10000
//NOTE 不要了，还是在使用的时候过滤abstract
export class DeleteAbstractFunctionWeaver implements ModelWeaver {
         name = "deleteAbstractFunctions";
         order = deleteAbstractFunctionsOrder;
         weave(model: Model): [Model, WeaveLog[]] {
           const m = withFunctionModel(model)!
           const abstracts = m.functionModel?.functions.filter(
             fun => fun.abstract
           );
           m.functionModel.functions = (m.functionModel.functions ?? []).filter(
             fun => {
               return !(fun.abstract ?? false);
             }
           );
           return [
             m,
             abstracts.map(fun => {
               return new WeaveLog(
                 `functions/${fun.name}`,
                 `abstract function deleted - ${fun.name}`
               );
             })
           ];
         }
       }