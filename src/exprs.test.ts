import { parseExpr, evaluate, evaluateInObject } from "./Exprs";
import { replaceInObject } from "@quick-qui/util";

test("exprs", () => {
  const re = parseExpr("scheme:name/pa/th");
  expect(re.scheme).toEqual("scheme");
  expect(re.name).toEqual("name");
  expect(re.paths).toEqual(["pa", "th"]);
});

test("exprs without path", () => {
  const re = parseExpr("scheme:name");
  expect(re.scheme).toEqual("scheme");
  expect(re.name).toEqual("name");
  expect(re.paths).toEqual([]);
});

test("evaluated", () => {
  const obj = {
    id: 1,
    value: "${value}",
  };
  const newObj = replaceInObject(obj, /\$\{(.*)\}/, (result) =>
    evaluate(undefined, { value: "value" }, result)
  );
  expect(newObj.id).toEqual(1);
  expect(newObj.value).toEqual("value");
});

test("evaluated in object", () => {
  const obj = {
    id: 1,
    value: "${value}",
  };
  const newObj = evaluateInObject(obj, undefined, { value: "value" });
  expect(newObj.id).toEqual(1);
  expect(newObj.value).toEqual("value");
});
