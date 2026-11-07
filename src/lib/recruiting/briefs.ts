import type { FirmRecord } from './firms'

export function buildFirmBrief(firm: FirmRecord): string {
  const tag = `[${firm.sourceTag}]`
  return [
    `# ${firm.name} — recruiting brief`,
    '',
    `**Fund / scale** ${tag}: ${firm.fundSize}`,
    '',
    `**Strategy** ${tag}: ${firm.strategy}`,
    '',
    `**Sectors** ${tag}: ${firm.sectors.join(', ')}`,
    '',
    `**Geography** ${tag}: ${firm.geography}`,
    '',
    `**Recruiting notes** ${tag}: ${firm.recruitingNotes}`,
    '',
    `**Portfolio sample** ${tag}:`,
    ...firm.portfolioSample.map((p) => `- ${p}`),
    '',
    `_Source tags: verified = high-level public information; inferred = synthesized coaching guidance._`,
  ].join('\n')
}
