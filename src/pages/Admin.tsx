import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, Users, FileText, Award, TrendingUp, Mail, 
  Settings, Eye, Edit, Trash2, Plus, Search, Filter,
  Download, Calendar, Star, Crown
} from 'lucide-react';

const Admin: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in a real app, this would come from an API
  const mockData = {
    stats: {
      totalApplicants: 1247,
      activeModels: 89,
      pendingReviews: 23,
      totalRevenue: 2400000,
      campaignsActive: 45,
      brandsPartners: 156,
    },
    applicants: [
      {
        id: 1,
        name: 'Emma Thompson',
        email: 'emma.thompson@email.com',
        type: 'Model',
        status: 'Pending Review',
        appliedDate: '2024-01-15',
        experience: 'Intermediate',
        rating: 4.8,
      },
      {
        id: 2,
        name: 'LUXE Fashion Brand',
        email: 'marketing@luxefashion.com',
        type: 'Brand',
        status: 'Approved',
        appliedDate: '2024-01-12',
        budget: '$50,000 - $100,000',
        rating: 5.0,
      },
      {
        id: 3,
        name: 'Marcus Johnson',
        email: 'marcus.j@email.com',
        type: 'Model',
        status: 'Under Review',
        appliedDate: '2024-01-10',
        experience: 'Beginner',
        rating: 4.2,
      },
    ],
    models: [
      {
        id: 1,
        name: 'Isabella Martinez',
        email: 'isabella@royale.co',
        specialty: 'Fashion & Editorial',
        campaigns: 45,
        revenue: 125000,
        rating: 4.9,
        status: 'Active',
        joinDate: '2023-06-15',
      },
      {
        id: 2,
        name: 'Sofia Chen',
        email: 'sofia@royale.co',
        specialty: 'Runway & High Fashion',
        campaigns: 52,
        revenue: 156000,
        rating: 5.0,
        status: 'Active',
        joinDate: '2023-04-20',
      },
    ],
    testimonials: [
      {
        id: 1,
        name: 'Emma Rodriguez',
        role: 'Fashion Model',
        content: 'ROYALE.CO Academy transformed my career. The training was comprehensive...',
        status: 'Approved',
        rating: 5,
      },
      {
        id: 2,
        name: 'Marcus Johnson',
        role: 'Commercial Model',
        content: 'The business training was invaluable. I learned how to negotiate...',
        status: 'Pending',
        rating: 4,
      },
    ],
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'applicants', label: 'Applicants', icon: Users },
    { id: 'models', label: 'Models', icon: Crown },
    { id: 'testimonials', label: 'Testimonials', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-luxury">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{mockData.stats.totalApplicants.toLocaleString()}</h3>
          <p className="text-gray-600">Total Applicants</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-luxury">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{mockData.stats.activeModels}</h3>
          <p className="text-gray-600">Active Models</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-luxury">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{mockData.stats.pendingReviews}</h3>
          <p className="text-gray-600">Pending Reviews</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-luxury">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${(mockData.stats.totalRevenue / 1000000).toFixed(1)}M</h3>
          <p className="text-gray-600">Total Revenue</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-luxury">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{mockData.stats.campaignsActive}</h3>
          <p className="text-gray-600">Active Campaigns</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-luxury">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{mockData.stats.brandsPartners}</h3>
          <p className="text-gray-600">Brand Partners</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-luxury">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Recent Applicants</h3>
          <div className="space-y-4">
            {mockData.applicants.slice(0, 3).map((applicant) => (
              <div key={applicant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{applicant.name}</h4>
                  <p className="text-sm text-gray-600">{applicant.type} • {applicant.appliedDate}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  applicant.status === 'Approved' 
                    ? 'bg-green-100 text-green-800'
                    : applicant.status === 'Pending Review'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {applicant.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-luxury">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Top Performing Models</h3>
          <div className="space-y-4">
            {mockData.models.map((model) => (
              <div key={model.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{model.name}</h4>
                  <p className="text-sm text-gray-600">{model.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${(model.revenue / 1000).toFixed(0)}K</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm text-gray-600">{model.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplicants = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Applicant Management</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-luxury">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search applicants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Types</option>
            <option value="model">Model</option>
            <option value="brand">Brand</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Applied Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockData.applicants.map((applicant) => (
                <tr key={applicant.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{applicant.name}</div>
                      <div className="text-sm text-gray-600">{applicant.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      applicant.type === 'Model' 
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {applicant.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      applicant.status === 'Approved' 
                        ? 'bg-green-100 text-green-800'
                        : applicant.status === 'Pending Review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{applicant.appliedDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-gray-900">{applicant.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'applicants':
        return renderApplicants();
      case 'models':
        return <div className="text-gray-600">Models management interface would be here</div>;
      case 'testimonials':
        return <div className="text-gray-600">Testimonials management interface would be here</div>;
      case 'settings':
        return <div className="text-gray-600">Settings interface would be here</div>;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-luxury min-h-screen">
          <div className="p-6">
            <Link to="/" className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">ROYALE.CO</span>
            </Link>

            <div className="flex items-center space-x-3 mb-8 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Admin Panel</p>
                <p className="text-sm text-gray-600">Dashboard</p>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;