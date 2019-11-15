import { ModelValidator, Model, ValidateError } from "@quick-qui/model-core";
import { WithFunctionModel, existFunction } from "./FunctionModel";
import { getNameInsureCategory } from "../BaseDefine";



export class FunctionValidator implements ModelValidator {
    validate(model: Model): ValidateError[] {
        let re: ValidateError[] = [];
        //TODO 没有完全实现

        const m = model as Model & WithFunctionModel;
        if (m.functionModel) {
          m.functionModel.functions.forEach(fun => {
            if (fun.extend) {
              try {
                const name = getNameInsureCategory(fun.extend.ref, "function");
                if (!existFunction(m, name)) {
                  re.push(
                    new ValidateError(
                      `no function find in extend - expect=${name}`
                    )
                  );
                }
              } catch (e) {
                re.push(new ValidateError(e.message));
              }
            }
          });
        }

        return re;
    }
}