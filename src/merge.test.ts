import { mergeByKey } from "./Merge";

test("merge by key ", () => {
  const a = [
    { name: 1, value: 1 },
    { name: 2, value: 2 },
  ];
  const b = [{ name: 3, value: "b1" }];
  const re = mergeByKey(a, b);
  expect(re).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: 1, value: 1 }),
      expect.objectContaining({ name: 2, value: 2 }),
      expect.objectContaining({ name: 3, value: "b1" }),
    ])
  );
});

test("merge by key ", () => {
  const a = [
    { name: 1, value: 1 },
    { name: 2, value: 2 },
  ];
  const b = [{ name: 2, value2: "b1" }];
  const re = mergeByKey(a, b);
  expect(re).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: 1, value: 1 }),
      expect.objectContaining({ name: 2, value: 2, value2: "b1" }),
    ])
  );
});

test("merge by key ", () => {
  const a = [];
  const b = [{ name: 3, value: "b1" }];
  const re = mergeByKey(a, b);
  expect(re).toEqual(
    expect.arrayContaining([expect.objectContaining({ name: 3, value: "b1" })])
  );
});
test("merge by key ", () => {
  const b = [];
  const a = [{ name: 3, value: "b1" }];
  const re = mergeByKey(a, b);
  expect(re).toEqual(
    expect.arrayContaining([expect.objectContaining({ name: 3, value: "b1" })])
  );
});
test("merge by key array contact", () => {
  const a = [
    { name: 1, value: [1] },
    { name: 2, value: [2] },
  ];
  const b = [{ name: 1, value: ["b1"] }];
  const re = mergeByKey(a, b);
  expect(re).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: 1, value: [1, "b1"] }),
      expect.objectContaining({ name: 2, value: [2] }),
    ])
  );
});

test("merge by key override", () => {
  const a = [
    { name: 1, value: 1 },
    { name: 2, value: 2 },
  ];
  const b = [{ name: 1, value: "b1" }];
  const re = mergeByKey(a, b);
  expect(re).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: 1, value: "b1" }),
      expect.objectContaining({ name: 2, value: 2 }),
    ])
  );
});
