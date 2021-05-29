import schema from "./FunctionSchema.json";
import enjoi from "enjoi";
const s = enjoi.schema(schema);

test("validate by schema", () => {
  const fun = { name: "test" };
  const { error } = s.validate(fun, { abortEarly: false });
  expect(error.details).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        message: expect.stringContaining("namespace"),
      }),
      expect.objectContaining({
        message: expect.stringContaining("resource"),
      }),
    ])
  );
});
test("validate by schema", () => {
  const fun = { name: "test", resource: "testResource" };
  const { error } =s.validate(fun, { abortEarly: false });
  expect(error.details).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        message: expect.stringContaining("namespace"),
      }),
    ])
  );
});
test("validate by schema", () => {
  const fun = {
    name: "test",
    resource: "testResource",
    namespace: "test/namespace",
    parameters:{
      "testP":'testPValue'
    }
  };

  const re = s.validate(fun);
  const { error, value } = re;
  expect(error).toBeNull();
  expect(value).toEqual(fun);
});
