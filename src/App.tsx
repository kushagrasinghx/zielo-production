import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@/firebase';
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import Layout from './layout';

import AllBrands from '../src/pages/AllBrands';
import CollaborationStatus from '../src/pages/CollaborationStatus';
import Coupon from '../src/pages/Coupon';
import Affiliate from '../src/pages/Affiliate';
import Settings from '../src/pages/Settings';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#f3f5f9] font-[Segoe UI] text-[1.1rem] text-[#333]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#9F1D35] rounded-full animate-spin mb-4" />
        <p><strong>Loading your Dashboard!</strong></p>
      </div>
    );
  }

  if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (user && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
          <div className="flex w-full max-w-sm flex-col gap-6">
            <a href="#" className="flex items-center gap-2 self-center font-medium">
              <img src="/logo.png" alt="Zielo Logo" className="size-6" />
              Zielo
            </a>
            {showSignup ? (
              <SignupForm onSwitchToLogin={() => setShowSignup(false)} />
            ) : (
              <LoginForm onSwitchToSignup={() => setShowSignup(true)} />
            )}
          </div>
        </div>
      } />
      {user && (
        <Route
          path="/*"
          element={
            <Layout user={user}>
              <Routes>
                <Route path="/" element={<AllBrands />} />
                <Route path="/collaboration" element={<CollaborationStatus />} />
                <Route path="/coupon" element={<Coupon />} />
                <Route path="/affiliate" element={<Affiliate />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          }
        />
      )}
    </Routes>
  );
}

export default App;