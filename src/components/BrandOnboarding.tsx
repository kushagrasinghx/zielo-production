import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

interface BrandOnboardingProps {
  onBackToTypeSelect: () => void;
  onComplete: (data: any) => void;
}

const BrandOnboarding: React.FC<BrandOnboardingProps> = ({ onBackToTypeSelect, onComplete }) => {
  const [step, setStep] = useState(1);
  const [website, setWebsite] = useState('');
  const [info, setInfo] = useState({ logo: '', banner: '', bio: '', socials: { insta: '', fb: '', twitter: '', youtube: '' } });
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!website) {
      setError('Please enter your brand website.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleDone = () => {
    onComplete({ website, ...info, logo: logoFile, banner: bannerFile });
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(URL.createObjectURL(file));
      setInfo({ ...info, logo: file.name });
    }
  };

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBannerFile(URL.createObjectURL(file));
      setInfo({ ...info, banner: file.name });
    }
  };

  const socialFields = [
    { key: 'insta', icon: <Instagram size={16} className="text-muted-foreground mr-2" />, placeholder: 'Instagram' },
    { key: 'fb', icon: <Facebook size={16} className="text-muted-foreground mr-2" />, placeholder: 'Facebook' },
    { key: 'twitter', icon: <Twitter size={16} className="text-muted-foreground mr-2" />, placeholder: 'Twitter' },
    { key: 'youtube', icon: <Youtube size={16} className="text-muted-foreground mr-2" />, placeholder: 'YouTube' },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-2 flex flex-col gap-4">
      <Button variant="ghost" size="sm" className="self-start mb-1 text-xs px-2 py-1" onClick={onBackToTypeSelect}>
        ← Change Category
      </Button>
      {step === 1 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3">
          <h2 className="text-base font-semibold mb-1">Setup your brand workspace</h2>
          <p className="text-muted-foreground text-xs mb-2">Enter your website link, our AI will handle the rest.</p>
          <input className="border rounded-md px-3 py-1.5 text-sm bg-muted focus:bg-white focus:border-black transition" placeholder="Brand website" value={website} onChange={e => setWebsite(e.target.value)} />
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="text-xs px-3 py-1.5" onClick={onBackToTypeSelect}>Back</Button>
            <Button size="sm" className="text-xs px-3 py-1.5" onClick={handleNext}>Next</Button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3">
          <h2 className="text-base font-semibold mb-1">Brand Info</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium mb-1">Logo</label>
              <label className="w-16 h-16 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer relative bg-muted hover:bg-gray-100">
                {logoFile ? (
                  <img src={logoFile} alt="Logo Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <ImageIcon size={20} className="text-muted-foreground" />
                )}
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleLogoChange} disabled={!editing} />
              </label>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium mb-1">Banner</label>
              <label className="w-full h-16 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer relative bg-muted hover:bg-gray-100">
                {bannerFile ? (
                  <img src={bannerFile} alt="Banner Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <ImageIcon size={20} className="text-muted-foreground" />
                )}
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleBannerChange} disabled={!editing} />
              </label>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Bio</label>
              <textarea className="border rounded-md px-3 py-1.5 text-sm bg-muted focus:bg-white focus:border-black transition" value={info.bio} onChange={e => setInfo({ ...info, bio: e.target.value })} disabled={!editing} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium">Social Media</label>
              <div className="grid grid-cols-2 gap-2">
                {socialFields.map(field => (
                  <div key={field.key} className="relative flex items-center">
                    <span className="absolute left-2">{field.icon}</span>
                    <input
                      className="border rounded-md pl-8 pr-2 py-1.5 text-sm w-full bg-muted focus:bg-white focus:border-black transition"
                      placeholder={field.placeholder}
                      value={info.socials[field.key as keyof typeof info.socials]}
                      onChange={e => setInfo({ ...info, socials: { ...info.socials, [field.key]: e.target.value } })}
                      disabled={!editing}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="text-xs px-3 py-1.5" onClick={() => setStep(1)}>Back</Button>
            {!editing ? (
              <Button variant="secondary" size="sm" className="text-xs px-3 py-1.5" onClick={() => setEditing(true)}>Edit Details</Button>
            ) : (
              <Button variant="secondary" size="sm" className="text-xs px-3 py-1.5" onClick={() => setEditing(false)}>Save Details</Button>
            )}
            <Button size="sm" className="text-xs px-3 py-1.5" onClick={handleDone}>Done</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandOnboarding; 