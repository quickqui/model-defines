import mergeOptions from "merge-options";
import _ from "lodash";
import { StringKeyObject } from "./BaseDefine";

export function deepMerge<T>(a: T, b: any): T {
  return mergeOptions.call({ concatArrays: true }, a, b) as T;
}

function arrayToMap(array: object[], key: string): StringKeyObject {
  const pairs = array.map((a) => [a[key], a]);
  return _.fromPairs(pairs);
}
export function mergeByKey(
  a: object[] | undefined,
  b: object[] | undefined,
  key: string = "name"
): object[] {
  const obj = arrayToMap(a??[], key);
  const source = arrayToMap(b??[], key);
  return _.toPairs(deepMerge(obj, source)).map((pair) => pair[1]);
}

export function withNamespace<T>(objArray: T[], buildingContext: any): T[] {
  const namespace: string = buildingContext?.["modelFile"]?.path;
  return objArray.map((obj) => deepMerge(obj, { namespace }));
}
//TODO building context 极大增加了model的size，需要优化。比如相同的提出来，现场仅保存指针。
export function withBuildingContext<T>(
  objArray: T[],
  buildingContext: any
): any {
  return objArray.map((obj) =>
    deepMerge(obj, {
      annotations: {
        buildingContext: {
          modelFile: _.omit(buildingContext.modelFile, "modelObject"),
          modelSource: _.pick(
            buildingContext.modelSource,
            "name",
            "description"
          ),
        },
      },
    })
  );
}
