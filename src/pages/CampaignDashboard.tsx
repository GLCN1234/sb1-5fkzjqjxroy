import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Crown, Search, Filter, Download, Eye, Edit, Trash2, 
  Calendar, DollarSign, Target, TrendingUp, Users, CheckCircle, 
  Clock, XCircle, FileText, Mail, Phone
} from 'lucide-react';
import { useCampaigns } from '../hooks/useCampaigns';
import { formatCurrency } from '../utils/pricing';
import { Campaign } from '../types/campaign';

const CampaignDashboard: React.FC = () => {
  const { campaigns, deleteCampaign } = useCampaigns();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [goalFilter, setGoalFilter] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = 
      campaign.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || campaign.paymentStatus === statusFilter;
    
    const matchesGoal = goalFilter === 'all' || campaign.campaignGoals.includes(goalFilter as any);
    
    return matchesSearch && matchesStatus && matchesGoal;
  });

  const stats = {
    total: campaigns.length,
    completed: campaigns.filter(c => c.paymentStatus === 'completed').length,
    pending: campaigns.filter(c => c.paymentStatus === 'pending').length,
    failed: campaigns.filter(c => c.paymentStatus === 'failed').length,
    totalRevenue: campaigns
      .filter(c => c.paymentStatus === 'completed')
      .reduce((sum, c) => sum + c.totalPrice, 0),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Full Name', 'Brand Name', 'Email', 'Phone', 'Campaign Goals', 'Ad Types', 'Total Price', 'Payment Status', 'Created At'].join(','),
      ...filteredCampaigns.map(campaign => [
        campaign.fullName,
        campaign.brandName,
        campaign.email,
        campaign.phone,
        campaign.campaignGoals.join('; '),
        campaign.advertisementTypes.join('; '),
        campaign.totalPrice,
        campaign.paymentStatus,
        campaign.createdAt.toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campaigns.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">ROYALE DOXA</span>
            </Link>
            <div className="h-8 w-px bg-gray-300" />
            <h1 className="text-3xl font-bold text-gray-900">Campaign Dashboard</h1>
          </div>
          
          <button
            onClick={exportData}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
            <p className="text-gray-600">Total Campaigns</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.completed}</h3>
            <p className="text-gray-600">Completed</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.pending}</h3>
            <p className="text-gray-600">Pending</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.failed}</h3>
            <p className="text-gray-600">Failed</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</h3>
            <p className="text-gray-600">Total Revenue</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-luxury mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            
            <select
              value={goalFilter}
              onChange={(e) => setGoalFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Goals</option>
              <option value="leads">Leads</option>
              <option value="sales">Sales</option>
              <option value="engagement">Engagement</option>
            </select>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-2xl shadow-luxury overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Campaign Info</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Contact</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Goals & Types</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Price</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{campaign.fullName}</div>
                        <div className="text-sm text-gray-600">{campaign.brandName}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {campaign.uploadedFiles.length} files uploaded
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="flex items-center mb-1">
                          <Mail className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-gray-600">{campaign.email}</span>
                        </div>
                        {campaign.phone && (
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 text-gray-400 mr-1" />
                            <span className="text-gray-600">{campaign.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex flex-wrap gap-1">
                          {campaign.campaignGoals.map(goal => (
                            <span key={goal} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
                              {goal}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {campaign.advertisementTypes.map(type => (
                            <span key={type} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              {type === 'content' ? 'Content' : 'Platform'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        {formatCurrency(campaign.totalPrice)}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.paymentStatus)}`}>
                        {getStatusIcon(campaign.paymentStatus)}
                        <span className="ml-1 capitalize">{campaign.paymentStatus}</span>
                      </span>
                    </td>
                    
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {campaign.createdAt.toLocaleDateString()}
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedCampaign(campaign)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCampaign(campaign.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="Delete Campaign"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No campaigns found</p>
            </div>
          )}
        </div>

        {/* Campaign Details Modal */}
        {selectedCampaign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-luxury"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Campaign Details</h2>
                  <button
                    onClick={() => setSelectedCampaign(null)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Full Name:</strong> {selectedCampaign.fullName}</p>
                      <p><strong>Brand Name:</strong> {selectedCampaign.brandName}</p>
                      <p><strong>Email:</strong> {selectedCampaign.email}</p>
                      <p><strong>Phone:</strong> {selectedCampaign.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Campaign Info</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Total Price:</strong> {formatCurrency(selectedCampaign.totalPrice)}</p>
                      <p><strong>Payment Status:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedCampaign.paymentStatus)}`}>
                          {selectedCampaign.paymentStatus}
                        </span>
                      </p>
                      <p><strong>Created:</strong> {selectedCampaign.createdAt.toLocaleDateString()}</p>
                      <p><strong>Files:</strong> {selectedCampaign.uploadedFiles.length} uploaded</p>
                    </div>
                  </div>
                </div>

                {/* Product Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">About Product</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedCampaign.aboutProduct}</p>
                  {selectedCampaign.productLink && (
                    <p className="mt-2"><strong>Product Link:</strong> 
                      <a href={selectedCampaign.productLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                        {selectedCampaign.productLink}
                      </a>
                    </p>
                  )}
                </div>

                {/* Goals and Ad Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Campaign Goals</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCampaign.campaignGoals.map(goal => (
                        <span key={goal} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Advertisement Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCampaign.advertisementTypes.map(type => (
                        <span key={type} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                          {type === 'content' ? 'Content Advertisement' : 'Platform Ads'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expected Results */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Expected Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedCampaign.expectedResults.leads && (
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">{selectedCampaign.expectedResults.leads.toLocaleString()}</p>
                        <p className="text-sm text-blue-600">Leads/month</p>
                      </div>
                    )}
                    {selectedCampaign.expectedResults.sales && (
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">{selectedCampaign.expectedResults.sales.toLocaleString()}</p>
                        <p className="text-sm text-green-600">Sales/month</p>
                      </div>
                    )}
                    {selectedCampaign.expectedResults.engagement && (
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">{selectedCampaign.expectedResults.engagement.toLocaleString()}</p>
                        <p className="text-sm text-purple-600">Engagements/month</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDashboard;