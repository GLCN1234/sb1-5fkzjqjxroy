import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Sparkles, Users, Crown, Star, TrendingUp, Award } from 'lucide-react';

const Home: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      icon: Sparkles,
      title: 'Product Influencing',
      description: 'Connect with top influencers to showcase your products authentically and reach your target audience.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: TrendingUp,
      title: 'Brand Marketing',
      description: 'Comprehensive marketing strategies that make brands stand out in the competitive marketplace.',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Model Management',
      description: 'Professional model representation and career development for aspiring and established talents.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Crown,
      title: 'Modeling Academy',
      description: 'Learn from industry experts and transform your passion into a successful modeling career.',
      color: 'from-green-400 to-blue-500',
    },
  ];

  const stats = [
    { number: '500+', label: 'Models Managed' },
    { number: '1000+', label: 'Successful Campaigns' },
    { number: '250+', label: 'Brand Partners' },
    { number: '95%', label: 'Client Satisfaction' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-blue-50" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1600")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full flex items-center justify-center shadow-luxury">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 text-shadow">
              Welcome to
              <br />
              <span className="gradient-text">ROYALE DOXA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Where influence meets elegance. We craft the next generation of models, influencers, and brand ambassadors who define industry standards.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/academy"
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Join Academy
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Book Us
              <Sparkles className="w-5 h-5" />
            </Link>
            <Link
              to="/models"
              className="px-8 py-4 glass-morphism text-gray-800 rounded-full font-semibold text-lg hover:bg-white/25 transition-all duration-300"
            >
              See Our Work
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl opacity-20"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-16 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20"
        />
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={servicesRef}
            initial={{ y: 30, opacity: 0 }}
            animate={servicesInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for brands, models, and influencers looking to make their mark in the industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={servicesInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-luxury hover-lift h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={servicesInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-300"
            >
              Explore All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={statsRef}
            initial={{ y: 30, opacity: 0 }}
            animate={statsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Proven <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our numbers speak for themselves. Join thousands of satisfied clients and successful models.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={statsInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-blue-500">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join the Elite?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're a brand looking to make an impact or an aspiring model ready to shine, we're here to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/join"
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;