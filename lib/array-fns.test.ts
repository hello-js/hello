// Import the functions from the array-fns module
import { compact, toSentence } from "./array-fns"

// Tests for the compact function
describe("compact", () => {
  it("removes all falsy values from the array", () => {
    expect(compact([0, 1, false, 2, "", 3, null, 4, undefined, 5])).toEqual([
      1, 2, 3, 4, 5
    ])
  })

  it("returns an empty array when all elements are falsy", () => {
    expect(compact([false, null, undefined, 0, ""])).toEqual([])
  })

  it("returns the same array when there are no falsy values", () => {
    expect(compact([1, 2, 3])).toEqual([1, 2, 3])
  })

  it("handles an array with only falsy values", () => {
    expect(compact([false, null, undefined])).toEqual([])
  })

  it("handles an empty array", () => {
    expect(compact([])).toEqual([])
  })
})

// Tests for the toSentence function
describe("toSentence", () => {
  it("converts an array of strings into a sentence", () => {
    expect(toSentence(["Alice", "Bob", "Charlie"])).toBe(
      "Alice, Bob, and Charlie"
    )
  })

  it('uses "or" as a custom joiner', () => {
    expect(toSentence(["Alice", "Bob", "Charlie"], "or")).toBe(
      "Alice, Bob, or Charlie"
    )
  })

  it("handles an array with two elements", () => {
    expect(toSentence(["Alice", "Bob"])).toBe("Alice and Bob")
  })

  it("handles a single-element array", () => {
    expect(toSentence(["Alice"])).toBe("Alice")
  })

  it("returns an empty string for an empty array", () => {
    expect(toSentence([])).toBe("")
  })
})
