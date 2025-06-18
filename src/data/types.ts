export interface Campaign {
  id: number;
  title: string;
  type: string;
  category: string;
  niche: string;
  rating: number;
  description: string;
  deadline: string;
  creatorsNeeded: number;
  requirements: string[];
  guidelines: string[];
  coins: number;
}

export interface UGCContent {
  id: number;
  creator: string;
  likes: string;
  comments: string;
  type: 'video' | 'image';
  thumbnail: string;
  gradient: string;
}

export interface Brand {
  name: string;
  description: string;
  rating: number;
  categories: string[];
  activeCampaigns: number;
  imageUrl?: string;
  logo?: string;
  brandStory?: string;
  brandVoice?: string;
  targetAudience?: string;
  campaigns?: Campaign[];
  ugcPortfolio?: UGCContent[];
} 