import { uri, replaceInObject } from "@quick-qui/util";
import _ from "lodash";
import { Model } from "@quick-qui/model-core";
import { withInfoModel, findInfo } from "./info/InfoModel";
/*
 schema:name/p/a/t/h
 */

export function parseExpr(
  ref: string
): { scheme: string | undefined; name: string; paths: string[] | undefined } {
  const re = uri.parse(ref, undefined);
  const [name, ...paths] = re.path!;
  return { scheme: re.scheme, name, paths };
}

export function evaluate(
  model: Model | undefined,
  context: object,
  matchedResult: string[]
): any {
  const { scheme, name, paths } = parseExpr(matchedResult[1]);
  if (scheme === "info") {
    if (model) {
      const withInfo = withInfoModel(model);
      if (withInfo) {
        const info = findInfo(withInfo, undefined, name);
        if (info?.type === "event") {
          //NOTE 比较特殊，如果是一般的resource info，就没有这么复杂
          const obj = (context as any).event; //?.[name];
          return _.get(obj, paths ?? []);
        } else if (info?.type === "resource") {
          //TODO 怎么去get到某个info的当前值？ 通过dp？那应该是implementation层面的事情了。
        }
      }
    }
  } else if (scheme === undefined) {
    const obj = context as any; //?.[name];
    return _.get(obj, [name, ...(paths ?? [])]);
  }
  return undefined;
}

export function evaluateInObject(
  obj: any,
  model: Model | undefined,
  context: object
) {
  return replaceInObject(obj, /\$\{(.*)\}/, (result) =>
    evaluate(model, context, result)
  );
}
