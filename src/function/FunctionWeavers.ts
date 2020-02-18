import { FunctionExtendWeaver } from "./ExtendWeaver";
import { DeleteAbstractFunctionWeaver } from "./DeleteAbstractFunctionWeaver";

export const functionWeavers = [
         new FunctionExtendWeaver()
         //NOTE 不要了，还是在使用的时候过滤abstract
         //new DeleteAbstractFunctionWeaver()
       ];
