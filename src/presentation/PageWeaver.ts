import { ModelWeaver, Model, WeaveLog } from "@quick-qui/model-core";
import {
  withFunctionModel,
  WithFunctionModel,
} from "../function/FunctionModel";
import _ from "lodash";
import {
  Page,
  WithPresentationModel,
  withPresentationModel,
} from "./PageModel";
import { deepMerge } from "../Merge";
import { deleteAbstractFunctionsOrder } from "../function/DeleteAbstractFunctionWeaver";
import { withoutAbstract } from "../BaseDefine";

export class OneFunctionPagesWeaver implements ModelWeaver {
  name = "oneFunctionPage";
  order = deleteAbstractFunctionsOrder + 1;

  weave(model: Model): [Model, WeaveLog[]] {
    let mf = withFunctionModel(model);
    if (mf) {
      let m = withPresentationModel(mf);
      if (m) {
        const functions = withoutAbstract(mf.functionModel.functions ?? []);
        //NOTE 没有entry的也要有。因为会被link到或者redirect到，等等。
        const re: WeaveLog[] = [];
        functions.forEach((f) => {
          const pages: Page[] = m!.pageModel?.pages ?? [];
          let page: Page | undefined;
          if (pages) {
            //NOTE 直接用function name作为page name
            page = findPageByFunctionName(pages, f.name);
          }
          if (_.isNil(page)) {
            const newPage = {
              name: f.name,
              menuPath: f.annotations?.["page"]?.menuPath,
              icon: f.annotations?.["page"]?.icon,
              layout: {
                grid: 1,
              },
              places: [
                {
                  function: f.name,
                  presentation: f.annotations?.["presentation"],
                  layout: {
                    size: 1,
                  },
                },
              ],
              annotations: {
                generated: true,
              },
            };
            re.push(
              new WeaveLog(
                `functions/${f.name}`,
                `page generated for function - ${f.name}`
              )
            );
            m = deepMerge(m, { pageModel: { pages: [newPage] } });
          }
        });
        return [m, re];
      }
      return [model, []];
    }
    return [model, []];
  }
}
export class PageDefaultLayoutWeaver implements ModelWeaver {
  name = "defaultLayout";
  weave(model: Model): [Model, WeaveLog[]] {
    const pages = withPresentationModel(model)?.pageModel.pages;
    if (pages) {
      let logs: WeaveLog[] = [];
      pages.forEach((page) => {
        if (!page.layout) {
          page.layout = { grid: 1 };
          logs.push(new WeaveLog(`pages/${page.name}`, `set default layout`));
        }
        page.places.forEach((place) => {
          if (!place.layout) {
            place.layout = { size: 1 };
            logs.push(
              new WeaveLog(
                `pages/${page.name}`,
                `set default layout for place ${place.function}`
              )
            );
          }
        });
      });
      return [model, logs];
    } else {
      return [model, []];
    }
  }
}
export class PageSortWeaver implements ModelWeaver {
  name = "sortPage";
  order = 1; //放在比较后面，确保在page generate的后面
  weave(model: Model): [Model, WeaveLog[]] {
    const pages = withPresentationModel(model)?.pageModel.pages;
    if (pages) {
      const sortedPages = _(pages)
        .sortBy((page) => page.order ?? 0)
        .value();
      return [
        { ...model, ...{ pageModel: { pages: sortedPages } } },
        [new WeaveLog("pages", "sorted by page.order, ascending")],
      ];
    } else {
      return [model, []];
    }
  }
}

export const pageWeavers = [
  new OneFunctionPagesWeaver(),
  new PageDefaultLayoutWeaver(),
  new PageSortWeaver(),
];
function findPageByFunctionName(
  pages: Page[],
  functionName: string
): Page | undefined {
  return pages.find((page) =>
    page.places.find((place) => place.function === functionName)
  );
}
