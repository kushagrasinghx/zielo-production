import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa';
import { Download } from 'lucide-react';

const socialStats = [
  {
    platform: 'Facebook',
    icon: <FaFacebook color="#4267B2" size={24} />,
    handle: '@kathrynmurphy',
    followers: '500k',
    likes: '67k',
    comments: '1.5k',
    views: '2m',
  },
  {
    platform: 'Instagram',
    icon: <FaInstagram color="#E1306C" size={24} />,
    handle: '@kathrynmurphy',
    followers: '500k',
    likes: '67k',
    comments: '1.5k',
    views: '2m',
  },
  {
    platform: 'TikTok',
    icon: <FaTiktok color="#000" size={24} />,
    handle: '@kathrynmurphy01',
    followers: '500k',
    likes: '67k',
    comments: '1.5k',
    views: '2m',
  },
  {
    platform: 'YouTube',
    icon: <FaYoutube color="#FF0000" size={24} />,
    handle: '@kathrynmurphy01',
    followers: '500k',
    likes: '67k',
    comments: '1.5k',
    views: '2m',
  },
];

const tags = ['Travel', 'Adventure', 'Destinations'];

// Add mock UGC content for the creator
const ugcContent = [
  {
    id: 1,
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=600&q=80',
    creator: '@kathrynmurphy',
    likes: '2.5K',
    comments: '120',
  },
  {
    id: 2,
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=600&q=80',
    creator: '@kathrynmurphy',
    likes: '1.8K',
    comments: '95',
  },
];

export default function CreatorInfo() {
  const { brandName, campaignId, creatorName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <Link to={`/brand/campaigns/${brandName}/${campaignId}`} state={{ tab: 'creators' }} className="hover:text-[#9F1D35] transition-colors">Creators list</Link>
        <span>/</span>
        <span className="text-gray-900">Creator details</span>
      </div>

      {/* Profile Header */}
      <Card className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 mb-6 rounded-2xl border border-gray-200">
        <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src="https://ui-avatars.com/api/?name=Kathryn+Murphy&background=F3F5F9&color=9F1D35&size=96"
            alt="Kathryn Murphy"
            className="object-cover w-24 h-24 rounded-full"
            onError={e => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=User&background=F3F5F9&color=9F1D35&size=96')}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-gray-900">Kathryn Murphy</span>
            <span className="inline-block w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M9 17l-5-5 1.41-1.41L9 14.17l9.59-9.59L20 6l-11 11z" /></svg>
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <span key={tag} className="bg-[#fbeaec] text-[#9F1D35] font-medium text-xs px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <div className="text-gray-600 mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z" /><circle cx="12" cy="11" r="3" /></svg>
            New York, USA
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button className="bg-[#9F1D35] text-white flex items-center gap-2"><Download size={18} /> Download PDF</Button>
        <Button variant="outline" className="flex items-center gap-2 border border-gray-300"><FaInstagram color="#E1306C" /> Instagram Profile</Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'profile' ? 'border-[#9F1D35] text-[#9F1D35]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Summary
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'content' ? 'border-[#9F1D35] text-[#9F1D35]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('content')}
          >
            Content
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialStats.map(stat => (
            <Card key={stat.platform} className="p-6 flex flex-col gap-2 items-start">
              <div className="flex items-center gap-2 mb-2">
                {stat.icon}
                <span className="font-semibold">{stat.handle}</span>
              </div>
              <div className="text-sm text-gray-500">Followers <span className="font-bold text-gray-900 ml-1">{stat.followers}</span></div>
              <div className="text-sm text-gray-500">Avg. Likes <span className="font-bold text-gray-900 ml-1">{stat.likes}</span></div>
              <div className="text-sm text-gray-500">Avg. Comments <span className="font-bold text-gray-900 ml-1">{stat.comments}</span></div>
              <div className="text-sm text-gray-500">Avg. Views <span className="font-bold text-gray-900 ml-1">{stat.views}</span></div>
            </Card>
          ))}
        </div>
      )}
      {activeTab === 'content' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ugcContent.map((item) => (
            <div key={item.id} className="relative aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer">
              <img src={item.thumbnail} alt="UGC" className="absolute inset-0 w-full h-full object-cover" />
              {item.type === 'video' && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-1"></div>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    <span className="font-semibold">{item.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M21 6.5a2.5 2.5 0 0 0-2.5-2.5h-13A2.5 2.5 0 0 0 3 6.5v11A2.5 2.5 0 0 0 5.5 20h13a2.5 2.5 0 0 0 2.5-2.5v-11zM5.5 5h13A1.5 1.5 0 0 1 20 6.5V7H4v-.5A1.5 1.5 0 0 1 5.5 5zm13 14h-13A1.5 1.5 0 0 1 4 17.5V8h16v9.5a1.5 1.5 0 0 1-1.5 1.5z" /></svg>
                    <span className="font-semibold">{item.comments}</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-3">
                <div className="flex flex-col items-start text-white">
                  <span className="text-sm font-medium mb-2">{item.creator}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M21 6.5a2.5 2.5 0 0 0-2.5-2.5h-13A2.5 2.5 0 0 0 3 6.5v11A2.5 2.5 0 0 0 5.5 20h13a2.5 2.5 0 0 0 2.5-2.5v-11zM5.5 5h13A1.5 1.5 0 0 1 20 6.5V7H4v-.5A1.5 1.5 0 0 1 5.5 5zm13 14h-13A1.5 1.5 0 0 1 4 17.5V8h16v9.5a1.5 1.5 0 0 1-1.5 1.5z" /></svg>
                      <span>{item.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 