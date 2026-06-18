export const calculateStatusDistribution = (leads) => {
  const distribution = {
    New: 0,
    Contacted: 0,
    'Meeting Scheduled': 0,
    'Proposal Sent': 0,
    Won: 0,
    Lost: 0,
  };

  leads.forEach(lead => {
    if (distribution.hasOwnProperty(lead.status)) {
      distribution[lead.status]++;
    }
  });

  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .filter(item => item.value > 0);
};

export const calculateMonthlyLeads = (leads, days = 30) => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const monthlyData = {};
  leads.forEach(lead => {
    const leadDate = new Date(lead.createdAt);
    if (leadDate >= pastDate) {
      const monthKey = leadDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
    }
  });

  const sortedDates = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    sortedDates.push({ date: key, leads: monthlyData[key] || 0 });
  }

  return sortedDates;
};

export const calculateConversionByMonth = (leads, days = 30) => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const monthlyStats = {};
  leads.forEach(lead => {
    const leadDate = new Date(lead.createdAt);
    if (leadDate >= pastDate) {
      const monthKey = leadDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = { total: 0, won: 0 };
      }
      monthlyStats[monthKey].total++;
      if (lead.status === 'Won') {
        monthlyStats[monthKey].won++;
      }
    }
  });

  const sortedDates = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const stats = monthlyStats[key];
    const rate = stats ? Math.round((stats.won / stats.total) * 100) : 0;
    sortedDates.push({ date: key, rate });
  }

  return sortedDates;
};

export const calculateRevenueByMonth = (leads, days = 30) => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const monthlyRevenue = {};
  leads.forEach(lead => {
    if (lead.status === 'Won') {
      const leadDate = new Date(lead.createdAt);
      if (leadDate >= pastDate) {
        const monthKey = leadDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const revenue = Math.floor(Math.random() * 50000) + 10000;
        monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + revenue;
      }
    }
  });

  const sortedDates = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    sortedDates.push({ date: key, revenue: monthlyRevenue[key] || 0 });
  }

  return sortedDates;
};

export const calculateLeadSources = (leads) => {
  const sources = {
    Website: 0,
    Referral: 0,
    LinkedIn: 0,
    'Cold Call': 0,
    'Email Campaign': 0,
    Other: 0,
  };

  leads.forEach(lead => {
    if (sources.hasOwnProperty(lead.source)) {
      sources[lead.source]++;
    }
  });

  return Object.entries(sources)
    .map(([name, value]) => ({ name, value }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);
};

export const calculateFunnelData = (leads) => {
  const funnelStages = [
    { name: 'New', value: 0 },
    { name: 'Contacted', value: 0 },
    { name: 'Meeting Scheduled', value: 0 },
    { name: 'Proposal Sent', value: 0 },
    { name: 'Won', value: 0 },
  ];

  leads.forEach(lead => {
    const stage = funnelStages.find(s => s.name === lead.status);
    if (stage) stage.value++;
  });

  return funnelStages.filter(item => item.value > 0);
};

export const calculateTotalLeads = (leads) => leads.length;

export const calculateWonLeads = (leads) => leads.filter(lead => lead.status === 'Won').length;

export const calculateLostLeads = (leads) => leads.filter(lead => lead.status === 'Lost').length;

export const calculateConversionRate = (leads) => {
  if (leads.length === 0) return 0;
  const won = calculateWonLeads(leads);
  return Math.round((won / leads.length) * 100);
};

export const calculateLostRate = (leads) => {
  if (leads.length === 0) return 0;
  const lost = calculateLostLeads(leads);
  return Math.round((lost / leads.length) * 100);
};

export const calculateWonRevenue = (leads) => {
  const wonLeads = leads.filter(lead => lead.status === 'Won');
  const totalRevenue = wonLeads.reduce((sum) => {
    const revenue = Math.floor(Math.random() * 50000) + 10000;
    return sum + revenue;
  }, 0);
  return totalRevenue;
};

export const calculatePipelineValue = (leads) => {
  const pipelineLeads = leads.filter(
    lead => !['Won', 'Lost'].includes(lead.status)
  );
  const value = pipelineLeads.reduce((sum) => {
    const val = Math.floor(Math.random() * 75000) + 15000;
    return sum + val;
  }, 0);
  return value;
};

export const calculateAverageSalesCycle = (leads) => {
  const wonLeads = leads.filter(lead => lead.status === 'Won');
  if (wonLeads.length === 0) return 0;

  const totalDays = wonLeads.reduce((sum, lead) => {
    const createdDate = new Date(lead.createdAt);
    const daysDiff = Math.floor((new Date() - createdDate) / (1000 * 60 * 60 * 24));
    return sum + daysDiff;
  }, 0);

  return Math.round(totalDays / wonLeads.length);
};

export const calculateSalesVelocity = (leads, days = 30) => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const recentWon = leads.filter(lead => {
    const leadDate = new Date(lead.createdAt);
    return lead.status === 'Won' && leadDate >= pastDate;
  }).length;

  return Math.round(recentWon / (days / 7));
};

export const calculateForecastRevenue = (leads, days = 90) => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const recentLeads = leads.filter(lead => {
    const leadDate = new Date(lead.createdAt);
    return leadDate >= pastDate;
  });

  const avgRevenue = calculateWonRevenue(leads) / Math.max(calculateWonLeads(leads), 1);
  const forecast = Math.round(recentLeads.length * (calculateConversionRate(leads) / 100) * avgRevenue);

  return forecast;
};

export const calculateTopPerformers = (leads) => {
  const performers = {};

  leads.filter(lead => lead.status === 'Won').forEach(lead => {
    const name = lead.name.split(' ')[0];
    if (!performers[name]) {
      performers[name] = { name, deals: 0, revenue: 0 };
    }
    performers[name].deals++;
    performers[name].revenue += Math.floor(Math.random() * 50000) + 10000;
  });

  return Object.values(performers)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
};

export const calculateActivityHeatmap = (leads) => {
  const heatmapData = {};
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  days.forEach(day => {
    heatmapData[day] = Array(24).fill(0);
  });

  leads.forEach(lead => {
    const date = new Date(lead.createdAt);
    const dayName = days[date.getDay()];
    const hour = date.getHours();
    heatmapData[dayName][hour]++;
  });

  return Object.entries(heatmapData).map(([day, hours]) => ({
    day,
    hours: hours.map((count, hour) => ({ hour, count })),
  }));
};

export const filterLeadsByDateRange = (leads, range) => {
  const now = new Date();
  let pastDate;

  switch (range) {
    case '7':
      pastDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30':
      pastDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90':
      pastDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case '365':
      pastDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      return leads;
  }

  return leads.filter(lead => new Date(lead.createdAt) >= pastDate);
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatCompactNumber = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toString();
};
