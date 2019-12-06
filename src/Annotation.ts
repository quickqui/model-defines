import { StringKeyObject } from "./BaseDefine";
import * as _ from "lodash";
import { deepMerge } from "./Util";
export type Annotation = StringKeyObject;
export interface WithAnnotations {
  annotations?: Annotation;
}

export function appendAnnotation<T extends WithAnnotations>(
         obj: T,
         key: string,
         value: any
       ): T {
         // if (!_.isNil(obj.annotations)) {
         //   const re = obj.annotations[key];
         //   if (_.isNil(re)) {
         //     obj.annotations[key] = value;
         //   } else {
         //     obj.annotations[key] = [re].flat().concat(value);
         //   }
         //   return obj
         // } else {
         //   obj.annotations = {};
         //   return appendAnnotation(obj, key, value);
         // }

         return deepMerge(obj, { annotations: { [key]: value } });
       }

