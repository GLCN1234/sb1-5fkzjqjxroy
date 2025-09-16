import { Campaign } from '../types/campaign';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  callback: (response: any) => void;
  onClose: () => void;
}

export const initializePayment = (campaign: Campaign, onSuccess: (reference: string) => void, onClose: () => void) => {
  const handler = window.PaystackPop.setup({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    email: campaign.email,
    amount: campaign.totalPrice * 100, // Convert to kobo
    currency: 'NGN',
    ref: campaign.id,
    metadata: {
      custom_fields: [
        {
          display_name: "Campaign ID",
          variable_name: "campaign_id",
          value: campaign.id
        },
        {
          display_name: "Brand Name",
          variable_name: "brand_name",
          value: campaign.brandName
        }
      ]
    },
    callback: function(response: any) {
      onSuccess(response.reference);
    },
    onClose: onClose
  });

  handler.openIframe();
};

export const verifyPayment = async (reference: string): Promise<boolean> => {
  try {
    // In a real application, this should be done on the backend
    // For demo purposes, we'll simulate verification
    console.log('Verifying payment with reference:', reference);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo, assume payment is always successful
    return true;
  } catch (error) {
    console.error('Payment verification failed:', error);
    return false;
  }
};