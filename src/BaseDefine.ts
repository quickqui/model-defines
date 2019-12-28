import _ from "lodash";
import { ModelWeaveLog, ValidateError } from "@quick-qui/model-core";
import { Annotation } from "./Annotation";
import url from "url";

//TODO 需要一个类似于pipe或者前置处理的装置来预处理类似于“简写”之类的需求。
// 倾向于让具体的define自己处理，比如 -
/*
    properties: 
      id: [Id, required, unique]

    等效于
    properties: 
      - name: id
        type: Id
        constraints:
          - required
          - unique
*/
//可以在define.merge方法中，先处理，然后merge， 目测可以支持一切预处理，包括解析。
// 如果要用dsl 也不是不可以， 如果是yaml格式，可以用长字符串， 然后解析

//TODO 需要在各个主要model之间形成基本的语义统一
/**
 * abstract
 * name
 * ref
 * extend inject
 * resource
 * extension
 * parameters
 * annotations
 * order
 */
export type StringKeyObject = { [key: string]: any };
// ref := "rest":category/id  rest in model.
// ref := "resolve":path
// ref :=
export type Ref = string;

export interface WithNamespace {
  namespace: string;
  name: string;
}

//NOTE 把目标拉入到自己中，目标还在，其他人还可以用，但一般不会最终出现在business中，类似于目标是abstract=true
export type Extend = Ref
//NOTE 将自己注入到目标中，自己一般就不要了。
export type Inject = Ref

export const REF_INTERNAL = "internal";
export const REF_RESOLVE = "resolve";
export const REF_REST = "rest";
export const REF_PROVIDED = "provided";

export interface RefObject {
  protocol: string;
  path: string;
}

export function parseRef(ref: Ref): RefObject | undefined {
  const { protocol, pathname, hostname } = url.parse(ref);

  return {
    protocol: protocol.endsWith(":") ? protocol.slice(0, -1) : protocol,
    path: pathname ?? hostname
  };
}

export function getNameWithCategory(
  ref: Ref,
  insureCategory?: string
): { name: string; category: string | undefined } {
  if (ref.indexOf("/") === -1) {
    return { name: ref, category: undefined };
  }
  const [category, name] = ref.split("/", 2);
  if (insureCategory) {
    if (category === insureCategory) {
      return { name, category };
    } else {
      throw new Error(
        `category not match - except=${insureCategory}, actual=${category}`
      );
    }
  } else {
    return { name, category };
  }
}

export function getNameInsureCategory(
  ref: Ref,
  insureCategory: string
): string {
  return getNameWithCategory(ref, insureCategory).name;
}
