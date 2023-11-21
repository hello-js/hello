import { type MarkedExtension } from "marked"

declare module "marked-terminal" {
  export function markedTerminal(
    options?: Record<string, unknown>,
    highlightOptions?: Record<string, unknown>
  ): MarkedExtension
}
