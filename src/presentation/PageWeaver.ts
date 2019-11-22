import { ModelWeaver, Model, ModelWeaveLog } from "@quick-qui/model-core";
import { WithFunctionModel } from "../function/FunctionModel";
import * as _ from "lodash";
import { Page } from "./PageModel";
import { appendWeavingLog } from "../BaseDefine";

export class OneFunctionPagesWeaver implements ModelWeaver {
  name = "oneFunctionPage";
  weave(model: Model): [Model, ModelWeaveLog[]] {
    const m = model as Model & WithFunctionModel & { pages?: Page[] };
    const functions = m.functionModel.functions;
    //TODO 没有entry的也要有？
    const re: ModelWeaveLog[] = [];
    functions
      .filter(f => !_.isNil(f.entry))
      .forEach(f => {
        const pages: Page[] = m.pages || [];
        let page: Page | undefined = undefined;
        if (pages) {
          //TODO 不光要通过名字找，还要通过实际的只有一个function的page找？
          page = pages.find(p => p.name === `oneFunctionPage${f.name}`);
        }
        if (_.isNil(page)) {
          const newPage = {
            name: `oneFunctionPage${f.name}`,
            menuPath: f.entry!.menuPath,
            icon: f.entry!.icon,
            gride: "1",
            places: [
              {
                function: f.name,
                presentation: `normal`
              }
            ],
            annotations: {
              weaveLogs: [
                new ModelWeaveLog(`generated for function - ${f.name}`)
              ]
            }
          };
          re.push(new ModelWeaveLog(`page generated for function - ${f.name}`));
          appendWeavingLog(
            f,
            new ModelWeaveLog(`page generated - ${newPage.name}`)
          );
          m.pages = [...(m.pages || []), newPage];
        }
      });
    return [m, re];
  }
}

export const pageWeavers = [new OneFunctionPagesWeaver()];
