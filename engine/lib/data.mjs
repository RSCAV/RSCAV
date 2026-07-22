// Live inputs. Everything the world is drawn from is fetched at build time so
// the committed SVGs are always a snapshot of real numbers, never placeholders.

import { execFileSync } from 'node:child_process'

function gh(query, vars = {}) {
  const args = ['api', 'graphql', '-f', `query=${query}`]
  for (const [k, v] of Object.entries(vars)) args.push('-F', `${k}=${v}`)
  const out = execFileSync('gh', args, { maxBuffer: 32 * 1024 * 1024 }).toString()
  const j = JSON.parse(out)
  if (j.errors) throw new Error(JSON.stringify(j.errors))
  return j.data
}

const iso = (d) => d.toISOString().replace(/\.\d+Z$/, 'Z')

export function fetchContributions(login) {
  const to = new Date()
  const from = new Date(to.getTime() - 364 * 864e5)
  from.setUTCHours(0, 0, 0, 0)

  const q = `query($login:String!,$from:DateTime!,$to:DateTime!){
    user(login:$login){
      createdAt
      contributionsCollection(from:$from,to:$to){
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoryContributions
        restrictedContributionsCount
        contributionCalendar{
          totalContributions
          weeks{ contributionDays{ date contributionCount weekday } }
        }
      }
    }
  }`

  const d = gh(q, { login, from: iso(from), to: iso(to) })
  const cc = d.user.contributionsCollection
  const cal = cc.contributionCalendar

  const weeks = cal.weeks.map((w) => w.contributionDays.map((x) => ({ date: x.date, c: x.contributionCount, wd: x.weekday })))
  const days = weeks.flat()
  const counts = days.map((d) => d.c)

  // longest run of consecutive days with at least one contribution
  let streak = 0
  let best = 0
  for (const d of days) {
    if (d.c > 0) {
      streak++
      best = Math.max(best, streak)
    } else streak = 0
  }

  // current streak, walking back from the most recent day
  let cur = 0
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].c > 0) cur++
    else if (i < days.length - 1) break
  }

  return {
    login,
    createdAt: d.user.createdAt,
    weeks,
    days,
    total: cal.totalContributions,
    commits: cc.totalCommitContributions,
    prs: cc.totalPullRequestContributions,
    issues: cc.totalIssueContributions,
    repos: cc.totalRepositoryContributions,
    private: cc.restrictedContributionsCount,
    max: Math.max(...counts, 0),
    activeDays: counts.filter((c) => c > 0).length,
    longestStreak: best,
    currentStreak: cur,
    from: days[0]?.date,
    to: days[days.length - 1]?.date,
  }
}

/** Monthly totals, oldest first, for the dither charts. */
export function byMonth(days) {
  const m = new Map()
  for (const d of days) {
    const key = d.date.slice(0, 7)
    m.set(key, (m.get(key) || 0) + d.c)
  }
  return [...m.entries()].map(([month, total]) => ({ month, total }))
}

/** Contributions bucketed by weekday, Sunday first. */
export function byWeekday(days) {
  const out = Array.from({ length: 7 }, () => 0)
  for (const d of days) out[d.wd] += d.c
  return out
}
