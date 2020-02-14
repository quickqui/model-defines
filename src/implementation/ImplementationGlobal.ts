import { StringKeyObject } from "../BaseDefine";
//TODO 不知道是否合适
//TODO 不知道在复杂require环境下是否能在runtime范围里面唯一。
//TODO Implementation是否也就是一个runtime，还没确定。
//TODO 目前来看，一个implementation等于一个runtime，后续需要review。
export const implementationGlobal :StringKeyObject = {}
export const runtimeGlobal :StringKeyObject = implementationGlobal
