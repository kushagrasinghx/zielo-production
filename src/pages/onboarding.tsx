import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Onboarding: React.FC = () => {
  const handleChoose = (type: 'creator' | 'brand') => {
    localStorage.setItem('userType', type);
    window.location.replace('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f5f9] p-6">
      <h1 className="text-2xl font-bold mb-8 text-[#9F1D35]">Choose Your Account Type</h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl justify-center">
        <Card className="flex-1 p-6 flex flex-col items-center gap-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-[#9F1D35]">
          <CardTitle className="text-xl mb-2">Creator Account</CardTitle>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center text-gray-700">I want to collaborate with brands and earn rewards as a creator.</p>
            <Button className="bg-[#9F1D35] text-white px-6 py-2 rounded" onClick={() => handleChoose('creator')}>Continue as Creator</Button>
          </CardContent>
        </Card>
        <Card className="flex-1 p-6 flex flex-col items-center gap-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-[#9F1D35]">
          <CardTitle className="text-xl mb-2">Brand Profile</CardTitle>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center text-gray-700">I represent a brand and want to collaborate with creators.</p>
            <Button className="bg-[#9F1D35] text-white px-6 py-2 rounded" onClick={() => handleChoose('brand')}>Continue as Brand</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding; 