import { githubUserSchema } from "./schemas"

export async function getGithubProfile(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28"
    }
  })

  return githubUserSchema.parse(await res.json())
}

export async function hello(username: string) {
  const profile = await getGithubProfile(username)

  return {
    profile
  }
}
