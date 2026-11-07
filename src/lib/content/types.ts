export type ContentDifficulty = 'easy' | 'medium' | 'hard'

export type ContentItemMeta = {
  id: string
  title: string
  difficulty?: ContentDifficulty
  tags?: string[]
}
