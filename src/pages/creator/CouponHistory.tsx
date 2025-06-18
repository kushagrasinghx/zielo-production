import { CouponCard } from "@/components/CouponCard";
import { useNavigate } from "react-router-dom";

export default function CouponHistory() {
  const navigate = useNavigate();
  // Only show owned coupons
  const ownedCoupons = [
    {
      brandName: "EverEm",
      brandCategory: "SKINCARE",
      brandDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      value: 500,
      points: 50,
      expiry: "31 Dec 2025",
      code: "NYK500OFF",
      owned: true,
      logoUrl: undefined,
    },
    {
      brandName: "GlowPro",
      brandCategory: "Beauty",
      brandDescription: "Sample description for GlowPro.",
      value: 800,
      points: 80,
      expiry: "31 Dec 2025",
      code: "GLOW800",
      owned: true,
      logoUrl: undefined,
    },
    {
      brandName: "EcoHome",
      brandCategory: "Home",
      brandDescription: "Sample description for EcoHome.",
      value: 600,
      points: 60,
      expiry: "31 Dec 2025",
      code: "ECO600",
      owned: true,
      logoUrl: undefined,
    },
  ];

  return (
    <div className="space-y-2 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <button 
          onClick={() => navigate('/coupon')} 
          className="hover:text-[#9F1D35] transition-colors"
        >
          Coupon
        </button>
        <span>›</span>
        <span className="text-gray-900">Coupon History</span>
      </div>
      {/* Responsive grid for coupons */}
      <div className="flex w-full">
        <div className="grid gap-6 pt-2 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {ownedCoupons.map((coupon, idx) => (
            <div key={idx} className="w-full h-full flex flex-col">
              <CouponCard {...coupon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 