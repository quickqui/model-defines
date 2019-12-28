import mergeOptions from "merge-options";
import _ from "lodash";

export function deepMerge<T>(obj: T, source: any): T {
  return mergeOptions.call({ concatArrays: true }, obj, source) as T;
}

export function withNamespace<T>(objArray: T[], buildingContext: any): T[] {
  const namespace: string = buildingContext?.["modelFile"]?.path;
  return objArray.map(obj => deepMerge(obj, { namespace }));
}

export function withBuildingContext<T>(
  objArray: T[],
  buildingContext: any
): any {
  return objArray.map(obj =>
    deepMerge(obj, {
      annotations: {
        buildingContext: {
          modelFile: _.omit(buildingContext.modelFile, "modelObject"),
          modelSource: _.pick(
            buildingContext.modelSource,
            "name",
            "description"
          )
        }
      }
    })
  );
}
