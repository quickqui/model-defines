import { ModelWeaver, Model, ModelWeaveLog } from "@quick-qui/model-core";
import { WithFunctionModel } from "../function/FunctionModel";
import _ from "lodash";
import {
  Page,
  WithPresentationModel,
  withPresentationModel
} from "./PageModel";
import { deepMerge } from "../Merge";

export class OneFunctionPagesWeaver implements ModelWeaver {
  name = "oneFunctionPage";
  weave(model: Model): [Model, ModelWeaveLog[]] {
    let m = model as Model & WithFunctionModel & WithPresentationModel;
    const functions = m.functionModel.functions;
    //NOTE 没有entry的也要有。因为会被link到或者redirect到，等等。
    const re: ModelWeaveLog[] = [];
    functions.forEach(f => {
      const pages: Page[] = m.pageModel.pages ?? [];
      let page: Page | undefined = undefined;
      if (pages) {
        //TODO 不光要通过名字找，还要通过实际的只有一个function的page找？是否要支持多个function指定了一个entry的情况？
        page = pages.find(p => p.name === `oneFunctionPage${f.name}`);
      }
      if (_.isNil(page)) {
        const newPage = {
          name: `oneFunctionPage${f.name}`,
          menuPath: f.entry?.menuPath,
          icon: f.entry?.icon,
          layout: {
            gride: "1"
          },
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

export class PageSortWeaver implements ModelWeaver {
  name = "sortPage";
  weave(model: Model): [Model, ModelWeaveLog[]] {
    const pages = withPresentationModel(model)?.pageModel.pages;
    if (pages) {
      const sortedPages = _(pages).sortBy(page => page.order ?? 0);
      return [
        { ...model, ...{ pageModel: { pages: sortedPages } } },
        [new ModelWeaveLog("pages", "sorted by page.order, ascending")]
      ];
    } else {
      return [model, []];
    }
  }
}

export const pageWeavers = [new OneFunctionPagesWeaver(), new PageSortWeaver()];
