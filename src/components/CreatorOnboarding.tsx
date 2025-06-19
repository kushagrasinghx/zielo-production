import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { brands } from '@/data/brands';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

interface CreatorOnboardingProps {
  onBackToTypeSelect: () => void;
  onComplete: (data: any) => void;
}

const socialFields = [
  { key: 'insta', icon: <Instagram size={16} className="text-muted-foreground mr-2" />, placeholder: 'Instagram' },
  { key: 'fb', icon: <Facebook size={16} className="text-muted-foreground mr-2" />, placeholder: 'Facebook' },
  { key: 'twitter', icon: <Twitter size={16} className="text-muted-foreground mr-2" />, placeholder: 'Twitter' },
  { key: 'youtube', icon: <Youtube size={16} className="text-muted-foreground mr-2" />, placeholder: 'YouTube' },
];

const CreatorOnboarding: React.FC<CreatorOnboardingProps> = ({ onBackToTypeSelect, onComplete }) => {
  const [step, setStep] = useState(1);
  const [handles, setHandles] = useState({ insta: '', fb: '', twitter: '', youtube: '' });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleValidate = () => {
    if (!handles.insta && !handles.fb && !handles.twitter && !handles.youtube) {
      setError('Please enter at least one handle or skip.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSkip = () => {
    setError('');
    setStep(2);
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const handleSave = () => {
    onComplete({ handles, selectedBrands });
  };

  return (
    <div className="w-full max-w-md mx-auto p-2 flex flex-col gap-4">
      <Button variant="ghost" size="sm" className="self-start mb-1 text-xs px-2 py-1" onClick={onBackToTypeSelect}>
        ← Change Category
      </Button>
      {step === 1 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3">
          <h2 className="text-base font-semibold mb-1">Can we get to know each other?</h2>
          <p className="text-muted-foreground text-xs mb-2">Share your social media handles (optional):</p>
          <div className="flex flex-col gap-2">
            {socialFields.map(field => (
              <div key={field.key} className="relative flex items-center">
                <span className="absolute left-2">{field.icon}</span>
                <input
                  className="border rounded-md pl-8 pr-2 py-1.5 text-sm w-full bg-muted focus:bg-white focus:border-black transition"
                  placeholder={field.placeholder}
                  value={handles[field.key as keyof typeof handles]}
                  onChange={e => setHandles({ ...handles, [field.key]: e.target.value })}
                />
              </div>
            ))}
          </div>
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="text-xs px-3 py-1.5" onClick={onBackToTypeSelect}>Back</Button>
            <Button variant="secondary" size="sm" className="text-xs px-3 py-1.5" onClick={handleSkip}>Skip for now</Button>
            <Button size="sm" className="text-xs px-3 py-1.5" onClick={handleValidate}>Validate</Button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3">
          <h2 className="text-base font-semibold mb-1">Choose brands you'd love to work with</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
            {brands.map(brand => (
              <button
                key={brand.name}
                className={`flex flex-col items-center justify-center aspect-square w-full border rounded-lg p-2 transition-all text-xs font-medium
                  ${selectedBrands.includes(brand.name)
                    ? 'border-[#9F1D35] bg-[#fbeaec]'
                    : 'border-gray-200 bg-white'} hover:border-[#9F1D35]`}
                onClick={() => handleBrandSelect(brand.name)}
                type="button"
                style={{ minHeight: '40px', minWidth: '40px' }}
              >
                <div className={`flex items-center justify-center bg-white rounded-md overflow-hidden mb-1 transition-all duration-200 ${selectedBrands.includes(brand.name) ? 'w-14 h-14' : 'w-10 h-10'}`}>
                  <img src={brand.logo} alt={brand.name} className={`${selectedBrands.includes(brand.name) ? 'w-14 h-14' : 'w-10 h-10'} object-cover transition-all duration-200`} />
                </div>
                <span>{brand.name}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="text-xs px-3 py-1.5" onClick={() => setStep(1)}>Back</Button>
            <Button size="sm" className="text-xs px-3 py-1.5" onClick={handleSave}>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorOnboarding; 