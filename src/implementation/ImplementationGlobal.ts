import { StringKeyObject } from "../BaseDefine";
import * as path from "path";
//TODO 不知道是否合适
//TODO 不知道在复杂require环境下是否能在runtime范围里面唯一。
//TODO Implementation是否也就是一个runtime，还没确定。
//TODO 目前来看，一个implementation等于一个runtime，后续需要review。
const implementationGlobalKey = "implementationGlobal";

if (globalThis != undefined) {
  if (globalThis[implementationGlobalKey]) {
  } else {
    globalThis[implementationGlobalKey] = {
      createAt: path.resolve(__dirname)
    };
  }
} else {
  throw new Error("global not supported");
}

export const implementationGlobal: StringKeyObject =
  globalThis[implementationGlobalKey];
export const runtimeGlobal: StringKeyObject = implementationGlobal;
