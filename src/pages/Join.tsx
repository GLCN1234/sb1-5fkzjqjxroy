import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Users, Star, Crown, CheckCircle, Upload, Calendar, Award, Rocket, Target } from 'lucide-react';
import CampaignForm from '../components/CampaignForm';

const Join: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('model');
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'model',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      location: '',
    },
    modelInfo: {
      height: '',
      weight: '',
      measurements: '',
      experience: '',
      portfolio: '',
      interests: [],
    },
    brandInfo: {
      companyName: '',
      industry: '',
      budget: '',
      goals: '',
      timeline: '',
      previousCampaigns: '',
    },
  });

  const benefits = [
    {
      icon: Crown,
      title: 'Premium Representation',
      description: 'Get represented by industry professionals who understand your unique value and potential.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Users,
      title: 'Exclusive Network',
      description: 'Access to exclusive brands, photographers, and industry connections you won\'t find elsewhere.',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Star,
      title: 'Career Development',
      description: 'Personalized career coaching and development plans to accelerate your success.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Award,
      title: 'Professional Growth',
      description: 'Continuous training, workshops, and skill development opportunities.',
      color: 'from-green-400 to-blue-500',
    },
  ];

  const requirements = {
    model: [
      'Age 16-35 (with proper documentation)',
      'Professional attitude and reliability',
      'Basic portfolio (we can help develop this)',
      'Commitment to brand values and excellence',
      'Social media presence (preferred)',
      'Available for bookings and travel',
    ],
    brand: [
      'Established business or brand',
      'Clear marketing objectives',
      'Budget for influencer campaigns',
      'Commitment to long-term partnerships',
      'Brand guidelines and assets ready',
      'Open to creative collaboration',
    ],
  };

  const process = [
    {
      step: '01',
      title: 'Application',
      description: 'Submit your application with all required information and materials.',
    },
    {
      step: '02',
      title: 'Review',
      description: 'Our team reviews your application and conducts initial screening.',
    },
    {
      step: '03',
      title: 'Interview',
      description: 'Selected candidates participate in a virtual or in-person interview.',
    },
    {
      step: '04',
      title: 'Onboarding',
      description: 'Welcome to ROYALE.CO! Begin your journey with our comprehensive onboarding.',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
    
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    // Handle form submission
  };

  const interests = [
    'Fashion', 'Beauty', 'Lifestyle', 'Fitness', 'Travel', 'Food',
    'Technology', 'Automotive', 'Sports', 'Entertainment', 'Wellness', 'Art'
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              Join <span className="gradient-text">ROYALE.CO</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ready to elevate your career or brand? Join our exclusive community of models, influencers, and brand partners who are defining the future of digital marketing.
            </p>
          </motion.div>

          {/* Tab Selector */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center mb-16"
          >
            <div className="bg-white rounded-2xl p-2 shadow-luxury">
              <button
                onClick={() => setActiveTab('model')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'model'
                    ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Join as Model/Influencer
              </button>
              <button
                onClick={() => setActiveTab('brand')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'brand'
                    ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Join as Brand Partner
              </button>
              <button 
                onClick={() => setShowCampaignForm(true)}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Create Campaign
              </button>
              <Link 
                to="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Target className="w-5 h-5" />
                General Inquiry
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Campaign Form Modal */}
      {showCampaignForm && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="min-h-screen">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold gradient-text">ROYALE.CO</span>
                </Link>
                <div className="h-6 w-px bg-gray-300" />
                <h1 className="text-2xl font-bold text-gray-900">Create Campaign</h1>
              </div>
              <button
                onClick={() => setShowCampaignForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Close
              </button>
            </div>
            <CampaignForm />
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Why Choose <span className="gradient-text">ROYALE.CO</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a community that's committed to your success. We provide the tools, connections, and support you need to thrive.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-luxury hover-lift text-center border border-gray-100 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              What We're <span className="gradient-text">Looking For</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain high standards to ensure the best experience for all our community members.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-luxury"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <Users className="w-8 h-8 text-pink-500 mr-3" />
                Model/Influencer Requirements
              </h3>
              <ul className="space-y-4">
                {requirements.model.map((req, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-luxury"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <Crown className="w-8 h-8 text-purple-500 mr-3" />
                Brand Partner Requirements
              </h3>
              <ul className="space-y-4">
                {requirements.brand.map((req, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Application <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures we find the perfect fit for our community while respecting your time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 opacity-30 transform -translate-y-1/2" />
                )}
                
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90">
              Complete your application below and take the first step towards joining the ROYALE.CO family.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-luxury"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      name="personalInfo.firstName"
                      value={formData.personalInfo.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="personalInfo.lastName"
                      value={formData.personalInfo.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="personalInfo.email"
                      value={formData.personalInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="personalInfo.phone"
                      value={formData.personalInfo.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Age *</label>
                    <select
                      name="personalInfo.age"
                      value={formData.personalInfo.age}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select age range</option>
                      <option value="16-20">16-20</option>
                      <option value="21-25">21-25</option>
                      <option value="26-30">26-30</option>
                      <option value="31-35">31-35</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Location *</label>
                    <input
                      type="text"
                      name="personalInfo.location"
                      value={formData.personalInfo.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>

              {/* Conditional sections based on type */}
              {activeTab === 'model' ? (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-900">Model Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Height</label>
                      <input
                        type="text"
                        name="modelInfo.height"
                        value={formData.modelInfo.height}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                        placeholder="5'8&quot;"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Weight</label>
                      <input
                        type="text"
                        name="modelInfo.weight"
                        value={formData.modelInfo.weight}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                        placeholder="125 lbs"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Measurements</label>
                      <input
                        type="text"
                        name="modelInfo.measurements"
                        value={formData.modelInfo.measurements}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                        placeholder="34-24-36"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-2">Experience Level *</label>
                    <select
                      name="modelInfo.experience"
                      value={formData.modelInfo.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">Beginner (0-1 years)</option>
                      <option value="intermediate">Intermediate (1-3 years)</option>
                      <option value="experienced">Experienced (3-5 years)</option>
                      <option value="professional">Professional (5+ years)</option>
                    </select>
                  </div>

                  <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-2">Portfolio/Social Media Links</label>
                    <textarea
                      name="modelInfo.portfolio"
                      value={formData.modelInfo.portfolio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Share links to your Instagram, portfolio website, or other relevant profiles..."
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-4">Areas of Interest (select all that apply)</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {interests.map((interest) => (
                        <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            value={interest}
                            className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                          />
                          <span className="text-gray-700">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-900">Brand Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Company Name *</label>
                      <input
                        type="text"
                        name="brandInfo.companyName"
                        value={formData.brandInfo.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Industry *</label>
                      <select
                        name="brandInfo.industry"
                        value={formData.brandInfo.industry}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select industry</option>
                        <option value="fashion">Fashion & Apparel</option>
                        <option value="beauty">Beauty & Cosmetics</option>
                        <option value="fitness">Health & Fitness</option>
                        <option value="technology">Technology</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="food">Food & Beverage</option>
                        <option value="travel">Travel & Tourism</option>
                        <option value="automotive">Automotive</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Campaign Budget Range *</label>
                      <select
                        name="brandInfo.budget"
                        value={formData.brandInfo.budget}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select budget range</option>
                        <option value="5k-25k">$5,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k+">$100,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Timeline *</label>
                      <select
                        name="brandInfo.timeline"
                        value={formData.brandInfo.timeline}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP (1-2 weeks)</option>
                        <option value="month">Within a month</option>
                        <option value="quarter">This quarter</option>
                        <option value="flexible">Flexible timing</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-2">Campaign Goals *</label>
                    <textarea
                      name="brandInfo.goals"
                      value={formData.brandInfo.goals}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Describe your campaign objectives, target audience, and what you hope to achieve..."
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-2">Previous Campaign Experience</label>
                    <textarea
                      name="brandInfo.previousCampaigns"
                      value={formData.brandInfo.previousCampaigns}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about any previous influencer marketing campaigns or partnerships..."
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Submit Application
                <Upload className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Join;