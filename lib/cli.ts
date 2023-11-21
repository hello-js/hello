#!/usr/bin/env node

import { marked } from "marked"
import { markedTerminal } from "marked-terminal"
import { ZodError, type z } from "zod"

import { compact, toSentence } from "./array-fns"
import { timeDifferenceInWords } from "./date-fns"
import { hello } from "./hello"
import { type githubUserSchema } from "./schemas"
import { pluralize } from "./string-fns"

marked.use(markedTerminal())

function printUsage() {
  console.log("Usage:")
  console.log("  npx hello <github-username>")
  console.log("")
  console.log("Example:")
  console.log("  npx hello venables")
}

function printProfile(profile: z.infer<typeof githubUserSchema>) {
  const markdown = []
  markdown.push(`# 👋 Hello, I'm ${profile.name ?? profile.login}`)

  if (profile.bio) {
    markdown.push(`\n\`${profile.bio}\`\n`)
  }

  /**
   * Professional Info
   */
  const companyLink = profile.company?.startsWith("@")
    ? `[${profile.company}](https://github.com/${profile.company.replace(
        "@",
        ""
      )})`
    : profile.company

  const info = toSentence(
    compact([
      profile.location && `I live in **${profile.location}**`,
      companyLink && `I work at **${companyLink}**`
    ]),
    "where"
  )

  if (info.length) {
    markdown.push(`${info}.`)
  }

  /**
   * Github Stats
   */
  const stats = compact([
    profile.public_repos > 0 &&
      `[${pluralize(
        profile.public_repos,
        "repo",
        "repos"
      )}](https://github.com/${profile.login}?tab=repositories)`,
    profile.public_gists > 0 &&
      `[${pluralize(
        profile.public_gists,
        "gist",
        "gists"
      )}](https://gist.github.com/${profile.login})`,
    profile.followers > 0 &&
      `[${pluralize(
        profile.followers,
        "follower",
        "followers"
      )}](https://github.com/${profile.login}?tab=followers)`,
    profile.following > 0 &&
      `I'm following [${pluralize(
        profile.following,
        "account",
        "accounts"
      )}](https://github.com/${profile.login}?tab=following)`
  ])

  const githubStats = toSentence(
    compact([
      `My Github username is **[@${profile.login}](${profile.html_url})**`,
      `I have ${toSentence(stats)}.`
    ]),
    "where"
  )

  markdown.push(githubStats)

  markdown.push(
    `I've been on Github for **${timeDifferenceInWords(
      profile.created_at
    )}** (since ${profile.created_at.toLocaleString("default", {
      month: "long",
      year: "numeric"
    })}).`
  )

  /**
   * External Links
   */
  const contact = compact([
    profile.blog && `on [my website](${profile.blog})`,
    profile.twitter_username &&
      `as [@${profile.twitter_username}](https://x.com/${profile.twitter_username}) on Twitter/X`,
    profile.email && `via email at [${profile.email}](${profile.email})`
  ])

  if (contact.length) {
    markdown.push(`You can find me ${toSentence(contact, "or")}.`)
  }

  if (profile.hireable) {
    markdown.push(`\nI am also **available for hire!**`)
  }

  console.log("")
  console.log(marked.parse(markdown.join("\n")).trim())
}

export async function main() {
  const args = process.argv.slice(2)
  const name = args[0]

  if (!name || name === "-h" || name === "--help") {
    printUsage()
    return
  }

  try {
    const { profile } = await hello(name.replace("@", ""))
    printProfile(profile)
  } catch (e) {
    console.error(`Could not find user "${name}"`)
  }
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    if (e instanceof ZodError) {
      console.error(e.issues)
    } else {
      console.error(e)
    }
    process.exit(1)
  })
