import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { brands } from '../../data/brands';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Users, Eye, TrendingUp, Calendar, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { buttonVariants } from '@/components/ui/button';

const statCards = [
  { label: 'Total Reach', value: '2.3M', icon: <Eye className="w-6 h-6 mx-auto mb-1" /> },
  { label: 'Creators Involved', value: '15', icon: <Users className="w-6 h-6 mx-auto mb-1" /> },
  { label: 'Engagements', value: '380K', icon: <TrendingUp className="w-6 h-6 mx-auto mb-1" /> },
  { label: 'Engagement Rate', value: '9.3%', icon: <DollarSign className="w-6 h-6 mx-auto mb-1" /> },
  { label: 'Conversions', value: '1,270', icon: <DollarSign className="w-6 h-6 mx-auto mb-1" /> },
  { label: 'Estimated ROI', value: '4.7%', icon: <Calendar className="w-6 h-6 mx-auto mb-1" /> },
];

const mockEngagements = [
  { date: '3 May', value: 1.2 },
  { date: '4 May', value: 1.8 },
  { date: '5 May', value: 2.5 },
  { date: '6 May', value: 3.1 },
  { date: '7 May', value: 3.0 },
  { date: '8 May', value: 3.7 },
  { date: '9 May', value: 4.1 },
  { date: '10 May', value: 4.3 },
];
const mockDemographics = [
  { age: '13-17', percent: 6.7 },
  { age: '18-24', percent: 8.2 },
  { age: '25-34', percent: 20 },
  { age: '35-44', percent: 31.2 },
  { age: '45-54', percent: 22.8 },
  { age: '55-64', percent: 16.8 },
  { age: '65+', percent: 8.6 },
];
const mockCreators = [
  { name: 'Kathryn Murphy', img: '', verified: true, campaigns: 12, followers: '1.2M', engagement: 72, status: 'Accepted' },
  { name: 'Floyd Miles', img: '', verified: true, campaigns: 3, followers: '12K', engagement: 54, status: 'Accepted' },
  { name: 'Jane Cooper', img: '', verified: true, campaigns: 25, followers: '358K', engagement: 89, status: 'Accepted' },
  { name: 'Ronald Richards', img: '', verified: false, campaigns: 10, followers: '1.568', engagement: 40, status: 'Rejected' },
  { name: 'Theresa Webb', img: '', verified: true, campaigns: 8, followers: '30K', engagement: 62, status: 'Accepted' },
  { name: 'Dianne Russell', img: '', verified: false, campaigns: 3, followers: '458K', engagement: 59, status: 'Rejected' },
  { name: 'Jacob Jones', img: '', verified: false, campaigns: 0, followers: '32K', engagement: 94, status: 'Waitlist' },
];
const statusColors = {
  Accepted: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
  Waitlist: 'bg-yellow-100 text-yellow-700',
};
const statusIcons = {
  Accepted: <CheckCircle className="w-4 h-4 mr-1 text-green-500 inline" />, 
  Rejected: <XCircle className="w-4 h-4 mr-1 text-red-500 inline" />, 
  Waitlist: <Clock className="w-4 h-4 mr-1 text-yellow-500 inline" />,
};

// Slugify function for matching brand names
const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export default function CampaignAnalytics() {
  const { brandName, campaignId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');
  const [page, setPage] = useState(1);
  const pageSize = 7;
  const pageCount = Math.ceil(mockCreators.length / pageSize);
  const paginatedCreators = mockCreators.slice((page - 1) * pageSize, page * pageSize);

  // Use slugify for brand lookup
  const brand = brands.find(
    b => slugify(b.name) === decodeURIComponent(brandName || '').toLowerCase()
  );
  const campaign = brand?.campaigns?.find(c => c.id === Number(campaignId));

  if (!brand || !campaign) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-gray-500 mb-4">Campaign not found!</p>
        <Button variant="outline" onClick={() => navigate('/brand/campaigns')}>Back to Campaigns</Button>
      </div>
    );
  }

  // UGC Portfolio grid (from creator side)
  const renderUGCPortfolio = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {(brand.ugcPortfolio || []).map((item) => (
        <div key={item.id} className="relative aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer">
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="text-center text-gray-400">
              <span className="text-sm">UGC Content</span>
            </div>
            {item.type === 'video' && (
              <div className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-1"></div>
              </div>
            )}
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
    <div className="w-full">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <Link to="/brand/campaigns" className="hover:text-[#9F1D35] transition-colors">Campaigns</Link>
        <span>/</span>
        <span className="text-gray-900">{campaign.title}</span>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'analytics', label: 'Analytics' },
            { id: 'creators', label: 'Creators List' },
            { id: 'content', label: 'Content' },
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
      {activeTab === 'analytics' && (
        <div className="w-full">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {statCards.map((card) => (
              <Card key={card.label} className="flex flex-col items-center justify-center py-6 shadow-none border border-gray-100">
                <div className="mb-1 text-[#9F1D35]">{card.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                <div className="text-xs text-gray-500 mt-1">{card.label}</div>
              </Card>
            ))}
          </div>
          {/* Charts */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Engagements Line Chart (placeholder) */}
            <Card className="flex-1 p-6 rounded-2xl border border-gray-100 shadow-none">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-lg">Engagements</div>
                <select className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-600">
                  <option>Views</option>
                </select>
              </div>
              <div className="text-3xl font-bold mb-1">4.3M</div>
              <div className="text-xs text-gray-500 mb-4">Engagement</div>
              {/* Area chart */}
              <svg viewBox="0 0 300 80" className="w-full h-28">
                <defs>
                  <linearGradient id="engageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9F1D35" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#9F1D35" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline
                  fill="none"
                  stroke="#9F1D35"
                  strokeWidth="3"
                  points="0,70 40,60 80,50 120,40 160,45 200,35 240,30 280,20"
                />
                <polygon
                  fill="url(#engageGradient)"
                  points="0,80 0,70 40,60 80,50 120,40 160,45 200,35 240,30 280,20 280,80"
                />
                {mockEngagements.map((pt, i) => (
                  <circle key={i} cx={40 * i} cy={80 - pt.value * 15} r="4" fill="#9F1D35" />
                ))}
              </svg>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                {mockEngagements.map((pt) => (
                  <span key={pt.date}>{pt.date}</span>
                ))}
              </div>
              <div className="text-xs text-gray-500 text-center mt-2">Date Range</div>
            </Card>
            {/* Audience Demographics Bar Chart (placeholder) */}
            <Card className="flex-1 p-6 rounded-2xl border border-gray-100 shadow-none">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-lg">Audience Demographics</div>
                <select className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-600">
                  <option>Views</option>
                </select>
              </div>
              <div className="flex items-end gap-2 h-32 mb-2">
                {mockDemographics.map((d, i) => (
                  <div key={d.age} className="flex flex-col items-center w-8">
                    <div
                      className="bg-[#9F1D35] rounded-t-md"
                      style={{ height: `${d.percent * 1.5}px`, width: '100%' }}
                    ></div>
                    <span className="text-xs mt-1">{d.age}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                {mockDemographics.map((d) => (
                  <span key={d.age}>{d.percent}%</span>
                ))}
              </div>
              <div className="text-xs text-gray-500 text-center mt-2">Age Range</div>
            </Card>
          </div>
        </div>
      )}
      {activeTab === 'creators' && (
        <div className="w-full">
          <Card className="p-0 mb-4 border border-gray-100 shadow-none rounded-2xl overflow-hidden">
            <div className="font-semibold text-lg px-6 py-4 border-b border-gray-100">Creators Name</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 bg-gray-50">
                  <th className="py-3 px-6">Creators Name</th>
                  <th className="py-3 px-6">Campaigns Done</th>
                  <th className="py-3 px-6">Followers</th>
                  <th className="py-3 px-6">Engagement</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCreators.map((creator, idx) => (
                  <tr key={creator.name} className="border-b last:border-0">
                    <td className="py-3 px-6 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-200">
                        {creator.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                      </div>
                      <span className="font-medium text-gray-900 flex items-center gap-1">
                        {creator.name}
                        {creator.verified && <CheckCircle className="w-4 h-4 text-blue-500 ml-1" />}
                      </span>
                    </td>
                    <td className="py-3 px-6">{creator.campaigns}</td>
                    <td className="py-3 px-6">{creator.followers}</td>
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${creator.engagement >= 60 ? 'bg-green-400' : 'bg-red-400'}`}
                            style={{ width: `${creator.engagement}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-900 min-w-[30px]">{creator.engagement}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${(statusColors as any)[creator.status]}`}>{(statusIcons as any)[creator.status]}{creator.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <Pagination className="px-6 py-4 border-t border-gray-100 justify-end">
              <PaginationContent>
                <PaginationItem>
                  <button
                    type="button"
                    className={buttonVariants({ variant: page === 1 ? 'ghost' : 'outline', size: 'default' }) + ' gap-1 px-2.5 sm:pl-2.5'}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    aria-label="Go to previous page"
                  >
                    <span className="sr-only">Previous</span>
                    <span aria-hidden="true">&larr;</span>
                  </button>
                </PaginationItem>
                {Array.from({ length: pageCount }, (_, i) => (
                  <PaginationItem key={i}>
                    <button
                      type="button"
                      className={buttonVariants({ variant: page === i + 1 ? 'outline' : 'ghost', size: 'icon' })}
                      aria-current={page === i + 1 ? 'page' : undefined}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <button
                    type="button"
                    className={buttonVariants({ variant: page === pageCount ? 'ghost' : 'outline', size: 'default' }) + ' gap-1 px-2.5 sm:pr-2.5'}
                    onClick={() => setPage(p => Math.min(pageCount, p + 1))}
                    disabled={page === pageCount}
                    aria-label="Go to next page"
                  >
                    <span className="sr-only">Next</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Card>
        </div>
      )}
      {activeTab === 'content' && (
        <div className="w-full">
          <Card className="p-6">{renderUGCPortfolio()}</Card>
        </div>
      )}
    </div>
  );
} 