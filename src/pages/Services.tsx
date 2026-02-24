import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Users, Crown, Camera, Megaphone, Star, Globe, X, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type InquiryType = 'start_project' | 'schedule_consultation' | null;

const Services: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeInquiry, setActiveInquiry] = useState<InquiryType>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [ctaForm, setCtaForm] = useState({ name: '', email: '', phone: '', message: '' });

  const services = [
    {
      icon: Sparkles,
      title: 'Product Influencing',
      description: 'Connect your brand with authentic influencers who genuinely love your products.',
      features: ['Micro & Macro Influencer Network', 'Content Creation', 'Campaign Management', 'Performance Analytics'],
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Megaphone,
      title: 'Brand Marketing',
      description: 'Comprehensive marketing strategies that make brands ROAR in the marketplace.',
      features: ['Brand Strategy', 'Digital Campaigns', 'Social Media Management', 'PR & Media Relations'],
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Camera,
      title: 'Model Marketing',
      description: 'Professional marketing services designed specifically for models and talents.',
      features: ['Portfolio Development', 'Social Media Growth', 'Brand Partnerships', 'Career Strategy'],
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Users,
      title: 'Model Management',
      description: 'Full-service representation for models at every stage of their career.',
      features: ['Contract Negotiation', 'Booking Management', 'Career Development', '24/7 Support'],
      color: 'from-green-400 to-blue-500',
    },
    {
      icon: Crown,
      title: 'Modeling Academy',
      description: 'Professional training programs to launch and advance modeling careers.',
      features: ['Industry Expert Training', 'Portfolio Shoots', 'Runway Coaching', 'Business Skills'],
      color: 'from-pink-400 to-red-500',
    },
    {
      icon: Globe,
      title: 'Global Campaigns',
      description: 'International marketing campaigns that reach audiences worldwide.',
      features: ['Multi-Market Strategy', 'Cultural Adaptation', 'Global Influencer Network', 'Cross-Platform Execution'],
      color: 'from-indigo-400 to-purple-500',
    },
  ];

  const processSteps = [
    { step: '01', title: 'Discovery', description: 'We understand your brand, goals, and target audience through comprehensive consultation.' },
    { step: '02', title: 'Strategy', description: 'Our experts develop a customized strategy tailored to your unique needs and objectives.' },
    { step: '03', title: 'Execution', description: 'We implement your campaign with precision, managing every detail for optimal results.' },
    { step: '04', title: 'Optimization', description: 'Continuous monitoring and optimization ensure maximum performance and ROI.' },
  ];

  const handleCtaInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCtaForm({ ...ctaForm, [e.target.name]: e.target.value });
  };

  const handleCtaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInquiry) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const { error } = await supabase.from('service_inquiries').insert([{
        inquiry_type: activeInquiry,
        name: ctaForm.name,
        email: ctaForm.email,
        phone: ctaForm.phone,
        message: ctaForm.message,
      }]);
      if (error) throw error;
      setSubmitSuccess(true);
      setCtaForm({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setActiveInquiry(null);
    setSubmitSuccess(false);
    setSubmitError(null);
    setCtaForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div ref={heroRef} initial={{ y: 30, opacity: 0 }} animate={heroInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive solutions for brands, models, and influencers. We deliver results that exceed expectations and drive real business growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div key={index} initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-luxury hover-lift border border-gray-100 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fi) => (
                      <li key={fi} className="flex items-center space-x-2">
                        <Star className={`w-4 h-4 bg-gradient-to-r ${service.color} text-white rounded`} />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our <span className="gradient-text">Process</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We follow a proven methodology that ensures exceptional results for every project, from concept to completion.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div key={index} initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: index * 0.2 }} viewport={{ once: true }} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-luxury">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 opacity-30 transform -translate-y-1/2" />}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Fixed CTA Section — buttons now open modals */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Elevate Your Brand?</h2>
            <p className="text-xl mb-8 opacity-90">Let's create something extraordinary together. Our team of experts is ready to bring your vision to life.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveInquiry('start_project')}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Start Your Project
              </button>
              <button
                onClick={() => setActiveInquiry('schedule_consultation')}
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ✅ Modal for CTA forms */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <button onClick={closeModal} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 transition-colors">
              <X className="w-6 h-6" />
            </button>

            {submitSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Received!</h3>
                <p className="text-gray-600 mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={closeModal} className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-semibold">
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {activeInquiry === 'start_project' ? '🚀 Start Your Project' : '📅 Schedule a Consultation'}
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                  {activeInquiry === 'start_project'
                    ? "Tell us about your project and we'll connect you with the right team."
                    : "Book a free 30-minute consultation with one of our experts."}
                </p>

                <form onSubmit={handleCtaSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Full Name *</label>
                    <input type="text" name="name" value={ctaForm.name} onChange={handleCtaInputChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Email Address *</label>
                    <input type="email" name="email" value={ctaForm.email} onChange={handleCtaInputChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                    <input type="tel" name="phone" value={ctaForm.phone} onChange={handleCtaInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      placeholder="+234 000 000 0000" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      {activeInquiry === 'start_project' ? 'Project Details *' : 'What would you like to discuss? *'}
                    </label>
                    <textarea name="message" value={ctaForm.message} onChange={handleCtaInputChange} required rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
                      placeholder={activeInquiry === 'start_project' ? 'Tell us about your brand, goals, and budget...' : 'Briefly describe what you\'d like to explore...'} />
                  </div>

                  {submitError && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{submitError}</div>}

                  <button type="submit" disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none">
                    {submitting ? 'Sending...' : activeInquiry === 'start_project' ? 'Submit Project Brief' : 'Book My Consultation'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Services;