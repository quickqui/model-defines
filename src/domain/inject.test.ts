import { InjectedWeaver } from "./InjectedWeaver";

test("inject no inject", () => {
  const model = {
    domainModel: {
      entities: [{ name: "aE", properties: [{ name: "aP", type: "string" }] }],
    },
  };
  const weaver = new InjectedWeaver();
  const re = weaver.weave(model);
  expect(re[0]).toEqual(model);
  expect(re[1].length).toEqual(0);
});
test("inject simple", () => {
  const model = {
    domainModel: {
      entities: [
        { name: "aE", properties: [{ name: "aP", type: "string" }] },
        {
          name: "bE",
          inject: "aE",
          properties: [{ name: "bP", type: "string" }],
        },
      ],
    },
  };
  const weaver = new InjectedWeaver();
  const re = weaver.weave(model);
  expect(re[1].length).toEqual(1);
  const exModel = {
    domainModel: {
      entities: [
        {
          name: "aE",
          properties: [
            { name: "aP", type: "string" },
            { name: "bP", type: "string" },
          ],
        },
      ],
    },
  };
  expect(re[0]).toEqual(exModel);
});
test("inject override", () => {
  const model = {
    domainModel: {
      entities: [
        { name: "aE", properties: [{ name: "aP", type: "string" }] },
        {
          name: "bE",
          inject: "aE",
          properties: [{ name: "aP", type: "number" }],
        },
      ],
    },
  };
  const weaver = new InjectedWeaver();
  const re = weaver.weave(model);
  expect(re[1].length).toEqual(1);
  const exModel = {
    domainModel: {
      entities: [
        {
          name: "aE",
          properties: [{ name: "aP", type: "number" }],
        },
      ],
    },
  };
  expect(re[0]).toEqual(exModel);
});
