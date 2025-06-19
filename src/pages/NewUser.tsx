import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import creatorImg from '@/assets/creator.png';
import CreatorOnboarding from '@/components/CreatorOnboarding';
import BrandOnboarding from '@/components/BrandOnboarding';

const NewUser: React.FC = () => {
  const [selectedType, setSelectedType] = useState<null | 'creator' | 'brand'>(null);
  const [loading, setLoading] = useState<'creator' | 'brand' | null>(null);

  const handleChoose = (type: 'creator' | 'brand') => {
    setSelectedType(type);
  };

  const handleOnboardingComplete = async (onboardingData: any) => {
    setLoading(selectedType);
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && selectedType) {
      await setDoc(doc(db, 'users', user.uid), { userType: selectedType, onboarding: onboardingData }, { merge: true });
      localStorage.setItem('userType', selectedType);
      window.location.replace('/');
    } else {
      setLoading(null);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    window.location.replace('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f5f9]">
      <div className="flex items-center justify-between w-full p-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Zielo Logo" className="w-7 h-7" />
          <span className="text-lg font-bold tracking-tight text-black select-none">Zielo</span>
        </div>
        <Button variant="outline" onClick={handleLogout} className="ml-auto">Logout</Button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[70vh] md:min-h-[80vh] p-2">
        {!selectedType && (
          <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto h-full min-h-[60vh] bg-white rounded-lg shadow overflow-hidden mt-8">
            {/* Creator Side */}
            <div className="flex-1 flex flex-col justify-center items-center bg-white transition-colors duration-300 border-b md:border-b-0 md:border-r border-gray-200 py-8 px-4">
              <div className="w-full max-w-md bg-transparent shadow-none border-none flex flex-col items-center space-y-2">
                <img src={creatorImg} alt="Creator" className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] h-auto object-contain" />
                <div className="text-md font-semibold text-[#111] mt-4">Welcome Creator!</div>
                <div className="flex flex-col items-center w-full">
                  <p className="text-center text-gray-600 text-sm mb-4 max-w-[400px]">I want to collaborate with brands and earn rewards as a creator.</p>
                  <Button
                    className="bg-[#9F1D35] hover:bg-[#b32a47] text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md transition-all"
                    onClick={() => handleChoose('creator')}
                    disabled={loading === 'creator' || loading === 'brand'}
                  >
                    Continue as Creator
                  </Button>
                </div>
              </div>
            </div>
            {/* Brand Side */}
            <div className="flex-1 flex flex-col justify-center items-center bg-[#f6f6f7] transition-colors duration-300 py-8 px-4">
              <div className="w-full max-w-md bg-transparent shadow-none border-none flex flex-col items-center space-y-2">
                <div className="text-md font-medium mt-1">Brand</div>
                <div className="flex flex-col items-center w-full">
                  <p className="text-center text-gray-600 text-sm mb-4 max-w-[300px]">I represent a brand and want to collaborate with creators.</p>
                  <Button
                    className="bg-[#fbeaec] hover:bg-[#f3d3db] text-[#9F1D35] px-6 py-2 rounded-lg text-sm font-medium shadow-md border border-[#9F1D35] transition-all"
                    onClick={() => handleChoose('brand')}
                    disabled={loading === 'brand' || loading === 'creator'}
                  >
                    Continue as Brand
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedType === 'creator' && (
          <CreatorOnboarding
            onBackToTypeSelect={() => setSelectedType(null)}
            onComplete={handleOnboardingComplete}
          />
        )}
        {selectedType === 'brand' && (
          <BrandOnboarding
            onBackToTypeSelect={() => setSelectedType(null)}
            onComplete={handleOnboardingComplete}
          />
        )}
      </div>
    </div>
  );
};

export default NewUser; 