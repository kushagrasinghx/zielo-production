import { useState } from 'react';
import { brands } from '@/data/brands';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, Upload, FileText, Image, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter as DialogFooterUI, DialogDescription } from '@/components/ui/dialog';
import type { Brand, Campaign } from '@/data/types';

// Mock status assignment for demo (in real app, this would come from backend/user data)
const statusMap = [
  { key: 'pending', label: 'Pending', color: 'text-[#9F1D35]', border: 'border-[#9F1D35]' },
  { key: 'approved', label: 'Approved', color: 'text-[#9F1D35]', border: 'border-[#9F1D35]' },
  { key: 'rejected', label: 'Rejected', color: 'text-[#EF4444]', border: 'border-[#EF4444]' },
  { key: 'archived', label: 'Archived', color: 'text-[#6B7280]', border: 'border-[#6B7280]' },
  { key: 'submitted', label: 'Submitted', color: 'text-[#6B7280]', border: 'border-[#6B7280]' },
];

// Assign brands to statuses for demo
const statusAssignments = brands.reduce((acc, brand, idx) => {
  const status = statusMap[idx % statusMap.length].key;
  if (!acc[status]) acc[status] = [];
  acc[status].push(brand);
  return acc;
}, {} as Record<string, typeof brands>);

// Helper function to determine content type from campaign type
const getContentTypeFromCampaign = (campaignType: string): 'image' | 'video' | 'text' => {
  const type = campaignType.toLowerCase();
  if (type.includes('video') || type.includes('reel') || type.includes('tiktok') || type.includes('youtube')) {
    return 'video';
  } else if (type.includes('story') || type.includes('post') || type.includes('carousel')) {
    return 'image';
  } else {
    return 'text';
  }
};

const initialUploadData = {
  title: '',
  contentType: 'image' as 'image' | 'video' | 'text',
  file: null,
  url: '',
  uploadMethod: 'file',
};

export default function CollaborationStatus() {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [uploadBrand, setUploadBrand] = useState<Brand | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [uploadMode, setUploadMode] = useState<'submit' | 'resubmit'>('submit');
  const [customUploadData, setCustomUploadData] = useState(initialUploadData);

  const openUploadPopup = (brand: Brand, campaign: Campaign, mode: 'submit' | 'resubmit') => {
    setUploadBrand(brand);
    setSelectedCampaign(campaign);
    setUploadMode(mode);
    setShowUploadPopup(true);
    const contentType = getContentTypeFromCampaign(campaign.type);
    setCustomUploadData({
      ...initialUploadData,
      title: campaign.title,
      contentType
    });
  };

  const closeUploadPopup = () => {
    setShowUploadPopup(false);
    setUploadBrand(null);
    setSelectedCampaign(null);
    setCustomUploadData(initialUploadData);
  };

  const handleCustomUploadChange = (field: string, value: any) => {
    setCustomUploadData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomUploadSubmit = () => {
    // Handle custom upload logic here
    closeUploadPopup();
  };

  return (
    <div className="space-y-6 w-full">
      <div>
          <p className="text-sm text-muted-foreground">
            View and manage your brand collaborations by status.
          </p>
        </div>
      <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {statusMap.map((status) => (
          <div key={status.key} className="flex flex-col min-w-0">
            <div className={`border-b pb-1 mb-2 ${status.border}`}> 
              <span className={`font-semibold text-sm ${status.color}`}>{status.label} ({statusAssignments[status.key]?.length || 0})</span>
            </div>
            <div className="flex flex-col gap-4">
              {statusAssignments[status.key]?.map((brand, idx) => (
                <Card key={brand.name + idx} className="relative p-0 overflow-visible border border-[#e2e8f0] bg-white rounded-2xl w-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 px-4 pt-4 pb-2">
                      <div className="w-8 h-8 bg-[#f3f5f9] rounded-full flex items-center justify-center border border-[#e2e8f0] overflow-hidden">
                        {brand.logo ? (
                          <img src={brand.logo} alt={brand.name} className="object-cover w-full h-full" />
                        ) : (
                          <span className="text-xs font-semibold text-gray-400">{brand.name[0]}</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-yellow-500 text-xs font-medium">
                          <Star size={12} fill="#FEC84B" color="#FEC84B" className="inline-block" />
                          <span>{brand.rating}</span>
                        </div>
                        <div className="font-semibold text-xs leading-tight mb-0 text-gray-900">{brand.name}</div>
                      </div>
                    </div>
                    <CardContent className="px-4 pt-0 pb-2">
                      <div className="text-xs text-gray-700 mb-2 line-clamp-3 min-h-[48px]">{brand.description}</div>
                      <div className="flex flex-wrap gap-2">
                        {brand.categories.map((cat) => (
                          <span key={cat} className="bg-[#fbeaec] text-[#9F1D35] font-medium text-xs px-2 rounded-lg border border-[#f3cdd3]">{cat}</span>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                  <CardFooter className="flex items-center justify-between px-4 pt-0 pb-3 mt-0">
                    <span className="text-xs text-gray-400">Date: <span className="font-semibold text-gray-900">20/05/2025</span></span>
                  </CardFooter>
                  {/* Action Buttons */}
                  {status.key === 'pending' && (
                    <div className="flex gap-2 px-4 pb-4 pt-0">
                      <Button size="sm" className="flex-1 bg-[#fbeaec] text-[#9F1D35] font-medium text-xs border border-[#f3cdd3] hover:bg-[#fad7df] py-1.5 px-2">Archive</Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-[#9F1D35] text-white hover:bg-[#8a1a2e] text-xs py-1.5 px-2" 
                        onClick={() => brand.campaigns && brand.campaigns[0] && openUploadPopup(brand, brand.campaigns[0], 'submit')}
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                  {status.key === 'archived' && (
                    <div className="flex gap-2 px-4 pb-4 pt-0">
                      <Button size="sm" className="flex-1 bg-[#fbeaec] text-[#9F1D35] font-medium text-xs border border-[#f3cdd3] hover:bg-[#fad7df] py-1.5 px-2">Unarchive</Button>
                    </div>
                  )}
                  {status.key === 'rejected' && (
                    <div className="flex gap-2 px-4 pb-4 pt-0">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-[#fbeaec] text-[#9F1D35] font-medium text-xs border border-[#f3cdd3] hover:bg-[#fad7df] py-1.5 px-2" 
                        onClick={() => brand.campaigns && brand.campaigns[0] && openUploadPopup(brand, brand.campaigns[0], 'resubmit')}
                      >
                        Resubmit
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
              {(!statusAssignments[status.key] || statusAssignments[status.key].length === 0) && (
                <div className="text-xs text-gray-400 text-center py-3">No brands</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Upload Popup for Submit/Resubmit */}
      <Dialog open={showUploadPopup} onOpenChange={setShowUploadPopup}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{uploadMode === 'submit' ? 'Submit Content' : 'Resubmit Content'}</DialogTitle>
            <DialogDescription>
              {uploadMode === 'submit' ? 'Submit' : 'Resubmit'} your content for <span className="font-semibold text-[#9F1D35]">{uploadBrand?.name}</span> campaign.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Title</label>
              <input
                type="text"
                placeholder="Enter your content title..."
                value={customUploadData.title}
                onChange={e => handleCustomUploadChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent text-sm"
              />
            </div>

            {/* Campaign Guidelines */}
            {selectedCampaign && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Guidelines</label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Requirements</h4>
                  <ul className="text-xs text-blue-800 space-y-1 mb-3">
                    {selectedCampaign.requirements.map((req, idx) => (
                      <li key={idx}>• {req}</li>
                    ))}
                  </ul>
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Guidelines</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    {selectedCampaign.guidelines.map((guideline, idx) => (
                      <li key={idx}>• {guideline}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Content Type (Auto-selected based on campaign) */}
            {selectedCampaign && (
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
                        onChange={e => handleCustomUploadChange('contentType', e.target.value)}
                        className="w-4 h-4 text-[#9F1D35] focus:ring-[#9F1D35]"
                      />
                      <div className="flex items-center gap-1">
                        {type.icon}
                        <span className="text-sm text-gray-700">{type.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Auto-selected based on campaign type: <span className="font-medium">{selectedCampaign.type}</span>
                </p>
              </div>
            )}

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
                    onChange={e => handleCustomUploadChange('uploadMethod', e.target.value)}
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
                    onChange={e => handleCustomUploadChange('uploadMethod', e.target.value)}
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
                  onChange={e => handleCustomUploadChange('url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent text-sm"
                />
              )}
            </div>
          </div>

          <DialogFooterUI className="flex gap-3 sm:gap-3">
            <Button
              variant="outline"
              onClick={closeUploadPopup}
              className="flex-1 border border-gray-300 text-gray-700 py-1.5 px-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCustomUploadSubmit}
              disabled={!customUploadData.title}
              className="flex-1 bg-[#9F1D35] text-white py-1.5 px-3 rounded-lg font-medium hover:bg-[#8a1a2e] transition-colors text-xs disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit
            </Button>
          </DialogFooterUI>
        </DialogContent>
      </Dialog>
    </div>
  );
} 