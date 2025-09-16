import { useState, useEffect } from 'react';
import { Campaign } from '../types/campaign';

const CAMPAIGNS_STORAGE_KEY = 'royale_campaigns';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCampaigns(parsed.map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt),
        })));
      } catch (error) {
        console.error('Error parsing stored campaigns:', error);
      }
    }
  }, []);

  const saveCampaign = (campaign: Campaign) => {
    const updatedCampaigns = [...campaigns, campaign];
    setCampaigns(updatedCampaigns);
    localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(updatedCampaigns));
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    const updatedCampaigns = campaigns.map(campaign =>
      campaign.id === id
        ? { ...campaign, ...updates, updatedAt: new Date() }
        : campaign
    );
    setCampaigns(updatedCampaigns);
    localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(updatedCampaigns));
  };

  const deleteCampaign = (id: string) => {
    const updatedCampaigns = campaigns.filter(campaign => campaign.id !== id);
    setCampaigns(updatedCampaigns);
    localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(updatedCampaigns));
  };

  return {
    campaigns,
    saveCampaign,
    updateCampaign,
    deleteCampaign,
  };
};