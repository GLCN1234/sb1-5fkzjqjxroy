export interface Campaign {
  id: string;
  fullName: string;
  brandName: string;
  email: string;
  phone: string;
  aboutProduct: string;
  productLink: string;
  campaignGoals: CampaignGoal[];
  advertisementTypes: AdvertisementType[];
  uploadedFiles: File[];
  totalPrice: number;
  expectedResults: ExpectedResults;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CampaignGoal = 'leads' | 'sales' | 'engagement';
export type AdvertisementType = 'content' | 'platform';

export interface ExpectedResults {
  leads?: number;
  sales?: number;
  engagement?: number;
}

export interface PricingConfig {
  goals: {
    leads: number;
    sales: number;
    engagement: number;
  };
  adTypes: {
    content: number;
    platform: number;
  };
}