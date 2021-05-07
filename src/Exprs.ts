import {
  uri,
  evaluateInObject as eio,
  notNil,
  flattenKeys,
} from "@quick-qui/util";
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
  context: object,
  matchedResult: RegExpExecArray
): Promise<any> {
  const { scheme, name, paths } = parseExpr(matchedResult[1]);
  if (scheme === "info") {
    const model = context["model"];
    if (model) {
      const withInfo = withInfoModel(model);
      if (withInfo) {
        const info = findInfo(withInfo, undefined, name);
        if (info?.type === "event") {
          //NOTE 比较特殊，如果是一般的resource info，就没有这么复杂
          const obj = (context as any).event; //?.[name];
          return Promise.resolve([_.get(obj, paths ?? []), context]);
        } else if (info?.type === "resource") {
          //TODO 怎么去get到某个info的当前值？ 通过dp？那应该是implementation层面的事情了。
        }
      }
    }
  } else if (scheme === undefined) {
    const obj = context as any; //?.[name];
    return Promise.resolve([_.get(obj, [name, ...(paths ?? [])]), context]);
  }
  return Promise.resolve([undefined, context]);
}

export function evaluateInObject(obj: any, context: object) {
  return eio(obj, context, evaluate);
}
export function findInfos(obj: object) {
  const flat = flattenKeys(obj);
  return _(flat)
    .values()
    .map((value) => {
      const brackets = /\$\{(.*)\}/;
      if (brackets.test(value)) {
        const s = brackets.exec(value)![1];
        const { scheme, name } = parseExpr(s);
        if (scheme === "info") {
          return name;
        }
      }
      return undefined;
    })
    .filter(notNil)
    .value();
}
export function getEventNames(model:Model,infoNames:string[]){
  return infoNames.map(infoName=>{
      const withInfo = withInfoModel(model)!;
      const info = findInfo(withInfo, undefined, infoName);
      if(info?.type ==='event')return infoName;
      return undefined
  }).filter(notNil)
}
