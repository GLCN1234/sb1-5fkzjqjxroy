import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Users, Star, Instagram, Camera, Heart, MapPin, Calendar, X } from 'lucide-react';

const Models: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const navigate = useNavigate();

  const models = [
    {
      id: 1,
      name: 'Isabella Martinez',
      specialty: 'Fashion & Editorial',
      location: 'New York, NY',
      experience: '5 years',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
      portfolio: [
        'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      stats: { campaigns: 45, followers: '125K', rating: 4.9 },
      bio: 'Professional fashion model with expertise in editorial and runway work. Featured in major fashion magazines and worked with top luxury brands.',
    },
    {
      id: 2,
      name: 'Marcus Thompson',
      specialty: 'Commercial & Fitness',
      location: 'Los Angeles, CA',
      experience: '4 years',
      image: 'https://images.pexels.com/photos/3184320/pexels-photo-3184320.jpeg?auto=compress&cs=tinysrgb&w=600',
      portfolio: [
        'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3184322/pexels-photo-3184322.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3184324/pexels-photo-3184324.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      stats: { campaigns: 38, followers: '89K', rating: 4.8 },
      bio: 'Versatile commercial model specializing in fitness, lifestyle, and brand campaigns. Known for authentic storytelling through visual media.',
    },
    {
      id: 3,
      name: 'Sofia Chen',
      specialty: 'Runway & High Fashion',
      location: 'Miami, FL',
      experience: '6 years',
      image: 'https://images.pexels.com/photos/3184341/pexels-photo-3184341.jpeg?auto=compress&cs=tinysrgb&w=600',
      portfolio: [
        'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3184342/pexels-photo-3184342.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      stats: { campaigns: 52, followers: '156K', rating: 5.0 },
      bio: 'International runway model with experience in New York, Paris, and Milan Fashion Weeks. Specializes in haute couture and luxury brand campaigns.',
    },
    {
      id: 4,
      name: 'James Rodriguez',
      specialty: 'Editorial & Portrait',
      location: 'Chicago, IL',
      experience: '3 years',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
      portfolio: [
        'https://images.pexels.com/photos/3184355/pexels-photo-3184355.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3184358/pexels-photo-3184358.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      stats: { campaigns: 29, followers: '67K', rating: 4.7 },
      bio: 'Creative editorial model with a passion for artistic photography and conceptual shoots. Collaborates with emerging and established photographers.',
    },
    {
      id: 5,
      name: 'Emma Williams',
      specialty: 'Beauty & Lifestyle',
      location: 'Atlanta, GA',
      experience: '4 years',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      portfolio: [
        'https://images.pexels.com/photos/3184464/pexels-photo-3184464.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3184467/pexels-photo-3184467.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      stats: { campaigns: 34, followers: '98K', rating: 4.9 },
      bio: 'Beauty and lifestyle model specializing in cosmetics, skincare, and wellness brands. Known for natural beauty and authentic brand representation.',
    },
    {
      id: 6,
      name: 'Alexander Davis',
      specialty: 'Fashion & Commercial',
      location: 'Seattle, WA',
      experience: '5 years',
      image: 'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=600',
      portfolio: [
        'https://images.pexels.com/photos/3184395/pexels-photo-3184395.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      stats: { campaigns: 41, followers: '112K', rating: 4.8 },
      bio: 'Versatile model working across fashion and commercial sectors. Experienced in both studio and outdoor shoots with a focus on menswear and lifestyle.',
    },
  ];

  const scrollToModelsGrid = () => {
    document.getElementById('models-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookModel = (modelName?: string) => {
    // Navigate to /join with model tab preselected
    navigate('/join', { state: { tab: 'brand', reason: modelName ? `Booking inquiry for ${modelName}` : undefined } });
  };

  const handleViewAllPortfolios = () => {
    setSelectedModel(null);
    scrollToModelsGrid();
  };

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
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              Our <span className="gradient-text">Models</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Meet the talented professionals who represent the ROYALE DOXA brand. Each model brings unique style, personality, and expertise to every project.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { value: '50+', label: 'Professional Models' },
              { value: '1M+', label: 'Combined Followers' },
              { value: '500+', label: 'Successful Shoots' },
              { value: '98%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <h3 className="text-4xl font-bold gradient-text mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Models Grid */}
      <section id="models-grid" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedModel(model)}
              >
                <div className="bg-white rounded-2xl shadow-luxury hover-lift overflow-hidden">
                  <div className="relative">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-medium">Click to view portfolio</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{model.name}</h3>
                    <p className="text-gray-600 mb-3">{model.specialty}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{model.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{model.experience}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{model.stats.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Instagram className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{model.stats.followers}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Details Modal */}
      <AnimatePresence>
        {selectedModel && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedModel(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-luxury"
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedModel(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 shadow-md"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8">
                    <img
                      src={selectedModel.image}
                      alt={selectedModel.name}
                      className="w-full h-96 object-cover rounded-2xl mb-6"
                    />

                    <h2 className="text-3xl font-bold mb-2 text-gray-900">{selectedModel.name}</h2>
                    <p className="text-xl text-gray-600 mb-4">{selectedModel.specialty}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-2xl font-bold gradient-text">{selectedModel.stats.campaigns}</p>
                        <p className="text-sm text-gray-600">Campaigns</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-2xl font-bold gradient-text">{selectedModel.stats.followers}</p>
                        <p className="text-sm text-gray-600">Followers</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-2xl font-bold gradient-text">{selectedModel.stats.rating}</p>
                        <p className="text-sm text-gray-600">Rating</p>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{selectedModel.bio}</p>
                  </div>

                  <div className="p-8 bg-gray-50">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-900">Portfolio</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedModel.portfolio.map((image: string, index: number) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedModel.name} portfolio ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                      ))}
                    </div>

                    <div className="mt-8 space-y-4">
                      {/* ✅ WORKING: Book button navigates to /join */}
                      <button
                        onClick={() => handleBookModel(selectedModel.name)}
                        className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        Book {selectedModel.name}
                      </button>
                      {/* ✅ WORKING: Scrolls back to model grid */}
                      <button
                        onClick={handleViewAllPortfolios}
                        className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-gray-400 transition-colors duration-300"
                      >
                        View All Portfolios
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Work with Our Models?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book our talented models for your next campaign, photoshoot, or event. Professional, reliable, and results-driven.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* ✅ WORKING: Navigates to /join (brand tab to book a model) */}
              <button
                onClick={() => handleBookModel()}
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Book a Model
              </button>
              {/* ✅ WORKING: Scrolls up to the models grid */}
              <button
                onClick={scrollToModelsGrid}
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                View All Portfolios
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Models;