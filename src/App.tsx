import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@/firebase';
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import Layout from './layout';
import { PageTitle } from './components/PageTitle';
import { DashboardLoader } from './components/DashboardLoader';
import NewUser from './pages/NewUser.tsx';
import { BrandLayout } from './layout';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Lazy load creator pages
const CreatorAllBrands = lazy(() => import('./pages/creator/AllBrands'));
const CreatorBrandCollaborate = lazy(() => import('./pages/creator/BrandCollaborate'));
const CollaborationStatus = lazy(() => import('./pages/creator/CollaborationStatus'));
const Coupon = lazy(() => import('./pages/creator/Coupon'));
const CouponHistory = lazy(() => import('./pages/creator/CouponHistory'));
const Affiliate = lazy(() => import('./pages/creator/Affiliate'));
const Settings = lazy(() => import('./pages/creator/Settings'));
// Lazy load brand pages
const BrandDashboard = lazy(() => import('./pages/brand/BrandDashboard'));
const BrandCampaigns = lazy(() => import('./pages/brand/Campaigns'));
const BrandAnalytics = lazy(() => import('./pages/brand/Analytics'));
const BrandBarter = lazy(() => import('./pages/brand/Barter'));
const BrandAffiliate = lazy(() => import('./pages/brand/Affiliate'));
const BrandWallet = lazy(() => import('./pages/brand/Wallet'));
const BrandSettings = lazy(() => import('./pages/brand/Settings'));

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [checkingUserType, setCheckingUserType] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch userType from Firestore after login
  useEffect(() => {
    const fetchUserType = async () => {
      if (user) {
        setCheckingUserType(true);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.userType) {
            setUserType(data.userType);
            localStorage.setItem('userType', data.userType);
          } else {
            setUserType(null);
            localStorage.removeItem('userType');
          }
        } else {
          setUserType(null);
          localStorage.removeItem('userType');
        }
        setCheckingUserType(false);
      }
    };
    fetchUserType();
  }, [user]);

  if (loading || checkingUserType) {
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

  // Only show onboarding if user is logged in and userType is missing
  if (user && !userType && location.pathname !== '/new-user') {
    return <Navigate to="/new-user" replace />;
  }

  // If userType exists, never show onboarding again
  if (user && userType && location.pathname === '/new-user') {
    return <Navigate to="/" replace />;
  }

  if (user && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <PageTitle />
      <Routes>
        <Route path="/login" element={
          <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
              <a href="#" className="flex items-center gap-2 self-center font-medium">
                <img src="/logo.png" alt="Zielo Logo" className="size-6" />
                Zielo
              </a>
              {showSignup ? (
                <SignupForm onSwitchToLogin={() => setShowSignup(false)} onSignupSuccess={() => setUserType(null)} />
              ) : (
                <LoginForm onSwitchToSignup={() => setShowSignup(true)} />
              )}
            </div>
          </div>
        } />
        <Route path="/new-user" element={<NewUser />} />
        {/* Brand routes */}
        {user && userType === 'brand' && (
          <Route
            path="/*"
            element={
              <BrandLayout user={user}>
                <Suspense fallback={<DashboardLoader />}>
                  <Routes>
                    <Route path="/" element={<BrandDashboard />} />
                    <Route path="/brand-dashboard" element={<BrandDashboard />} />
                    <Route path="/brand-campaigns" element={<BrandCampaigns />} />
                    <Route path="/brand-analytics" element={<BrandAnalytics />} />
                    <Route path="/brand-barter" element={<BrandBarter />} />
                    <Route path="/brand-affiliate" element={<BrandAffiliate />} />
                    <Route path="/brand-wallet" element={<BrandWallet />} />
                    <Route path="/brand-settings" element={<BrandSettings />} />
                    <Route path="*" element={<BrandDashboard />} />
                  </Routes>
                </Suspense>
              </BrandLayout>
            }
          />
        )}
        {/* Creator routes */}
        {user && userType !== 'brand' && (
          <Route
            path="/*"
            element={
              <Layout user={user}>
                <Suspense fallback={<DashboardLoader />}>
                  <Routes>
                    <Route path="/" element={<CreatorAllBrands />} />
                    <Route path="/brand/:brandName" element={<CreatorBrandCollaborate />} />
                    <Route path="/collaboration" element={<CollaborationStatus />} />
                    <Route path="/coupon" element={<Coupon />} />
                    <Route path="/coupon-history" element={<CouponHistory />} />
                    <Route path="/affiliate" element={<Affiliate />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<CreatorAllBrands />} />
                  </Routes>
                </Suspense>
              </Layout>
            }
          />
        )}
      </Routes>
    </>
  );
}

export default App;