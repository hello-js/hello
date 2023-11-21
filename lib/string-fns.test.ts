import { pluralize } from "./string-fns"

describe("pluralize", () => {
  it("returns singular when count is 1", () => {
    expect(pluralize(1, "apple", "apples")).toBe("1 apple")
  })

  it("returns plural when count is greater than 1", () => {
    expect(pluralize(2, "apple", "apples")).toBe("2 apples")
  })

  it("returns plural when count is 0", () => {
    expect(pluralize(0, "apple", "apples")).toBe("0 apples")
  })

  it("returns plural when count is a negative number", () => {
    expect(pluralize(-1, "apple", "apples")).toBe("-1 apples")
  })

  // Additional test cases can be added as needed
})
