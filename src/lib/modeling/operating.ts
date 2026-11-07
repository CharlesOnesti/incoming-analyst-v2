export type OperatingIndustry =
  | 'saas'
  | 'retail'
  | 'manufacturing'
  | 'services'

export type OperatingDrill = {
  id: string
  industry: OperatingIndustry
  prompt: string
  framework: string[]
  checklist: string[]
}

export const OPERATING_DRILLS: OperatingDrill[] = [
  {
    id: 'saas-nrr',
    industry: 'saas',
    prompt:
      'NRR slipped from 115% to 108%. Diagnose drivers and draft a 90-day operating plan.',
    framework: [
      'Segment logo vs. revenue retention',
      'Isolate expansion, contraction, churn',
      'Map cohort and product packaging issues',
      'Prioritize fixes by ARR impact',
    ],
    checklist: [
      'Stated NRR bridge',
      'Named top churn cohorts',
      'Proposed expansion levers',
      'Assigned owners and KPIs',
    ],
  },
  {
    id: 'saas-cac-payback',
    industry: 'saas',
    prompt:
      'CAC payback stretched from 14 to 22 months after a new enterprise motion. What do you change?',
    framework: [
      'Separate SMB vs. enterprise unit economics',
      'Review sales capacity and ramp',
      'Check discounting and implementation drag',
      'Rebalance mix and channels',
    ],
    checklist: [
      'Unit-econ by segment',
      'Sales productivity diagnosis',
      'Pricing / discount action',
      'Near-term cash impact',
    ],
  },
  {
    id: 'retail-same-store',
    industry: 'retail',
    prompt:
      'Same-store sales are −3% with traffic down and ticket flat. Build a turnaround outline.',
    framework: [
      'Traffic vs. conversion vs. ticket',
      'Category and regional variance',
      'Promo effectiveness',
      'Labor and occupancy leverage',
    ],
    checklist: [
      'Traffic/conversion bridge',
      'Assortment actions',
      'Promo ROI view',
      'Cost actions that protect brand',
    ],
  },
  {
    id: 'retail-inventory',
    industry: 'retail',
    prompt:
      'Inventory turns slowed and aged stock is rising ahead of peak season. What is your plan?',
    framework: [
      'Age buckets and markdown risk',
      'Open-to-buy discipline',
      'Vendor returns and liquidations',
      'Working-capital and margin tradeoffs',
    ],
    checklist: [
      'Aged inventory map',
      'Markdown calendar',
      'Buying freeze rules',
      'Cash release estimate',
    ],
  },
  {
    id: 'mfg-throughput',
    industry: 'manufacturing',
    prompt:
      'A plant is capacity-constrained while scrap rates climbed. How do you raise output without quality loss?',
    framework: [
      'Bottleneck identification',
      'OEE and scrap root causes',
      'Maintenance and changeover time',
      'Capex vs. process fixes',
    ],
    checklist: [
      'Named bottleneck',
      'Scrap Pareto',
      'Quick wins vs. capex',
      'Quality gates preserved',
    ],
  },
  {
    id: 'mfg-pricing-cost',
    industry: 'manufacturing',
    prompt:
      'Input costs rose 12% and contracts renew unevenly. Design a pricing and surcharge response.',
    framework: [
      'Contract coverage and escalation clauses',
      'Customer willingness-to-pay',
      'Product mix and value-add',
      'Cost-out parallel track',
    ],
    checklist: [
      'Contract exposure map',
      'Price action by segment',
      'Surcharge / index mechanism',
      'Margin recovery timeline',
    ],
  },
  {
    id: 'services-utilization',
    industry: 'services',
    prompt:
      'Billable utilization fell 5pts while headcount grew. Diagnose and recover contribution margin.',
    framework: [
      'Staffing vs. demand timing',
      'Bench and ramp productivity',
      'Pricing and scope creep',
      'Role mix and leverage model',
    ],
    checklist: [
      'Utilization by role',
      'Hiring freeze or redeploy plan',
      'Scope control actions',
      'Margin bridge',
    ],
  },
  {
    id: 'services-retention',
    industry: 'services',
    prompt:
      'A facilities-services platform is losing mid-market accounts at renewal. What operating moves do you make?',
    framework: [
      'Churn reason codes',
      'Service-level and NPS gaps',
      'Pricing vs. competitor bundles',
      'Account coverage model',
    ],
    checklist: [
      'Churn root causes',
      'Save desk playbook',
      'Service recovery actions',
      'Renewal KPI dashboard',
    ],
  },
]

export function drillsForIndustry(
  industry: OperatingIndustry,
): OperatingDrill[] {
  return OPERATING_DRILLS.filter((d) => d.industry === industry)
}

export function getOperatingDrill(id: string): OperatingDrill | undefined {
  return OPERATING_DRILLS.find((d) => d.id === id)
}
