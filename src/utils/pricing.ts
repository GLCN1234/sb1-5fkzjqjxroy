import { CampaignGoal, AdvertisementType, ExpectedResults, PricingConfig } from '../types/campaign';

export const PRICING_CONFIG: PricingConfig = {
  goals: {
    leads: 60000,      // ₦60,000/month
    sales: 80000,      // ₦80,000/month
    engagement: 40000, // ₦40,000/month
  },
  adTypes: {
    content: 30000,    // ₦30,000/month
    platform: 60000,   // ₦15,000/week * 4 weeks
  },
};

export const calculatePrice = (
  goals: CampaignGoal[],
  adTypes: AdvertisementType[]
): number => {
  let total = 0;

  // Add goal prices
  goals.forEach(goal => {
    total += PRICING_CONFIG.goals[goal];
  });

  // Add advertisement type prices
  adTypes.forEach(adType => {
    total += PRICING_CONFIG.adTypes[adType];
  });

  return total;
};

export const calculateExpectedResults = (
  goals: CampaignGoal[],
  adTypes: AdvertisementType[]
): ExpectedResults => {
  const results: ExpectedResults = {};
  
  const hasContent = adTypes.includes('content');
  const hasPlatform = adTypes.includes('platform');
  
  // Base multipliers
  const contentMultiplier = hasContent ? 1.5 : 1;
  const platformMultiplier = hasPlatform ? 2 : 1;
  const totalMultiplier = contentMultiplier * platformMultiplier;

  goals.forEach(goal => {
    switch (goal) {
      case 'leads':
        results.leads = Math.round(500 * totalMultiplier);
        break;
      case 'sales':
        results.sales = Math.round(200 * totalMultiplier);
        break;
      case 'engagement':
        results.engagement = Math.round(10000 * totalMultiplier);
        break;
    }
  });

  return results;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};