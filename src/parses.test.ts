import { getNameWithCategory, parseRef } from "./BaseDefine";
/*
 category?/name
 */
test("category and name", () => {
  const re = getNameWithCategory("category/name");
  expect(re.name).toEqual("name");
  expect(re.category).toEqual("category");
});
test("no category and name", () => {
  const re = getNameWithCategory("name");
  expect(re.name).toEqual("name");
  expect(re.category).toBeUndefined;
});
/* 
protocol:path
*/
test("protocol and path", () => {
  const re = parseRef("pro:path");
  expect(re.protocol).toEqual("pro");
  expect(re.path).toEqual("path");
});
test("no protocol", () => {
  const re = parseRef("path");
  expect(re.protocol).toBeUndefined;
  expect(re.path).toEqual("path");
});


