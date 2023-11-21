export function compact<T>(array: (T | null | undefined | false)[]): T[] {
  return array.filter(Boolean) as T[]
}

export function toSentence(list: string[], joiner = "and") {
  switch (list.length) {
    case 0:
      return ""
    case 1:
      return list[0]
    case 2:
      return list.join(` ${joiner} `)
    default:
      return `${list.slice(0, -1).join(", ")}, ${joiner} ${
        list[list.length - 1]
      }`
  }
}
