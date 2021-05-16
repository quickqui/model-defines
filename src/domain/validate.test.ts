import { Entity } from "./DomainModel";
import { validation } from "./validation";

test("validate", () => {
  const en: Entity = {
    name: "Test",
    properties: [{ name: "id", type: "string",constraints: ["required"]}],
    namespace: "",
  };
  const values = { id: "xxx" };
  const vali = validation(en);
  expect(vali(values)).toEqual({});
});
test("validate find error", () => {
  const en: Entity = {
    name: "Test",
    properties: [{ name: "id", type: "string", constraints: ["required"] }],
    namespace: "",
  };
  const values = { id: "" };
  const vali = validation(en);
  expect(vali(values)).toEqual({ id: "required" });
});
test("validate find error", () => {
  const en: Entity = {
    name: "Test",
    properties: [{ name: "id", type: "string", constraints: ["required",'url'] }],
    namespace: "",
  };
  const values = { id: "xxx" }; 
  const vali = validation(en);
  expect(vali(values)).toEqual({ id: "url required" });
});