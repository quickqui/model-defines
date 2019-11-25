import { ExtendWeaver } from "./ExtendWeaver";
import { DeleteAbstractFunctionWeaver } from "./DeleteAbstractFunctionWeaver";

export const functionWeavers=[
    new ExtendWeaver(),new DeleteAbstractFunctionWeaver()
]