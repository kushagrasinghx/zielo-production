import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';

// Mock UGC data for non-campaign creators
const nonCampaignUGC = [
  {
    id: 1,
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=600&q=80',
    creator: '@alexjohnson',
    likes: '1.2K',
    comments: '80',
  },
  {
    id: 2,
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=600&q=80',
    creator: '@priyapatel',
    likes: '900',
    comments: '45',
  },
  {
    id: 3,
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=600&q=80',
    creator: '@liamsmith',
    likes: '2.1K',
    comments: '110',
  },
  {
    id: 4,
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=600&q=80',
    creator: '@sophialee',
    likes: '1.5K',
    comments: '60',
  },
];

export default function NonCampaignFeed() {
  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <Link to="/brand/campaigns" className="hover:text-[#9F1D35] transition-colors">Campaigns</Link>
        <span>/</span>
        <span className="text-gray-900">Non Campaign Feed</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Non Campaign Feed</h1>
      <Card className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nonCampaignUGC.map((item) => (
            <div key={item.id} className="relative aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer">
              <img src={item.thumbnail} alt="UGC" className="w-full h-full object-cover" />
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
      </Card>
    </div>
  );
} 