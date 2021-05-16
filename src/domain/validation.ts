import { deepMerge } from "@quick-qui/util";
import { StringKeyObject } from "../BaseDefine";
import { Entity } from "./DomainModel";

type Values = StringKeyObject;
function isURL(str: string) {
  var res = str.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}
function constraintToFun(
  con: string
): (value: any, values: Values) => string | undefined {
  if (con === "required")
    return (v) => {
      if (!v || v === "") return "required";
      else return undefined;
    };
  if (con === "url")
    return (v) => {
      if (!v || !isURL(v)) return "url required";
      else return undefined;
    };
  else return (v, vs) => undefined;
}

export const validation = (entity: Entity) => (values: Values) => {
  const cons: [string, string][] = entity.properties
    .map((property) =>
      (property.constraints ?? []).map(
        (c) => [property.name, c] as [string, string]
      )
    )
    .flat();
  let errors = {};
  cons.forEach((con) => {
    // console.log(con);
    // console.log(errors);
    const [propertyName, conString] = con;
    const fun = constraintToFun(conString);
    const err = fun(values[propertyName], values);
    if (err) errors = deepMerge(errors, { [propertyName]: err });
    // console.log(errors);
  });
  return errors;
};
