import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar, Users } from 'lucide-react';

const Contact: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    reason: '',
    message: '',
    budget: '',
    timeline: '',
  });

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'hello@royale.co',
      action: 'Send Email',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team during business hours',
      contact: '+1 (555) 123-4567',
      action: 'Call Now',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant answers to your questions',
      contact: 'Available 9 AM - 6 PM EST',
      action: 'Start Chat',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Calendar,
      title: 'Schedule Meeting',
      description: 'Book a consultation with our strategy team',
      contact: 'Available slots daily',
      action: 'Book Now',
      color: 'from-yellow-400 to-orange-500',
    },
  ];

  const offices = [
    {
      city: 'New York',
      address: '123 Fifth Avenue, Suite 100',
      zipcode: 'New York, NY 10001',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 9 AM - 6 PM EST',
    },
    {
      city: 'Los Angeles',
      address: '456 Sunset Boulevard, Floor 5',
      zipcode: 'Los Angeles, CA 90028',
      phone: '+1 (555) 987-6543',
      hours: 'Mon-Fri: 9 AM - 6 PM PST',
    },
    {
      city: 'Miami',
      address: '789 Ocean Drive, Suite 200',
      zipcode: 'Miami, FL 33139',
      phone: '+1 (555) 456-7890',
      hours: 'Mon-Fri: 9 AM - 6 PM EST',
    },
  ];

  const reasonOptions = [
    'General Inquiry',
    'Brand Partnership',
    'Model Booking',
    'Academy Enrollment',
    'Media Inquiry',
    'Career Opportunities',
    'Technical Support',
    'Other',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial={{ y: 30, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-luxury">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ready to elevate your brand or modeling career? We're here to help. Reach out to our team and let's create something extraordinary together.
            </p>
          </motion.div>

          {/* Quick Contact Methods */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactMethods.map((method, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-luxury hover-lift text-center border border-gray-100 h-full">
                  <div className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                  <p className="text-gray-800 font-medium mb-4">{method.contact}</p>
                  <button className={`w-full py-2 bg-gradient-to-r ${method.color} text-white rounded-lg font-medium text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                    {method.action}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you within 24 hours. We're excited to learn about your project and explore how we can help.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Company/Organization</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Company name (optional)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Reason for Contact *</label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a reason</option>
                    {reasonOptions.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                {formData.reason === 'Brand Partnership' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select budget range</option>
                        <option value="5k-25k">$5,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k+">$100,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Timeline</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP (1-2 weeks)</option>
                        <option value="month">Within a month</option>
                        <option value="quarter">This quarter</option>
                        <option value="flexible">Flexible timing</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project, goals, and how we can help you achieve them..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>

            {/* Office Information */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Offices</h2>
              <p className="text-gray-600 mb-8">
                Visit us at one of our locations or reach out to the office nearest you. Our team is available to meet in person or virtually.
              </p>

              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 flex items-center">
                      <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                      {office.city}
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <p>{office.address}</p>
                      <p>{office.zipcode}</p>
                      <div className="flex items-center space-x-4 pt-2">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm">{office.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm">{office.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Maps Embed Placeholder */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Find Us</h3>
                <div className="w-full h-64 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Interactive map would be embedded here</p>
                    <p className="text-sm text-gray-400">Google Maps integration</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions. Can't find what you're looking for? Contact us directly.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                question: "How do I apply to become a ROYALE DOXA model?",
                answer: "You can apply through our Join page by filling out the comprehensive application form. We review all applications within 5-7 business days and contact selected candidates for the next steps."
              },
              {
                question: "What services do you offer to brands?",
                answer: "We offer comprehensive influencer marketing services including campaign strategy, model partnerships, content creation, and performance analytics. Our services are customized based on your brand's specific needs and goals."
              },
              {
                question: "How much does it cost to work with ROYALE DOXA?",
                answer: "Our pricing varies based on the scope and complexity of your project. We offer flexible packages starting from $5,000 for smaller campaigns up to comprehensive packages for major brand partnerships. Contact us for a custom quote."
              },
              {
                question: "Do you work with international brands?",
                answer: "Yes! We work with brands and clients worldwide. Our network spans across 45+ countries, and we can execute campaigns on a global scale while adapting to local markets and cultural nuances."
              },
              {
                question: "What is the typical timeline for a campaign?",
                answer: "Campaign timelines vary depending on scope and complexity. Simple campaigns can be launched within 2-3 weeks, while comprehensive multi-platform campaigns typically take 4-6 weeks from strategy to execution."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Create Something Amazing
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Ready to take your brand or career to the next level? Our team is standing by to help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-luxury hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Started Today
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;