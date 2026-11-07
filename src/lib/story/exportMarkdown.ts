import type { ResumeDraft, StoryDraft } from './types'

export function exportMarkdown(
  story: StoryDraft,
  resume: ResumeDraft,
): string {
  const bullets =
    resume.experienceBullets.length > 0
      ? resume.experienceBullets.map((b) => `- ${b}`).join('\n')
      : '- (add experience bullets)'
  const skills =
    resume.skills.length > 0 ? resume.skills.join(', ') : '(add skills)'

  return `# Personal story (${story.versionLabel})

## Background
${story.background || '_TBD_'}

## Motivations
${story.motivations || '_TBD_'}

## Experiences
${story.experiences || '_TBD_'}

## Interests
${story.interests || '_TBD_'}

## Differentiators
${story.differentiators || '_TBD_'}

---

# Resume draft (${resume.versionLabel})

**Target role:** ${resume.targetRole || '_TBD_'}

## Education
${resume.education || '_TBD_'}

## Experience
${bullets}

## Skills
${skills}

_Updated: story ${story.updatedAt} · resume ${resume.updatedAt}_
`
}
