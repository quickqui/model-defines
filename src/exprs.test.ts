import { parseExpr, evaluate, evaluateInObject, findInfos } from "./Exprs";
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

test("evaluated in object", async () => {
  expect.hasAssertions();
  const obj = {
    id: 1,
    value: "${value}",
  };
  const newObj = (await evaluateInObject(obj, { value: "value" }))[0];
  expect(newObj["id"]).toEqual(1);
  expect(newObj["value"]).toEqual("value");
});


test ('find infos',()=>{
  const obj = {
    id: 1,
    value: "${value}",
    info:'${info:xxx}'
  };
  expect(findInfos( obj)).toEqual(['xxx']);
})
test("find infos", () => {
  const obj = {
    id: 1,
    value: "${value}",
    info: "${info:xxx}",
    parameters:{
      valueP:'${info:valueP}'
    }
  };
  expect(findInfos(obj)).toEqual(["xxx","valueP"]);
});