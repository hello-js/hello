import { pluralize } from "./string-fns"

export function timeDifferenceInWords(
  date1: Date,
  date2: Date = new Date()
): string {
  const yearsDifference = date2.getFullYear() - date1.getFullYear()
  const monthsDifference =
    date2.getMonth() - date1.getMonth() + yearsDifference * 12

  if (monthsDifference < 7) {
    return "a few months"
  } else if (monthsDifference < 12) {
    return "almost a year"
  }
  const fullYears = Math.floor(monthsDifference / 12)
  const remainingMonths = monthsDifference % 12

  if (remainingMonths === 0) {
    return `just about ${pluralize(fullYears, "year", "years")}`
  }

  if (remainingMonths <= 6) {
    return `just over ${pluralize(fullYears, "year", "years")}`
  }

  return `almost ${pluralize(fullYears + 1, "year", "years")}`
}
