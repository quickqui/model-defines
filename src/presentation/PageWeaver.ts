import { ModelWeaver, Model, ModelWeaveLog } from "@quick-qui/model-core";
import { WithFunctionModel } from "../function/FunctionModel";
import * as _ from "lodash";
import { Page, WithPresentationModel } from "./PageModel";
import { deepMerge } from "../Util";

export class OneFunctionPagesWeaver implements ModelWeaver {
  name = "oneFunctionPage";
  weave(model: Model): [Model, ModelWeaveLog[]] {
    let m = model as Model & WithFunctionModel & WithPresentationModel;
    const functions = m.functionModel.functions;
    //TODO 没有entry的也要有？
    const re: ModelWeaveLog[] = [];
    functions
      .filter(f => !_.isNil(f.entry))
      .forEach(f => {
        const pages: Page[] = m.pageModel.pages ?? [];
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
            ]
          };
          re.push(
            new ModelWeaveLog(
              `functions/${f.name}`,
              `page generated for function - ${f.name}`
            )
          );
          m = deepMerge(m, { pageModel: { pages: [newPage] } });

        }
      });
    return [m, re];
  }
}

export const pageWeavers = [new OneFunctionPagesWeaver()];
