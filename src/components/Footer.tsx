import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">ROYALEDOXA</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Where influence meets elegance. Creating the next generation of models, influencers, and brand ambassadors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-blue-500 transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-blue-500 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-blue-500 transition-all duration-300">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors duration-300">Services</Link></li>
              <li><Link to="/academy" className="text-gray-400 hover:text-white transition-colors duration-300">Academy</Link></li>
              <li><Link to="/models" className="text-gray-400 hover:text-white transition-colors duration-300">Models</Link></li>
              <li><Link to="/brands" className="text-gray-400 hover:text-white transition-colors duration-300">Brands</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Product Influencing</li>
              <li>Brand Marketing</li>
              <li>Model Management</li>
              <li>Modeling Academy</li>
              <li>Campaign Development</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400">info@royale.co</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">New York, NY</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 ROYALE.CO. All rights reserved. Crafting excellence in modeling and brand influence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;