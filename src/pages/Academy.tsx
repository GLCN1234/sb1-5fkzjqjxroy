import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Users, Award, CheckCircle, Star, Clock, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Academy: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    goals: '',
  });

  const programs = [
    {
      title: 'Beginner Program',
      duration: '8 weeks',
      price: '₦120,000',
      description: 'Perfect for those starting their modeling journey',
      features: ['Basic posing techniques', 'Portfolio building', 'Industry fundamentals', 'Confidence training'],
      color: 'from-green-400 to-blue-500',
    },
    {
      title: 'Advanced Program',
      duration: '12 weeks',
      price: '₦250,000',
      description: 'For models ready to take their career to the next level',
      features: ['Advanced runway skills', 'Professional networking', 'Brand partnerships', 'Business development'],
      color: 'from-purple-400 to-pink-500',
    },
    {
      title: 'Elite Program',
      duration: '16 weeks',
      price: '₦500,000',
      description: 'Comprehensive training for industry leaders',
      features: ['One-on-one mentoring', 'International opportunities', 'Media training', 'Career management'],
      color: 'from-yellow-400 to-orange-500',
    },
  ];

  const curriculum = [
    { week: '1-2', title: 'Foundation & Posing', topics: ['Basic posing', 'Body language', 'Facial expressions', 'Studio basics'] },
    { week: '3-4', title: 'Photography & Portfolio', topics: ['Working with photographers', 'Lighting basics', 'Portfolio selection', 'Digital presence'] },
    { week: '5-6', title: 'Runway & Movement', topics: ['Runway techniques', 'Movement coaching', 'Show preparation', 'Wardrobe styling'] },
    { week: '7-8', title: 'Business & Networking', topics: ['Industry networking', 'Contract basics', 'Self-promotion', 'Career planning'] },
  ];

  const testimonials = [
    {
      name: 'Emma Rodriguez',
      role: 'Fashion Model',
      content: 'ROYALE DOXA Academy transformed my career. The training was comprehensive and the mentors were incredible.',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      name: 'Marcus Johnson',
      role: 'Commercial Model',
      content: 'The business training was invaluable. I learned how to negotiate contracts and build lasting relationships.',
      image: 'https://images.pexels.com/photos/3184320/pexels-photo-3184320.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      name: 'Sofia Chen',
      role: 'Runway Model',
      content: "From beginner to booking major shows in 6 months. The academy's network opened doors I never imagined.",
      image: 'https://images.pexels.com/photos/3184341/pexels-photo-3184341.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  ];

  // ✅ Clicking "Enroll Now" scrolls to form and pre-selects the program
  const handleEnrollClick = (programTitle: string) => {
    setSelectedProgram(programTitle);
    const formSection = document.getElementById('application-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submits to Supabase academy_enrollments table
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const { error } = await supabase.from('academy_enrollments').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          experience: formData.experience,
          goals: formData.goals,
          program: selectedProgram || 'Not specified',
        },
      ]);

      if (error) throw error;

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', age: '', experience: '', goals: '' });
      setSelectedProgram(null);
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              Modeling <span className="gradient-text">Academy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Transform your passion into a successful modeling career. Learn from industry experts and join our network of successful models.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { icon: Users, label: 'Graduates', value: '500+', color: 'from-yellow-400 to-orange-500' },
              { icon: Award, label: 'Success Rate', value: '95%', color: 'from-green-400 to-blue-500' },
              { icon: Clock, label: 'Week Programs', value: '8-16', color: 'from-blue-400 to-cyan-500' },
              { icon: MapPin, label: 'Locations', value: '5', color: 'from-pink-400 to-red-500' },
            ].map(({ icon: Icon, label, value, color }, i) => (
              <div key={i} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold gradient-text">{value}</h3>
                <p className="text-gray-600">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
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
              Choose Your <span className="gradient-text">Program</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're just starting or looking to advance your career, we have a program designed for your level and goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-luxury hover-lift border border-gray-100 h-full text-center flex flex-col">
                  <div className={`w-16 h-16 bg-gradient-to-r ${program.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Star className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-semibold mb-2 text-gray-900">{program.title}</h3>
                  <p className="text-3xl font-bold gradient-text mb-4">{program.price}</p>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  <p className="text-sm text-gray-500 mb-6">Duration: {program.duration}</p>

                  <ul className="space-y-3 mb-8 text-left flex-1">
                    {program.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* ✅ Fixed: onClick now scrolls to form and selects program */}
                  <button
                    onClick={() => handleEnrollClick(program.title)}
                    className={`w-full py-3 bg-gradient-to-r ${program.color} text-white rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    Enroll Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
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
              Our <span className="gradient-text">Curriculum</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive 8-week journey from basics to professional expertise, designed by industry veterans.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {curriculum.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-luxury hover-lift"
              >
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-sm font-semibold rounded-full">
                    Week {item.week}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">{item.title}</h3>
                <ul className="space-y-2">
                  {item.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              Success <span className="gradient-text">Stories</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-luxury hover-lift text-center"
              >
                <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-xl opacity-90">Take the first step towards your modeling career. Apply now and join our next cohort.</p>
            {selectedProgram && (
              <div className="mt-4 inline-block bg-white/20 rounded-full px-6 py-2 text-white font-semibold">
                Selected: {selectedProgram}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-luxury"
          >
            {submitSuccess ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-gray-600 mb-6">We'll review your application and reach out within 2-3 business days.</p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Program selector inside form */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Program *</label>
                  <select
                    value={selectedProgram || ''}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a program</option>
                    {programs.map((p) => (
                      <option key={p.title} value={p.title}>{p.title} — {p.price} ({p.duration})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="+234 000 000 0000" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Age *</label>
                    <select name="age" value={formData.age} onChange={handleInputChange} required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300">
                      <option value="">Select age range</option>
                      <option value="16-20">16-20</option>
                      <option value="21-25">21-25</option>
                      <option value="26-30">26-30</option>
                      <option value="31+">31+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Previous Experience</label>
                  <select name="experience" value={formData.experience} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300">
                    <option value="">Select experience level</option>
                    <option value="none">No experience</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Career Goals *</label>
                  <textarea name="goals" value={formData.goals} onChange={handleInputChange} required rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your modeling aspirations..." />
                </div>

                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{submitError}</div>
                )}

                <button type="submit" disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none">
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Academy;