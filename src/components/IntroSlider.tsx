import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, Crown, Users, GraduationCap, ArrowRight } from 'lucide-react';

interface IntroSliderProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    title: "Welcome to ROYALE.CO",
    subtitle: "Where Influence Meets Elegance",
    icon: Crown,
    gradient: "from-yellow-400 to-yellow-600",
    description: "Discover a world where luxury meets innovation in modeling and brand influence."
  },
  {
    id: 2,
    title: "Marketing That Makes",
    subtitle: "Brands ROAR",
    icon: Sparkles,
    gradient: "from-blue-400 to-cyan-500",
    description: "Transform your brand presence with our cutting-edge marketing strategies."
  },
  {
    id: 3,
    title: "Crafting Models.",
    subtitle: "Building Icons.",
    icon: Users,
    gradient: "from-purple-400 to-pink-500",
    description: "We don't just manage models—we create legends that define the industry."
  },
  {
    id: 4,
    title: "Join Our Modelling Academy",
    subtitle: "Transform Your Future",
    icon: GraduationCap,
    gradient: "from-green-400 to-blue-500",
    description: "Learn from industry experts and launch your modeling career with confidence."
  }
];

const IntroSlider: React.FC<IntroSliderProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const skipIntro = () => {
    onComplete();
  };

  const getStarted = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="h-full flex items-center justify-center relative"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} opacity-10`} />
          
          <div className="max-w-4xl mx-auto px-6 text-center z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${slides[currentSlide].gradient} flex items-center justify-center shadow-luxury`}>
                {React.createElement(slides[currentSlide].icon, { className: "w-12 h-12 text-white" })}
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold mb-4 text-gray-900"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className={`text-3xl md:text-4xl font-semibold mb-6 bg-gradient-to-r ${slides[currentSlide].gradient} bg-clip-text text-transparent`}
            >
              {slides[currentSlide].subtitle}
            </motion.h2>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {currentSlide === slides.length - 1 ? (
                <button
                  onClick={getStarted}
                  className={`px-8 py-4 bg-gradient-to-r ${slides[currentSlide].gradient} text-white rounded-full font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2`}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={nextSlide}
                  className={`px-8 py-4 bg-gradient-to-r ${slides[currentSlide].gradient} text-white rounded-full font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
              
              <button
                onClick={skipIntro}
                className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-300"
              >
                Skip Introduction
              </button>
            </motion.div>
          </div>

          {/* Progress indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSlide(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? `bg-gradient-to-r ${slides[currentSlide].gradient}`
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Skip button */}
          <button
            onClick={skipIntro}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-300"
          >
            Skip
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default IntroSlider;