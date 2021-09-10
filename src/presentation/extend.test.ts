import PresentationExtendWeaver from "./PresentationExtendWeaver";

test("extend no extend", () => {
  const model = {
    presentationModel: {
      presentations: [{ name: "aE",propertyRules:[{property:'aP',rules:['hidden']}] }],
    },
    pageModel: {
      pages:[]
    }
  };
  const weaver = new PresentationExtendWeaver();
  const re = weaver.weave(model);
  expect(re[0]).toEqual(model);
  expect(re[1].length).toEqual(0);
});

test("extend simple", () => {
  const model = {
    presentationModel: {
      presentations: [
        {
          name: "aE",
          extend: "bE",
          propertyRules: [{ property: "aP", rules: ["hidden"] }],
        },
        { name: "bE", propertyRules: [{ property: "aP", rules: ["id"] }] },
      ],
    },
    pageModel: {
      pages: [],
    },
  };
  const weaver = new PresentationExtendWeaver();
  const re = weaver.weave(model);
  const exModel = {
    presentationModel: {
      presentations: [
        {
          name: "aE",
          extend: "bE",
          propertyRules: [{ property: "aP", rules: ["id", "hidden"] }],
          abstract: false,
          annotations: {},
        },
        { name: "bE", propertyRules: [{ property: "aP", rules: ["id"] }] },
      ],
    },
    pageModel: {
      pages: [],
    },
  };
  expect(re[0]).toEqual(exModel);
  expect(re[1].length).toEqual(1);
});