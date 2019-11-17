export type Annotation = object;

// ref := category/id
export type Ref = string;

//* 把目标拉入到自己中，目标还在，其他人还可以用，但一般不会最终出现在business中，类似于目标是abstract=true
export type Extend = { ref: Ref };

//* 将自己注入到目标中，自己一般就不要了。
export type Inject = { ref: Ref };

export function getNameWithCategory(
  ref: Ref,
  insureCategory?: string
): {name:string, category:string| undefined} {
  if(ref.indexOf('/')===-1){
    return {name:ref,category:undefined};
  }
  const [category, name] = ref.split("/", 2);
  if (insureCategory) {
    if (category === insureCategory) {
      return {name, category};
    } else {
      throw new Error(
        `category not match - except=${insureCategory}, actual=${category}`
      );
    }
  } else {
    return {name, category};
  }
}

export function getNameInsureCategory(
  ref: Ref,
  insureCategory: string
): string {
  return getNameWithCategory(ref, insureCategory).name;
}
