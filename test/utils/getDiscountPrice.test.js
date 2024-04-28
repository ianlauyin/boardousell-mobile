import getDiscountPrice from "../../src/utils/getDiscountPrice";

describe("utils/getDiscountPrice", () => {
  const price = 100;
  const discount = 0.8;
  const expectResult = 80;
  it("Should return the correct value", () => {
    expect(getDiscountPrice(price, discount)).toBe(expectResult);
  });
  it("Should return null when price is no given", () => {
    expect(getDiscountPrice(undefined, discount)).toBeNull();
  });
  it("Should return null when discount is no given", () => {
    expect(getDiscountPrice(price, undefined)).toBeNull();
  });
  it("Should return null when price is string", () => {
    expect(getDiscountPrice("100", discount)).toBeNull();
  });
  it("Should return null when discount is string", () => {
    expect(getDiscountPrice(price, "0.8")).toBeNull();
  });
});
