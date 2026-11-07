export type OutreachTemplateType =
  | 'intro'
  | 'linkedin'
  | 'referral'
  | 'thankyou'
  | 'followup'

export type OutreachVars = {
  name?: string
  firm?: string
  role?: string
  school?: string
  mutual?: string
  topic?: string
  sender?: string
}

const TEMPLATES: Record<OutreachTemplateType, string> = {
  intro: `Hi {{name}},

I'm {{sender}}, currently {{role}}{{school}}. I've been following {{firm}}'s work in {{topic}} and would value 15 minutes to learn how your team approaches diligence and associate development.

Happy to work around your calendar.

Thank you,
{{sender}}`,
  linkedin: `Hi {{name}} — I'm {{sender}} ({{role}}). Impressed by {{firm}}'s focus on {{topic}}. Would you be open to a brief chat on how you evaluate opportunities on your team?`,
  referral: `Hi {{name}},

{{mutual}} suggested I reach out. I'm recruiting for PE associate roles and am particularly interested in {{firm}}. I'd appreciate any perspective on {{topic}} and whether it might make sense to connect with your recruiting team.

Thank you,
{{sender}}`,
  thankyou: `Hi {{name}},

Thank you for taking the time to speak today about {{firm}}. I especially appreciated your points on {{topic}}. Please let me know if helpful to share a deal summary or availability for next steps.

Best,
{{sender}}`,
  followup: `Hi {{name}},

Quick follow-up on my note regarding {{firm}} / {{topic}}. Happy to send availability or a short background summary if useful. Thanks again for considering.

{{sender}}`,
}

export function fillTemplate(
  type: OutreachTemplateType,
  vars: OutreachVars,
): string {
  const template = TEMPLATES[type]
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = vars[key as keyof OutreachVars]
    return value && value.trim() ? value.trim() : `[${key}]`
  })
}

export function listOutreachTypes(): OutreachTemplateType[] {
  return ['intro', 'linkedin', 'referral', 'thankyou', 'followup']
}
