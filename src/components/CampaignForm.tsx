import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Calculator, CreditCard, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Campaign, CampaignGoal, AdvertisementType } from '../types/campaign';
import { calculatePrice, calculateExpectedResults, formatCurrency } from '../utils/pricing';
import { initializePayment, verifyPayment } from '../services/paystack';
import { useCampaigns } from '../hooks/useCampaigns';

const CampaignForm: React.FC = () => {
  const { saveCampaign, updateCampaign } = useCampaigns();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    brandName: '',
    email: '',
    phone: '',
    aboutProduct: '',
    productLink: '',
    campaignGoals: [] as CampaignGoal[],
    advertisementTypes: [] as AdvertisementType[],
    uploadedFiles: [] as File[],
  });

  const [pricing, setPricing] = useState({
    totalPrice: 0,
    expectedResults: {},
  });

  useEffect(() => {
    const totalPrice = calculatePrice(formData.campaignGoals, formData.advertisementTypes);
    const expectedResults = calculateExpectedResults(formData.campaignGoals, formData.advertisementTypes);
    setPricing({ totalPrice, expectedResults });
  }, [formData.campaignGoals, formData.advertisementTypes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoalChange = (goal: CampaignGoal) => {
    const updatedGoals = formData.campaignGoals.includes(goal)
      ? formData.campaignGoals.filter(g => g !== goal)
      : [...formData.campaignGoals, goal];
    
    setFormData({
      ...formData,
      campaignGoals: updatedGoals,
    });
  };

  const handleAdTypeChange = (adType: AdvertisementType) => {
    const updatedTypes = formData.advertisementTypes.includes(adType)
      ? formData.advertisementTypes.filter(t => t !== adType)
      : [...formData.advertisementTypes, adType];
    
    setFormData({
      ...formData,
      advertisementTypes: updatedTypes,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData({
        ...formData,
        uploadedFiles: [...formData.uploadedFiles, ...files],
      });
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = formData.uploadedFiles.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      uploadedFiles: updatedFiles,
    });
  };

  const handlePayment = () => {
    if (!formData.fullName || !formData.brandName || !formData.email || formData.campaignGoals.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    const campaign: Campaign = {
      id: uuidv4(),
      ...formData,
      totalPrice: pricing.totalPrice,
      expectedResults: pricing.expectedResults,
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save campaign first
    saveCampaign(campaign);

    // Initialize Paystack payment
    initializePayment(
      campaign,
      async (reference: string) => {
        // Verify payment
        const isVerified = await verifyPayment(reference);
        
        if (isVerified) {
          updateCampaign(campaign.id, {
            paymentStatus: 'completed',
            paymentReference: reference,
          });
          
          setCurrentStep(4); // Success step
        } else {
          updateCampaign(campaign.id, {
            paymentStatus: 'failed',
          });
          alert('Payment verification failed. Please contact support.');
        }
        
        setIsProcessing(false);
      },
      () => {
        setIsProcessing(false);
        alert('Payment was cancelled');
      }
    );
  };

  const goalOptions = [
    { id: 'leads' as CampaignGoal, label: 'Generate Leads', icon: Target, price: 60000, description: 'Focus on capturing potential customer information' },
    { id: 'sales' as CampaignGoal, label: 'Drive Sales', icon: TrendingUp, price: 80000, description: 'Convert visitors into paying customers' },
    { id: 'engagement' as CampaignGoal, label: 'Boost Engagement', icon: Users, price: 40000, description: 'Increase brand awareness and interaction' },
  ];

  const adTypeOptions = [
    { id: 'content' as AdvertisementType, label: 'Content Advertisement', price: 30000, description: 'Influencer content creation and promotion' },
    { id: 'platform' as AdvertisementType, label: 'Platform Ads', price: 60000, description: 'Google Ads, Instagram Ads, TikTok Ads management' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= step
                  ? 'bg-gradient-to-r from-yellow-400 to-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step ? 'bg-gradient-to-r from-yellow-400 to-blue-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentStep === 1 && 'Campaign Details'}
            {currentStep === 2 && 'Goals & Advertisement'}
            {currentStep === 3 && 'Review & Payment'}
            {currentStep === 4 && 'Success!'}
          </h3>
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-8 shadow-luxury"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Campaign Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Brand Name *</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Your brand name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="+234 xxx xxx xxxx"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">About Product *</label>
            <textarea
              name="aboutProduct"
              value={formData.aboutProduct}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Describe your product or service..."
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">Product/Website Link</label>
            <input
              type="url"
              name="productLink"
              value={formData.productLink}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">Upload Digital Materials</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Upload images, videos, or documents</p>
              <input
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-blue-500 text-white rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                Choose Files
              </label>
            </div>
            
            {formData.uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              disabled={!formData.fullName || !formData.brandName || !formData.email || !formData.aboutProduct}
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Goals & Advertisement Types */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {/* Campaign Goals */}
          <div className="bg-white rounded-2xl p-8 shadow-luxury">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Campaign Goals</h2>
            <p className="text-gray-600 mb-6">Select one or more goals for your campaign (you can choose multiple)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {goalOptions.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => handleGoalChange(goal.id)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.campaignGoals.includes(goal.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <goal.icon className={`w-12 h-12 mb-4 ${
                    formData.campaignGoals.includes(goal.id) ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <h3 className="text-xl font-semibold mb-2">{goal.label}</h3>
                  <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                  <p className="text-2xl font-bold text-blue-500">{formatCurrency(goal.price)}/month</p>
                </div>
              ))}
            </div>
          </div>

          {/* Advertisement Types */}
          <div className="bg-white rounded-2xl p-8 shadow-luxury">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Advertisement Types</h2>
            <p className="text-gray-600 mb-6">Choose how you want to advertise your product</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adTypeOptions.map((adType) => (
                <div
                  key={adType.id}
                  onClick={() => handleAdTypeChange(adType.id)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.advertisementTypes.includes(adType.id)
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <Zap className={`w-12 h-12 mb-4 ${
                    formData.advertisementTypes.includes(adType.id) ? 'text-yellow-500' : 'text-gray-400'
                  }`} />
                  <h3 className="text-xl font-semibold mb-2">{adType.label}</h3>
                  <p className="text-gray-600 text-sm mb-3">{adType.description}</p>
                  <p className="text-2xl font-bold text-yellow-500">{formatCurrency(adType.price)}/month</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all duration-300"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              disabled={formData.campaignGoals.length === 0}
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Review & Pay
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Review & Payment */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {/* Pricing Summary */}
          <div className="bg-gradient-to-r from-yellow-400 to-blue-500 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Campaign Summary</h2>
              <Calculator className="w-12 h-12" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Selected Services</h3>
                <div className="space-y-2">
                  {formData.campaignGoals.map(goal => (
                    <div key={goal} className="flex justify-between">
                      <span className="capitalize">{goal} Campaign</span>
                      <span>{formatCurrency(goalOptions.find(g => g.id === goal)?.price || 0)}</span>
                    </div>
                  ))}
                  {formData.advertisementTypes.map(adType => (
                    <div key={adType} className="flex justify-between">
                      <span>{adType === 'content' ? 'Content Advertisement' : 'Platform Ads'}</span>
                      <span>{formatCurrency(adTypeOptions.find(a => a.id === adType)?.price || 0)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/30 mt-4 pt-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(pricing.totalPrice)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Expected Results</h3>
                <div className="space-y-3">
                  {pricing.expectedResults.leads && (
                    <div className="flex items-center space-x-3">
                      <Target className="w-6 h-6" />
                      <span>{pricing.expectedResults.leads.toLocaleString()} Leads/month</span>
                    </div>
                  )}
                  {pricing.expectedResults.sales && (
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-6 h-6" />
                      <span>{pricing.expectedResults.sales.toLocaleString()} Sales/month</span>
                    </div>
                  )}
                  {pricing.expectedResults.engagement && (
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6" />
                      <span>{pricing.expectedResults.engagement.toLocaleString()} Engagements/month</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Details Review */}
          <div className="bg-white rounded-2xl p-8 shadow-luxury">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Campaign Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p><strong>Full Name:</strong> {formData.fullName}</p>
                <p><strong>Brand Name:</strong> {formData.brandName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
              </div>
              <div>
                <p><strong>Product Link:</strong> {formData.productLink}</p>
                <p><strong>Files Uploaded:</strong> {formData.uploadedFiles.length} files</p>
              </div>
            </div>
            <div className="mt-4">
              <p><strong>About Product:</strong></p>
              <p className="text-gray-600 mt-1">{formData.aboutProduct}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all duration-300"
            >
              Previous
            </button>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
            >
              <CreditCard className="w-5 h-5" />
              <span>{isProcessing ? 'Processing...' : `Pay ${formatCurrency(pricing.totalPrice)}`}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 4: Success */}
      {currentStep === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-luxury text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Payment Successful!</h2>
          <p className="text-xl text-gray-600 mb-8">
            Your campaign has been created and payment processed successfully. Our team will contact you within 24 hours to begin your campaign.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Create Another Campaign
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CampaignForm;