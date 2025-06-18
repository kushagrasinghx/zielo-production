import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Users, Eye, Target, ChevronDown, ChevronUp, X, Heart, MessageCircle, Share, Upload, FileText, Image, Video, ClipboardList } from 'lucide-react';
import { brands } from '@/data/brands';

const BrandCollaborate = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('opportunities');
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [showCustomUploadPopup, setShowCustomUploadPopup] = useState(false);
  const [customUploadData, setCustomUploadData] = useState({
    title: '',
    description: '',
    contentType: 'image',
    file: null,
    url: '',
    uploadMethod: 'file'
  });
  const [logoError, setLogoError] = useState(false);
  
  // Find the brand by name (URL encoded)
  const brand = brands.find(b => 
    b.name.toLowerCase().replace(/\s+/g, '-') === brandName?.toLowerCase()
  );

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-[80vh] max-w-[300px]">
        <p className="text-gray-500">Brand not found! Please check the URL and try again.</p>
      </div>
    );
  }

  const toggleCard = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleApply = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setShowApplyPopup(true);
  };

  const closeApplyPopup = () => {
    setShowApplyPopup(false);
    setSelectedOpportunity(null);
  };

  const handleConfirmApply = () => {
    // Close popup and redirect to collaboration page
    closeApplyPopup();
    navigate('/collaboration');
  };

  const handleCustomUpload = () => {
    setShowCustomUploadPopup(true);
  };

  const closeCustomUploadPopup = () => {
    setShowCustomUploadPopup(false);
    setCustomUploadData({
      title: '',
      description: '',
      contentType: 'image',
      file: null,
      url: '',
      uploadMethod: 'file'
    });
  };

  const handleCustomUploadSubmit = () => {
    // Handle custom upload logic
    console.log('Custom upload data:', customUploadData);
    closeCustomUploadPopup();
    // You could show a success message or redirect
  };

  const handleCustomUploadChange = (field: string, value: any) => {
    setCustomUploadData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderOpportunities = () => (
    <div className="space-y-4">
      {/* Custom Upload Button */}
      <div className="mb-6">
        <button
          onClick={handleCustomUpload}
          className="w-full p-2 border border-dashed border-[#9F1D35] rounded-lg text-[#9F1D35] hover:bg-[#fce8ec] transition-colors flex items-center justify-center gap-2 text-xs font-medium"
        >
          <Upload size={14} />
          <span>Upload Custom Content</span>
        </button>
      </div>

      {brand.campaigns?.map((opportunity) => (
        <div key={opportunity.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Card Header - Always Visible */}
          <div 
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleCard(opportunity.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-[#9F1D35] font-medium">{opportunity.type}</span>
                  <span className="text-sm text-[#8a1a2e] font-medium">{opportunity.category}</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm leading-tight">{opportunity.title}</h4>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <div className="bg-[#fce8ec] text-[#9F1D35] px-2 py-1 rounded-full text-xs font-medium">
                  {opportunity.coins} coins
                </div>
                {expandedCard === opportunity.id ? (
                  <ChevronUp size={16} className="text-gray-400" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{opportunity.deadline}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} />
                <span>{opportunity.creatorsNeeded} needed</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} fill="#FEC84B" color="#FEC84B" />
                <span>{opportunity.rating}</span>
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          {expandedCard === opportunity.id && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="pt-4 space-y-4">
                {/* Description */}
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Description</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">{opportunity.description}</p>
                </div>

                {/* Requirements */}
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2"><ClipboardList size={16} className="text-[#9F1D35]" /> Requirements</h5>
                  <ul className="space-y-1">
                    {opportunity.requirements.map((req: string, index: number) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-[#9F1D35] mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Guidelines */}
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2"><FileText size={16} className="text-[#9F1D35]" /> Guidelines</h5>
                  <ul className="space-y-1">
                    {opportunity.guidelines.map((guideline: string, index: number) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-[#9F1D35] mt-1">•</span>
                        <span>{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deadline */}
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2"><Calendar size={16} className="text-[#9F1D35]" /> Deadline</h5>
                  <p className="text-sm text-gray-600">{opportunity.deadline}</p>
                </div>

                {/* Apply Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(opportunity);
                  }}
                  className="w-full bg-[#9F1D35] text-white py-2.5 rounded-xl font-medium hover:bg-[#8a1a2e] transition-colors text-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderUGCPortfolio = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {brand.ugcPortfolio?.map((item) => (
        <div key={item.id} className="relative aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer">
          {/* Content placeholder */}
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="text-center text-gray-400">
              <span className="text-sm">UGC Content</span>
            </div>
            
            {/* Video Play Button */}
            {item.type === 'video' && (
              <div className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-1"></div>
              </div>
            )}
            
            {/* Instagram-like overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Heart size={20} fill="white" />
                  <span className="font-semibold">{item.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={20} fill="white" />
                  <span className="font-semibold">{item.comments}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Creator Info - Instagram style */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-3">
            <div className="flex flex-col items-start text-white">
              <span className="text-sm font-medium mb-2">{item.creator}</span>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Heart size={12} />
                  <span>{item.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={12} />
                  <span>{item.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-[#9F1D35] transition-colors"
          >
            Dashboard
          </button>
          <span>›</span>
          <span className="text-gray-900">Brand Details</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Brand Information */}
          <div className="w-full space-y-6">
            {/* Hero Section */}
            <div 
              className="relative h-48 rounded-2xl mb-6 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
            >
              {/* Brand name centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-gray-900">{brand.name}</h1>
              </div>
            </div>

            {/* About Brand Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-sm font-medium text-gray-900 mb-4">About {brand.name}</h2>
              
              {/* Brand Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-[#f3f5f9] rounded-xl flex items-center justify-center border border-[#e2e8f0] overflow-hidden">
                  {brand.logo && !logoError ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="object-cover w-full h-full"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <span className="text-2xl font-bold text-gray-400">{brand.name[0]}</span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-0.5">
                    <h3 className="text-lg font-bold text-gray-900">{brand.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star size={14} fill="#FEC84B" color="#FEC84B" />
                      <span className="text-sm font-medium text-gray-700">{brand.rating}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    {brand.description}
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap">
                    {brand.categories.map(cat => (
                      <span
                        key={cat}
                        className="bg-[#fce8ec] text-[#9F1D35] text-xs px-3 py-1 rounded-lg font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Brand Story */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-0.5">Brand Story</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {brand.brandStory}
                </p>
              </div>

              {/* Brand Voice & Target Audience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-0.5">Brand Voice & Tone</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {brand.brandVoice}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-0.5">Target Audience</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {brand.targetAudience}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Tabs and Content */}
          <div className="w-full space-y-6">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: 'opportunities', label: 'Opportunities' },
                  { id: 'ugc-portfolio', label: 'UGC Portfolio' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#9F1D35] text-[#9F1D35]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'opportunities' && renderOpportunities()}
              {activeTab === 'ugc-portfolio' && renderUGCPortfolio()}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Confirmation Popup */}
      {showApplyPopup && selectedOpportunity && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Blurred Transparent Backdrop */}
          <div 
            className="absolute inset-0 backdrop-blur-sm bg-white/10"
            onClick={closeApplyPopup}
          ></div>
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Confirm Application</h2>
              <button
                onClick={closeApplyPopup}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{selectedOpportunity.title}</h3>
                <p className="text-sm text-gray-600">{selectedOpportunity.description}</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Deadline: {selectedOpportunity.deadline}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{selectedOpportunity.creatorsNeeded} creators needed</span>
                </div>
              </div>

              <div className="bg-[#fce8ec] p-4 rounded-lg">
                <p className="text-sm text-[#9F1D35] font-medium">
                  You'll earn {selectedOpportunity.coins} coins for this collaboration!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={closeApplyPopup}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApply}
                className="flex-1 bg-[#9F1D35] text-white py-3 rounded-lg font-medium hover:bg-[#8a1a2e] transition-colors"
              >
                Confirm Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Upload Popup */}
      {showCustomUploadPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Blurred Transparent Backdrop */}
          <div 
            className="absolute inset-0 backdrop-blur-sm bg-white/10"
            onClick={closeCustomUploadPopup}
          ></div>
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upload Custom Content</h2>
              <button
                onClick={closeCustomUploadPopup}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Title</label>
                <input
                  type="text"
                  placeholder="e.g., My skincare routine with EcoBeauty"
                  value={customUploadData.title}
                  onChange={(e) => handleCustomUploadChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your content and how it relates to the brand..."
                  value={customUploadData.description}
                  onChange={(e) => handleCustomUploadChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent resize-none"
                />
              </div>

              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Content Type</label>
                <div className="flex gap-4">
                  {[
                    { value: 'image', label: 'Image', icon: <Image size={16} /> },
                    { value: 'video', label: 'Video', icon: <Video size={16} /> },
                    { value: 'text', label: 'Text Post', icon: <FileText size={16} /> }
                  ].map((type) => (
                    <label key={type.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contentType"
                        value={type.value}
                        checked={customUploadData.contentType === type.value}
                        onChange={(e) => handleCustomUploadChange('contentType', e.target.value)}
                        className="w-4 h-4 text-[#9F1D35] focus:ring-[#9F1D35]"
                      />
                      <div className="flex items-center gap-1">
                        {type.icon}
                        <span className="text-sm text-gray-700">{type.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Upload Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Upload Method</label>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="uploadMethod"
                      value="file"
                      checked={customUploadData.uploadMethod === 'file'}
                      onChange={(e) => handleCustomUploadChange('uploadMethod', e.target.value)}
                      className="w-4 h-4 text-[#9F1D35] focus:ring-[#9F1D35]"
                    />
                    <span className="text-sm text-gray-700">Upload File</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="uploadMethod"
                      value="url"
                      checked={customUploadData.uploadMethod === 'url'}
                      onChange={(e) => handleCustomUploadChange('uploadMethod', e.target.value)}
                      className="w-4 h-4 text-[#9F1D35] focus:ring-[#9F1D35]"
                    />
                    <span className="text-sm text-gray-700">Paste URL</span>
                  </label>
                </div>

                {customUploadData.uploadMethod === 'file' ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#9F1D35] transition-colors cursor-pointer">
                    <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Drag & drop or click to <span className="text-[#9F1D35] underline cursor-pointer">upload</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Supports: JPG, PNG, MP4, MOV (max 50MB)
                    </p>
                  </div>
                ) : (
                  <input
                    type="url"
                    placeholder="Paste your content URL here (Instagram, TikTok, YouTube, etc.)"
                    value={customUploadData.url}
                    onChange={(e) => handleCustomUploadChange('url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent"
                  />
                )}
              </div>

              {/* Guidelines */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Content Guidelines</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Ensure content aligns with {brand.name}'s brand values</li>
                  <li>• Include clear product visibility if featuring brand products</li>
                  <li>• Use authentic, high-quality visuals</li>
                  <li>• Follow platform-specific best practices</li>
                  <li>• Disclose any brand partnerships appropriately</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={closeCustomUploadPopup}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomUploadSubmit}
                disabled={!customUploadData.title || !customUploadData.description}
                className="flex-1 bg-[#9F1D35] text-white py-3 rounded-lg font-medium hover:bg-[#8a1a2e] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Submit Content
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrandCollaborate; 