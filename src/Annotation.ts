import { StringKeyObject } from "./BaseDefine";
import _ from "lodash";
import { deepMerge } from "./Merge";
export type Annotation = StringKeyObject;
export interface WithAnnotations {
  annotations?: Annotation;
}

export function appendAnnotation<T extends WithAnnotations>(
  obj: T,
  key: string,
  value: any
): T {
  return deepMerge(obj, { annotations: { [key]: value } });
}
