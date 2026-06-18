export const PIPELINE_STAGES = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won'];

export const STATUS_OPTIONS = [...PIPELINE_STAGES, 'Lost'];

export const SOURCE_OPTIONS = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

const STAGE_PROBABILITY = {
  New: 0.1,
  Contacted: 0.25,
  'Meeting Scheduled': 0.45,
  'Proposal Sent': 0.7,
  Won: 1,
  Lost: 0,
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const toDate = (value) => {
  const date = value ? new Date(value) : null;
  return date && Number.isFinite(date.getTime()) ? date : null;
};

const normalizeLeads = (leads) => (Array.isArray(leads) ? leads.filter(Boolean) : []);

const stableNumberFromLead = (lead, min = 5000, max = 75000) => {
  const seed = `${lead?.id || ''}${lead?.email || ''}${lead?.name || ''}${lead?.company || ''}`;
  const hash = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return min + (hash % (max - min + 1));
};

export const getLeadValue = (lead) => {
  const rawValue = Number(lead?.value ?? lead?.dealValue ?? lead?.amount ?? lead?.revenue);
  return Number.isFinite(rawValue) && rawValue > 0 ? rawValue : stableNumberFromLead(lead);
};

const getWonDate = (lead) => toDate(lead?.wonAt || lead?.closedAt || lead?.updatedAt || lead?.createdAt);

const getOwnerName = (lead) => (
  lead?.owner
  || lead?.assignedTo
  || lead?.salesRep
  || lead?.createdBy
  || lead?.company
  || 'Unassigned'
);

const getRangeStart = (range, now = new Date()) => {
  if (range === 'year' || range === '365') {
    return new Date(now.getFullYear(), 0, 1);
  }

  const days = Number(range) || 30;
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));
  return start;
};

const getPeriodDays = (range, now = new Date()) => {
  if (range === 'year' || range === '365') {
    return Math.max(1, Math.ceil((now - getRangeStart(range, now)) / MS_PER_DAY) + 1);
  }

  return Number(range) || 30;
};

const getMonthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

const getMonthLabel = (date) => date.toLocaleDateString('en-US', { month: 'short' });

const createMonthBuckets = (leads, range) => {
  const now = new Date();
  const start = getRangeStart(range, now);
  const buckets = new Map();
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 1);

  while (cursor <= end) {
    buckets.set(getMonthKey(cursor), {
      date: getMonthLabel(cursor),
      sortDate: new Date(cursor),
      leads: 0,
      won: 0,
      revenue: 0,
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  normalizeLeads(leads).forEach((lead) => {
    const createdAt = toDate(lead?.createdAt);
    if (!createdAt || createdAt < start || createdAt > now) return;

    const key = getMonthKey(createdAt);
    const bucket = buckets.get(key);
    if (!bucket) return;

    bucket.leads += 1;
    if (lead.status === 'Won') {
      bucket.won += 1;
      bucket.revenue += getLeadValue(lead);
    }
  });

  return [...buckets.values()].sort((a, b) => a.sortDate - b.sortDate);
};

export const filterLeadsByDateRange = (leads, range = '30') => {
  const safeLeads = normalizeLeads(leads);
  const start = getRangeStart(range);

  return safeLeads.filter((lead) => {
    const createdAt = toDate(lead?.createdAt);
    return createdAt ? createdAt >= start : true;
  });
};

export const calculateTotalLeads = (leads) => normalizeLeads(leads).length;

export const calculateWonLeads = (leads) => normalizeLeads(leads).filter((lead) => lead.status === 'Won').length;

export const calculateLostLeads = (leads) => normalizeLeads(leads).filter((lead) => lead.status === 'Lost').length;

export const calculateConversionRate = (leads) => {
  const total = calculateTotalLeads(leads);
  return total ? Number(((calculateWonLeads(leads) / total) * 100).toFixed(1)) : 0;
};

export const calculateLostRate = (leads) => {
  const total = calculateTotalLeads(leads);
  return total ? Number(((calculateLostLeads(leads) / total) * 100).toFixed(1)) : 0;
};

export const calculateWonRevenue = (leads) => (
  normalizeLeads(leads)
    .filter((lead) => lead.status === 'Won')
    .reduce((sum, lead) => sum + getLeadValue(lead), 0)
);

export const calculatePipelineValue = (leads) => (
  normalizeLeads(leads)
    .filter((lead) => !['Won', 'Lost'].includes(lead.status))
    .reduce((sum, lead) => sum + getLeadValue(lead) * (STAGE_PROBABILITY[lead.status] || 0.2), 0)
);

export const calculateAverageSalesCycle = (leads) => {
  const wonLeads = normalizeLeads(leads).filter((lead) => lead.status === 'Won');
  if (!wonLeads.length) return 0;

  const totalDays = wonLeads.reduce((sum, lead) => {
    const createdAt = toDate(lead.createdAt);
    const wonAt = getWonDate(lead);
    if (!createdAt || !wonAt) return sum;
    return sum + Math.max(1, Math.round((wonAt - createdAt) / MS_PER_DAY));
  }, 0);

  return Math.round(totalDays / wonLeads.length);
};

export const calculateStatusDistribution = (leads) => {
  const counts = STATUS_OPTIONS.reduce((acc, status) => ({ ...acc, [status]: 0 }), {});
  normalizeLeads(leads).forEach((lead) => {
    counts[lead.status || 'New'] = (counts[lead.status || 'New'] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .filter((item) => item.value > 0);
};

export const calculateFunnelData = (leads) => {
  const counts = PIPELINE_STAGES.reduce((acc, stage) => ({ ...acc, [stage]: 0 }), {});
  normalizeLeads(leads).forEach((lead) => {
    if (Object.hasOwn(counts, lead.status)) counts[lead.status] += 1;
  });

  return PIPELINE_STAGES.map((name) => ({
    name: name.replace(' Scheduled', '').replace(' Sent', ''),
    stage: name,
    value: counts[name],
  }));
};

export const calculateMonthlyLeads = (leads, range = '30') => (
  createMonthBuckets(leads, range).map(({ date, leads: leadCount }) => ({ date, leads: leadCount }))
);

export const calculateConversionByMonth = (leads, range = '30') => (
  createMonthBuckets(leads, range).map(({ date, leads: total, won }) => ({
    date,
    rate: total ? Number(((won / total) * 100).toFixed(1)) : 0,
  }))
);

export const calculateRevenueByMonth = (leads, range = '30') => (
  createMonthBuckets(leads, range).map(({ date, revenue }) => ({ date, revenue }))
);

export const calculateLeadSources = (leads) => {
  const counts = SOURCE_OPTIONS.reduce((acc, source) => ({ ...acc, [source]: 0 }), {});
  normalizeLeads(leads).forEach((lead) => {
    const source = lead.source && Object.hasOwn(counts, lead.source) ? lead.source : 'Other';
    counts[source] += 1;
  });

  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);
};

export const calculateSalesVelocity = (leads) => {
  const safeLeads = normalizeLeads(leads);
  const opportunities = safeLeads.filter((lead) => !['Lost'].includes(lead.status)).length;
  const winRate = calculateConversionRate(safeLeads) / 100;
  const averageDealValue = calculateWonLeads(safeLeads)
    ? calculateWonRevenue(safeLeads) / calculateWonLeads(safeLeads)
    : safeLeads.reduce((sum, lead) => sum + getLeadValue(lead), 0) / Math.max(safeLeads.length, 1);
  const salesCycle = Math.max(calculateAverageSalesCycle(safeLeads), 1);

  return Math.round((opportunities * averageDealValue * winRate) / salesCycle);
};

export const calculateForecastRevenue = (leads, range = '30') => {
  const safeLeads = normalizeLeads(leads);
  const pipelineWeighted = calculatePipelineValue(safeLeads);
  const days = getPeriodDays(range);
  const wonRevenue = calculateWonRevenue(safeLeads);
  const runRate = wonRevenue ? (wonRevenue / days) * 30 : 0;

  return Math.round(pipelineWeighted + runRate);
};

export const calculateTopPerformers = (leads) => {
  const performers = new Map();

  normalizeLeads(leads)
    .filter((lead) => lead.status === 'Won')
    .forEach((lead) => {
      const name = getOwnerName(lead);
      const current = performers.get(name) || { name, deals: 0, revenue: 0 };
      current.deals += 1;
      current.revenue += getLeadValue(lead);
      performers.set(name, current);
    });

  return [...performers.values()]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
};

export const calculateActivityHeatmap = (leads) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const heatmap = days.map((day) => ({
    day,
    hours: Array.from({ length: 24 }, (_, hour) => ({ hour, count: 0 })),
  }));

  normalizeLeads(leads).forEach((lead) => {
    const createdAt = toDate(lead.createdAt);
    if (!createdAt) return;
    heatmap[createdAt.getDay()].hours[createdAt.getHours()].count += 1;
  });

  return heatmap;
};

export const formatCurrency = (value = 0) => (
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number.isFinite(Number(value)) ? Number(value) : 0)
);

export const formatNumber = (value = 0) => (
  new Intl.NumberFormat('en-US').format(Number.isFinite(Number(value)) ? Number(value) : 0)
);

export const formatCompactNumber = (value = 0) => (
  new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(Number.isFinite(Number(value)) ? Number(value) : 0)
);
