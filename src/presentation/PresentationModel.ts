export interface PresentationModel {
  presentations: Presentation[];
}

export interface Presentation {
  name: string; //TODO 貌似不需要
  context: string;
  resource: string;
  display: FieldRule[];
  brief: string;
}

type FieldRule = string; //hidden？ enabled？ editable？ InputComponent?
//TODO: field rule 在定义表现的时候是有用的，比如在狭窄的时候不显示xx属性。
//TODO: field rule 在功能里面也是有用的，比如在某某功能的某个entity是不写xx属性的。还有可能跟权限有结合
