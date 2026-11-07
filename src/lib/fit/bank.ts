import type { FitQuestion } from './types'

export const FIT_QUESTIONS: FitQuestion[] = [
  {
    id: 'walk-resume',
    prompt: 'Walk me through your resume.',
    modelAnswer30s:
      'I grew up focused on quantitative problem-solving, studied [major] at [school], and spent last summer in [IB/PE/corp] where I built models and supported live diligence. That work confirmed I want ownership-oriented investing, which is why I’m recruiting for PE associate roles.',
    modelAnswer60s:
      'I started with [background hook], then chose [school/major] because I wanted a rigorous quantitative base. At [internship 1] I learned financial statement analysis and client communication. Last summer at [IB/PE] I built LBOs, digested CIMs, and supported expert calls on a live process—seeing how thesis, diligence, and returns connect. I’m drawn to PE because I want to underwrite businesses end-to-end and help create value over a multi-year hold, not only advise on a transaction. That’s why I’m excited about this seat and this firm’s [sector/approach].',
    pitfalls: [
      'Chronological dump with no theme',
      'Skipping why PE / why now',
      'Oversharing GPA or trivia instead of judgment',
    ],
    rubricKeywords: [
      'internship',
      'model',
      'diligence',
      'investing',
      'ownership',
      'why pe',
      'lbo',
      'thesis',
    ],
    structureHints: [
      'Hook → education → experiences → why PE → why here',
      'Keep each job to 1–2 outcomes, not a task list',
    ],
  },
  {
    id: 'why-pe',
    prompt: 'Why private equity?',
    modelAnswer30s:
      'I want to underwrite businesses with a multi-year ownership mindset—combining modeling, diligence, and operating levers—to drive equity returns for LPs, not just close a transaction.',
    modelAnswer60s:
      'Advisory work taught me how deals get sold; PE is where you live with the underwriting after close. I’m motivated by building a thesis, stress-testing it through diligence, structuring leverage thoughtfully, and then tracking value creation through growth, margins, and deleveraging. The feedback loop—from IC memo to portfolio KPIs to exit—is what I find intellectually and professionally compelling versus pure banking or public markets.',
    pitfalls: [
      'Saying PE is “prestigious” or “high compensation” as the lead',
      'Confusing PE with hedge funds or VC',
      'No concrete exposure or examples',
    ],
    rubricKeywords: [
      'underwrite',
      'ownership',
      'diligence',
      'value creation',
      'returns',
      'lbo',
      'multi-year',
      'thesis',
    ],
    structureHints: [
      'Contrast PE vs. banking/markets',
      'Tie to a specific experience that sparked the interest',
    ],
  },
  {
    id: 'why-this-firm',
    prompt: 'Why this firm?',
    modelAnswer30s:
      'Your sector focus, deal size, and hands-on portfolio approach match how I want to learn—deep underwriting plus real operating involvement—and the people I’ve met reinforce a coaching culture.',
    modelAnswer60s:
      'Three reasons. First, strategy fit: your [sector / middle-market / control] mandate matches the companies I’ve analyzed and where I can contribute earliest. Second, process: from conversations with [name], it’s clear juniors own real workstreams on diligence and modeling, which is how I learn fastest. Third, culture: the firm’s emphasis on [intellectual honesty / operating partners / LP alignment] matches how I work. I’m not shopping a generic PE brand—I’m choosing a place where the mandate and mentorship fit.',
    pitfalls: [
      'Generic praise that fits any sponsor',
      'Only citing brand or AUM',
      'No evidence you researched recent deals or people',
    ],
    rubricKeywords: [
      'sector',
      'deal',
      'portfolio',
      'culture',
      'mandate',
      'diligence',
      'people',
      'fit',
    ],
    structureHints: [
      'Strategy + process + people',
      'Name something specific (deal, vertical, operating model)',
    ],
  },
  {
    id: 'strengths',
    prompt: 'What are your greatest strengths?',
    modelAnswer30s:
      'I turn ambiguous diligence into structured analysis quickly, communicate crisply to seniors, and catch model breaks before they become IC surprises.',
    modelAnswer60s:
      'My strengths are structured problem-solving, communication under time pressure, and reliability. On [deal/project], I built a diligence tracker that linked expert-call themes to model sensitivities so the team could see which risks moved returns. I also write short so-whats rather than data dumps, which helped our VP prep for IC. Finally, I sweat reconciliation—sources & uses and debt schedules that balance—so seniors trust the numbers.',
    pitfalls: [
      'Vague traits with no evidence',
      'Listing soft skills only',
      'Strengths that sound like every other candidate',
    ],
    rubricKeywords: [
      'structured',
      'model',
      'communication',
      'diligence',
      'reliable',
      'analysis',
      'example',
    ],
    structureHints: [
      'Name 2–3 strengths each with a proof point',
      'Prefer PE-relevant strengths over generic adjectives',
    ],
  },
  {
    id: 'weaknesses',
    prompt: 'What is your greatest weakness?',
    modelAnswer30s:
      'I can over-polish first drafts when speed matters; I’ve started shipping a clean 80% version early, then iterating with feedback.',
    modelAnswer60s:
      'I tend to over-index on polish before sharing work. Early in my internship I held a model overnight to “finish” formatting and delayed a useful draft. Feedback from my associate was to send a reconciled first pass with labeled open items. I now time-box polish, lead with the so-what, and explicitly list assumptions that still need validation. The weakness is real; the mitigation is a habit I practice weekly.',
    pitfalls: [
      'Fake weaknesses (“I work too hard”)',
      'Fatal weaknesses for PE (carelessness with numbers) without mitigation',
      'No improvement story',
    ],
    rubricKeywords: [
      'feedback',
      'improve',
      'mitigation',
      'example',
      'habit',
      'draft',
      'speed',
    ],
    structureHints: [
      'Real weakness → example → concrete mitigation',
      'Choose something coachable, not integrity-related',
    ],
  },
  {
    id: 'leadership',
    prompt: 'Tell me about a time you led a team.',
    modelAnswer30s:
      'On [project], I set the workplan, assigned owners, and unblocked a stalled analysis so we delivered a decision-ready memo on time.',
    modelAnswer60s:
      'During [project], our group was behind on a client deliverable. I proposed a simple RACI, took the financial model, and paired a teammate on primary research. When we hit conflicting data, I called a 15-minute reset to agree on definitions and escalate one open question to our manager. We submitted on time; the manager used our framework in the final meeting. Leadership for me meant clarity, ownership, and removing blockers—not just doing more tasks myself.',
    pitfalls: [
      'Story where you did all the work alone',
      'No conflict or decision point',
      'Missing measurable outcome',
    ],
    rubricKeywords: [
      'team',
      'owned',
      'plan',
      'outcome',
      'unblock',
      'decision',
      'delegat',
    ],
    structureHints: [
      'Situation → task → actions → result',
      'Show influence without formal authority if needed',
    ],
  },
  {
    id: 'failure',
    prompt: 'Tell me about a failure or mistake.',
    modelAnswer30s:
      'I once shipped a sensitivity with a stale input; I fixed it immediately, told the team, and added a pre-send checklist so it does not recur.',
    modelAnswer60s:
      'On a live process I updated revenue drivers but forgot to refresh a linked sensitivity tab before a partner review. The partner caught an inconsistency. I owned it in the room, corrected the link, and rebuilt the tab with a checksum that flags stale cases. Since then I run a two-minute pre-send checklist: circulars, sources & uses balance, and timestamp on key outputs. The failure was process; the lesson was visible QA, not quiet embarrassment.',
    pitfalls: [
      'Blaming others',
      'Choosing a trivial “failure”',
      'No lasting process change',
    ],
    rubricKeywords: [
      'owned',
      'mistake',
      'fixed',
      'checklist',
      'process',
      'lesson',
      'communicat',
    ],
    structureHints: [
      'Own the mistake quickly',
      'End on systemic fix, not self-flagellation',
    ],
  },
  {
    id: 'proud-deal',
    prompt: 'Tell me about a deal or project you are proud of.',
    modelAnswer30s:
      'I’m proud of [deal/project] where my analysis changed a key assumption and improved the team’s underwriting of downside returns.',
    modelAnswer60s:
      'On [deal], I owned the customer-churn workstream. Expert calls suggested logo churn was understated in the CIM. I rebuilt a cohort view from data-room extracts and showed that a 150 bps higher churn cut MOIC by ~0.2x in our downside. The team tightened the bid and added a specific diligence ask. Pride for me is decision impact—not just hours billed. I learned to connect qualitative signals to returns math quickly.',
    pitfalls: [
      'Describing only tasks with no impact',
      'Claiming credit for the whole deal',
      'No numbers or decision change',
    ],
    rubricKeywords: [
      'impact',
      'analysis',
      'diligence',
      'returns',
      'assumption',
      'team',
      'underwriting',
    ],
    structureHints: [
      'Your role → insight → decision impact',
      'Quantify when possible',
    ],
  },
  {
    id: 'teamwork-conflict',
    prompt: 'Describe a time you had a conflict on a team.',
    modelAnswer30s:
      'A teammate and I disagreed on an approach; I aligned on the decision criteria, tested both paths quickly, and we picked the one that better served the deadline and accuracy.',
    modelAnswer60s:
      'On a case competition, a teammate wanted a complex model while I pushed a simpler decision framework. Instead of arguing preferences, I proposed we define success: auditable logic in 24 hours. We built a lightweight model and a one-page so-what; the complex version became an appendix. Judges favored clarity. The conflict taught me to negotiate on criteria and time, not ego.',
    pitfalls: [
      'Portraying yourself as always right',
      'Avoiding the conflict entirely in the story',
      'Burning a former teammate',
    ],
    rubricKeywords: [
      'conflict',
      'align',
      'criteria',
      'compromise',
      'outcome',
      'communicat',
      'deadline',
    ],
    structureHints: [
      'Disagreement → shared criteria → resolution → result',
    ],
  },
  {
    id: 'prioritization',
    prompt: 'How do you prioritize when everything is urgent?',
    modelAnswer30s:
      'I clarify the decision the senior needs next, time-box lower-leverage polish, and communicate tradeoffs early rather than silently thrashing.',
    modelAnswer60s:
      'I start by asking what decision or deliverable is time-critical—IC tomorrow versus a nice-to-have chart. I break work into must-have numbers, supporting diligence, and formatting. Must-haves get done first with labeled open items. I send a short status note with ETAs and blockers so seniors can re-order if needed. Silent heroics are worse than an early tradeoff conversation.',
    pitfalls: [
      'Claiming you “just work harder”',
      'No communication with stakeholders',
      'Equal priority to everything',
    ],
    rubricKeywords: [
      'decision',
      'tradeoff',
      'communicate',
      'time-box',
      'blocker',
      'must-have',
      'priority',
    ],
    structureHints: [
      'Decision-first triage',
      'Visible status updates',
    ],
  },
  {
    id: 'feedback',
    prompt: 'Tell me about feedback you received and how you responded.',
    modelAnswer30s:
      'My associate said my emails buried the ask; I switched to lead with the recommendation and open questions, and my turnaround feedback improved.',
    modelAnswer60s:
      'Mid-internship feedback: my updates were thorough but hard to scan. I rebuilt a template—recommendation, three bullets of evidence, open items, ETA. Within two weeks my VP forwarded my notes without rewriting. I now solicit one piece of process feedback weekly so improvements compound. Good PE juniors treat feedback as a product backlog, not a personal attack.',
    pitfalls: [
      'Defensive framing',
      'Feedback with no behavior change',
      'Choosing feedback unrelated to work quality',
    ],
    rubricKeywords: [
      'feedback',
      'changed',
      'template',
      'improve',
      'communication',
      'associate',
      'habit',
    ],
    structureHints: [
      'Feedback → specific change → evidence it worked',
    ],
  },
  {
    id: 'ethical-pressure',
    prompt: 'Describe a time you faced an ethical or integrity issue.',
    modelAnswer30s:
      'I flagged a material error in materials before they went to a client even though it meant a delay; accuracy mattered more than looking fast.',
    modelAnswer60s:
      'Before a client send, I noticed an EBITDA bridge used an add-back we could not support. Shipping it would have been faster; correcting it meant owning an uncomfortable conversation. I raised it to my associate with the fix and a revised timeline. We delayed one hour and sent clean numbers. Integrity in PE compounds—bad inputs destroy trust with IC, lenders, and management.',
    pitfalls: [
      'Hypothetical-only answers when you have a real example',
      'Minimizing material errors',
      'Throwing teammates under the bus',
    ],
    rubricKeywords: [
      'integrity',
      'flagged',
      'accurate',
      'escalat',
      'trust',
      'material',
      'correct',
    ],
    structureHints: [
      'Pressure → choice → transparent fix',
    ],
  },
  {
    id: 'why-not-ib',
    prompt: 'Why PE instead of staying in investment banking?',
    modelAnswer30s:
      'I enjoy the transaction craft, but I want to own the underwriting and value-creation plan after the deal closes—not only run the process.',
    modelAnswer60s:
      'Banking taught me process intensity, modeling standards, and how sellers package a story. I’m moving to PE because I want accountability for the thesis over years: diligence depth, capital structure choices, and portfolio operating cadence. The skill overlap is real—LBOs, CIMs, IC materials—but the decision rights and feedback loop are different. I’m choosing PE for ownership of outcomes, not to escape hard work.',
    pitfalls: [
      'Trashing banking culture',
      'Implying PE is “easier hours”',
      'No appreciation for skills banking taught',
    ],
    rubricKeywords: [
      'ownership',
      'underwriting',
      'value creation',
      'thesis',
      'portfolio',
      'banking',
      'accountability',
    ],
    structureHints: [
      'Respect banking skills → PE ownership difference',
    ],
  },
  {
    id: 'questions-for-us',
    prompt: 'What questions do you have for us?',
    modelAnswer30s:
      'How do analysts typically split time between live deals, portfolio support, and sourcing in the first year—and what separates a strong first-year from a great one here?',
    modelAnswer60s:
      'Two questions. First, on the role: how is an incoming analyst’s time split across live processes, portfolio work, and coverage—and which workstreams do you expect them to own within six months? Second, on development: looking at people who thrived here, what habits or judgment calls mattered most beyond technical horsepower? I’m trying to understand how you coach juniors into real investment judgment.',
    pitfalls: [
      'No questions prepared',
      'Only asking about hours or pay',
      'Questions answerable by the website',
    ],
    rubricKeywords: [
      'analyst',
      'workstream',
      'portfolio',
      'development',
      'ownership',
      'coaching',
      'first year',
    ],
    structureHints: [
      'Ask about role ownership and how excellence is judged',
      'Show you researched the firm already',
    ],
  },
]

export function getFitQuestion(id: string): FitQuestion | undefined {
  return FIT_QUESTIONS.find((q) => q.id === id)
}

export function pickFitQuestion(excludeIds: string[] = []): FitQuestion {
  const pool = FIT_QUESTIONS.filter((q) => !excludeIds.includes(q.id))
  const usable = pool.length > 0 ? pool : FIT_QUESTIONS
  return usable[Math.floor(Math.random() * usable.length)]
}
