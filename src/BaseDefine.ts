import * as _ from "lodash";
import { ModelWeaveLog } from "@quick-qui/model-core";


export interface WithAnnotations {
  annotations?: Annotation
}
export type Annotation = object;

// ref := category/id
export type Ref = string;

//NOTE 把目标拉入到自己中，目标还在，其他人还可以用，但一般不会最终出现在business中，类似于目标是abstract=true
export type Extend = { ref: Ref };

//NOTE 将自己注入到目标中，自己一般就不要了。
export type Inject = { ref: Ref };

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

export function appendAnnotation(obj: any, key: string, value: any) {
  if (!_.isNil(obj.annotations)) {
    const re = obj.annotations[key];
    if (_.isNil(re)) {
      obj.annotations[key] = value;
    } else {
      obj.annotations[key] = [obj.annotations[key]].concat(value);
    }
  } else {
    obj.annotations = {};
    appendAnnotation(obj, key, value);
  }
}

export function appendWeavingLog(obj: any, log: ModelWeaveLog) {
  appendAnnotation(obj, "weaveLogs", log);
}

