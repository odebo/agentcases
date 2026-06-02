export type Difficulty = 'no-code' | 'low-code' | 'dev-required'
export type Industry = 'sales' | 'customer-service' | 'hr' | 'legal' | 'operations' | 'marketing' | 'finance' | 'product'
export type TaskType = 'automation' | 'data-analysis' | 'content-generation' | 'decision-support' | 'customer-communication'

export interface CaseFrontmatter {
  title_en: string
  title_zh: string
  summary_en: string
  summary_zh: string
  comment_en: string
  comment_zh: string
  industry: Industry
  task: TaskType[]
  framework: string
  difficulty: Difficulty
  date: string
  source: string
  source_url: string
  image?: string
  featured?: boolean
  meta_title: string
  meta_description: string
}

export interface Case extends CaseFrontmatter {
  slug: string
  content: string
}
