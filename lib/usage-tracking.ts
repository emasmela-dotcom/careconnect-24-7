// Usage Tracking - Track which tools users access most

export interface ToolUsage {
  href: string
  name: string
  lastUsed: string
  useCount: number
}

const STORAGE_KEY = 'careconnect-tool-usage'

// Track tool usage
export function trackToolUsage(href: string, name: string) {
  if (typeof window === 'undefined') return

  const usage = getToolUsage()
  const existing = usage.find(u => u.href === href)

  if (existing) {
    existing.lastUsed = new Date().toISOString()
    existing.useCount += 1
  } else {
    usage.push({
      href,
      name,
      lastUsed: new Date().toISOString(),
      useCount: 1,
    })
  }

  // Sort by use count and last used
  usage.sort((a, b) => {
    if (b.useCount !== a.useCount) {
      return b.useCount - a.useCount
    }
    return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()
  })

  // Keep only top 20
  const topUsage = usage.slice(0, 20)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topUsage))
}

// Get tool usage data
export function getToolUsage(): ToolUsage[] {
  if (typeof window === 'undefined') return []

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// Get recently used tools (last 7 days)
export function getRecentlyUsedTools(limit: number = 5): ToolUsage[] {
  const usage = getToolUsage()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  return usage
    .filter(u => new Date(u.lastUsed) >= sevenDaysAgo)
    .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
    .slice(0, limit)
}

// Get frequently used tools
export function getFrequentlyUsedTools(limit: number = 5): ToolUsage[] {
  const usage = getToolUsage()
  return usage
    .sort((a, b) => b.useCount - a.useCount)
    .slice(0, limit)
}


