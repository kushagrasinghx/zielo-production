import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { brands } from '@/data/brands';

const slugify = (str: string) =>
  str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

export const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let title = 'Zielo';
    const campaignMatch = location.pathname.match(/^\/brand\/campaigns\/([^/]+)\/(\d+)/);
    if (campaignMatch) {
      const brandSlug = campaignMatch[1];
      const campaignId = campaignMatch[2];
      const brand = brands.find(b => slugify(b.name) === brandSlug);
      const campaign = brand?.campaigns?.find(c => String(c.id) === campaignId);
      if (brand && campaign) {
        title = `Zielo - ${brand.name} - ${campaign.title}`;
      } else if (brand) {
        title = `Zielo - ${brand.name}`;
      } else {
        title = 'Zielo - Campaign Analytics';
      }
    } else {
      const path = location.pathname.split('/').pop() || 'home';
      const pageName = path.charAt(0).toUpperCase() + path.slice(1);
      title = `Zielo - ${pageName}`;
    }
    document.title = title;
  }, [location]);

  return null;
}; 