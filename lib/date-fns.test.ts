import { timeDifferenceInWords } from "./date-fns"

describe("timeDifferenceInWords", () => {
  const baseDate = new Date("2023-04-01")

  test("returns 'a few months' for dates 0-6 months ago", () => {
    const fewMonthsAgo = new Date("2022-10-01")
    expect(timeDifferenceInWords(fewMonthsAgo, baseDate)).toBe("a few months")
  })

  test("returns 'almost a year' for dates 7-11 months ago", () => {
    const almostAYearAgo = new Date("2022-05-01")
    expect(timeDifferenceInWords(almostAYearAgo, baseDate)).toBe(
      "almost a year"
    )
  })

  test("returns 'just over a year' for dates 12-18 months ago", () => {
    const justOverAYearAgo = new Date("2021-10-01")
    expect(timeDifferenceInWords(justOverAYearAgo, baseDate)).toBe(
      "just over 1 year"
    )
  })

  test("returns 'almost 2 years' for dates 19-23 months ago", () => {
    const almostTwoYearsAgo = new Date("2021-05-01")
    expect(timeDifferenceInWords(almostTwoYearsAgo, baseDate)).toBe(
      "almost 2 years"
    )
  })

  // Additional tests for the "and so on" cases
  test("returns 'just over 2 years' for dates 24-30 months ago", () => {
    const justOverTwoYearsAgo = new Date("2020-10-01")
    expect(timeDifferenceInWords(justOverTwoYearsAgo, baseDate)).toBe(
      "just over 2 years"
    )
  })

  test("returns 'almost 3 years' for dates 31-35 months ago", () => {
    const almostThreeYearsAgo = new Date("2020-05-01")
    expect(timeDifferenceInWords(almostThreeYearsAgo, baseDate)).toBe(
      "almost 3 years"
    )
  })

  // Test for future dates
  test("handles future dates correctly", () => {
    const futureDate = new Date("2023-10-01")
    expect(timeDifferenceInWords(futureDate, baseDate)).toBe("a few months")
  })
})
