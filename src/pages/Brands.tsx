import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building, Star, TrendingUp, Users, Award, Globe, Target, Heart } from 'lucide-react';

const Brands: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Brand logos/names (in a real app, these would be actual brand logos)
  const brands = [
    { name: 'LUXE Fashion', category: 'Fashion', logo: '🏷️' },
    { name: 'URBAN Style', category: 'Streetwear', logo: '👕' },
    { name: 'GLOW Beauty', category: 'Beauty', logo: '💄' },
    { name: 'FIT Life', category: 'Fitness', logo: '💪' },
    { name: 'TECH Gear', category: 'Technology', logo: '📱' },
    { name: 'PURE Wellness', category: 'Health', logo: '🌿' },
    { name: 'ELITE Watches', category: 'Luxury', logo: '⌚' },
    { name: 'FRESH Foods', category: 'F&B', logo: '🍃' },
    { name: 'DREAM Travel', category: 'Travel', logo: '✈️' },
    { name: 'HOME Decor', category: 'Lifestyle', logo: '🏠' },
    { name: 'AUTO Premier', category: 'Automotive', logo: '🚗' },
    { name: 'CRAFT Studio', category: 'Creative', logo: '🎨' },
  ];

  const caseStudies = [
    {
      brand: 'LUXE Fashion',
      campaign: 'Summer Collection Launch',
      results: {
        reach: '2.5M',
        engagement: '8.2%',
        sales: '+45%',
        roi: '320%'
      },
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'A comprehensive influencer marketing campaign featuring 15 top fashion models across multiple social media platforms.',
      color: 'from-pink-400 to-rose-500',
    },
    {
      brand: 'FIT Life',
      campaign: 'New Year Transformation',
      results: {
        reach: '1.8M',
        engagement: '12.1%',
        sales: '+67%',
        roi: '410%'
      },
      image: 'https://images.pexels.com/photos/3184320/pexels-photo-3184320.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Fitness influencer campaign promoting healthy lifestyle changes with authentic transformation stories.',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      brand: 'GLOW Beauty',
      campaign: 'Natural Beauty Revolution',
      results: {
        reach: '3.1M',
        engagement: '15.7%',
        sales: '+89%',
        roi: '525%'
      },
      image: 'https://images.pexels.com/photos/3184341/pexels-photo-3184341.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Beauty campaign showcasing natural skincare products through authentic user-generated content.',
      color: 'from-purple-400 to-pink-500',
    },
  ];

  const achievements = [
    {
      icon: TrendingUp,
      metric: '$50M+',
      label: 'Revenue Generated',
      description: 'Total revenue generated for our brand partners through influencer campaigns'
    },
    {
      icon: Users,
      metric: '250+',
      label: 'Brand Partners',
      description: 'Successful collaborations with brands across various industries'
    },
    {
      icon: Globe,
      metric: '45+',
      label: 'Countries Reached',
      description: 'Global reach spanning across multiple continents and markets'
    },
    {
      icon: Award,
      metric: '98%',
      label: 'Success Rate',
      description: 'Campaign success rate with measurable ROI and engagement metrics'
    },
  ];

  const industries = [
    { name: 'Fashion & Apparel', count: 45, icon: '👗', color: 'from-pink-400 to-rose-500' },
    { name: 'Beauty & Cosmetics', count: 38, icon: '💄', color: 'from-purple-400 to-pink-500' },
    { name: 'Health & Fitness', count: 32, icon: '💪', color: 'from-blue-400 to-cyan-500' },
    { name: 'Technology', count: 28, icon: '📱', color: 'from-gray-400 to-gray-600' },
    { name: 'Lifestyle', count: 41, icon: '🌟', color: 'from-yellow-400 to-orange-500' },
    { name: 'Food & Beverage', count: 25, icon: '🍃', color: 'from-green-400 to-emerald-500' },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury">
              <Building className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              Brands We've <span className="gradient-text">Worked With</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Trusted by leading brands worldwide. We've helped companies of all sizes achieve remarkable growth through strategic influencer marketing and model partnerships.
            </p>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">{achievement.metric}</h3>
                <p className="font-semibold text-gray-900 mb-1">{achievement.label}</p>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brand Grid */}
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
              Our <span className="gradient-text">Partners</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From emerging startups to Fortune 500 companies, we've partnered with brands across diverse industries to create impactful campaigns.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-luxury hover-lift text-center border border-gray-100">
                  <div className="text-4xl mb-3">{brand.logo}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{brand.name}</h3>
                  <p className="text-sm text-gray-600">{brand.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
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
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real campaigns. See how we've helped brands achieve exceptional growth through strategic influencer partnerships.
            </p>
          </motion.div>

          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <img
                    src={study.image}
                    alt={study.campaign}
                    className="w-full h-96 object-cover rounded-2xl shadow-luxury"
                  />
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${study.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-2 text-gray-900">{study.brand}</h3>
                  <h4 className="text-xl text-gray-600 mb-4">{study.campaign}</h4>
                  <p className="text-gray-700 mb-8 leading-relaxed">{study.description}</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <h5 className="text-2xl font-bold gradient-text">{study.results.reach}</h5>
                      <p className="text-gray-600">Total Reach</p>
                    </div>
                    <div className="text-center">
                      <h5 className="text-2xl font-bold gradient-text">{study.results.engagement}</h5>
                      <p className="text-gray-600">Engagement Rate</p>
                    </div>
                    <div className="text-center">
                      <h5 className="text-2xl font-bold gradient-text">{study.results.sales}</h5>
                      <p className="text-gray-600">Sales Increase</p>
                    </div>
                    <div className="text-center">
                      <h5 className="text-2xl font-bold gradient-text">{study.results.roi}</h5>
                      <p className="text-gray-600">ROI</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
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
              Industries We <span className="gradient-text">Serve</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our expertise spans across multiple industries, delivering tailored solutions for each sector's unique needs and challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-luxury hover-lift text-center border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{industry.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{industry.name}</h3>
                  <p className="text-3xl font-bold gradient-text mb-2">{industry.count}</p>
                  <p className="text-gray-600">Brand Partners</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create your next breakthrough campaign. Partner with ROYALE.CO and experience the difference that strategic influencer marketing can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Start Your Campaign
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Brands;