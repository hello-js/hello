import { z } from "zod"

export const githubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  avatar_url: z.string().url(),
  gravatar_id: z.nullable(z.string()),
  url: z.string().url(),
  html_url: z.string().url(),
  followers_url: z.string().url(),
  following_url: z.string(),
  gists_url: z.string(),
  starred_url: z.string(),
  subscriptions_url: z.string().url(),
  organizations_url: z.string().url(),
  repos_url: z.string().url(),
  events_url: z.string(),
  received_events_url: z.string().url(),
  type: z.string(),
  site_admin: z.boolean(),
  name: z.nullable(z.string()),
  company: z.nullable(z.string()),
  blog: z.nullable(z.string()),
  location: z.nullable(z.string()),
  email: z.nullable(z.string().email()).optional(),
  hireable: z.nullable(z.boolean()),
  bio: z.nullable(z.string()),
  twitter_username: z.nullable(z.string()),
  public_repos: z.number(),
  public_gists: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  private_gists: z.number().optional(),
  total_private_repos: z.number().optional(),
  owned_private_repos: z.number().optional(),
  disk_usage: z.number().optional(),
  collaborators: z.number().optional()
})
