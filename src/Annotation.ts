import { StringKeyObject } from "./BaseDefine";
import * as _ from "lodash";
export type Annotation = StringKeyObject;
export interface WithAnnotations {
  annotations?: Annotation;
}

export function appendAnnotation(obj: any, key: string, value: any):any {
  if (!_.isNil(obj.annotations)) {
    const re = obj.annotations[key];
    if (_.isNil(re)) {
      obj.annotations[key] = value;
    } else {
      obj.annotations[key] = [re].flat().concat(value);
    }
    return obj
  } else {
    obj.annotations = {};
    return appendAnnotation(obj, key, value);
  }
}
