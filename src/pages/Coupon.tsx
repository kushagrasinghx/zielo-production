import { useState } from "react";
import { CouponCard } from "@/components/CouponCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

export default function Coupon() {
  const [search, setSearch] = useState("");
  const availablePoints = 250; // This can be dynamic if needed

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between gap-2 w-full flex-row">
        {/* Available Points on the left */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Available Points:</span>
          <span className="text-base font-semibold text-[#A32035]">{availablePoints}</span>
        </div>
        {/* History button on the right */}
        <Button size="sm" className="bg-[#A32035] hover:bg-[#8a1a2b] text-white font-medium h-8 px-2 rounded-md flex items-center gap-1 text-xs">
          <History className="w-4 h-4" />
          Coupons History
        </Button>
      </div>
      {/* Responsive grid for coupons */}
      <div className="flex w-full">
        <div className="grid gap-6 pt-2 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <div className="w-full h-full flex flex-col"><CouponCard
            brandName="EverEm"
            brandCategory="SKINCARE"
            brandDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            value={500}
            points={50}
            expiry="31 Dec 2025"
            code="NYK500OFF"
            owned={true}
            logoUrl={undefined}
          /></div>
          <div className="w-full h-full flex flex-col"><CouponCard
            brandName="NutriWell"
            brandCategory="Food"
            brandDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            value={1500}
            points={150}
            expiry="31 Dec 2025"
            code="NUTRI1500"
            owned={false}
            logoUrl={undefined}
          /></div>
          <div className="w-full h-full flex flex-col"><CouponCard
            brandName="GlowPro"
            brandCategory="Beauty"
            brandDescription="Sample description for GlowPro."
            value={800}
            points={80}
            expiry="31 Dec 2025"
            code="GLOW800"
            owned={true}
            logoUrl={undefined}
          /></div>
          <div className="w-full h-full flex flex-col"><CouponCard
            brandName="FitFuel"
            brandCategory="Nutrition"
            brandDescription="Sample description for FitFuel."
            value={1200}
            points={120}
            expiry="31 Dec 2025"
            code="FIT1200"
            owned={false}
            logoUrl={undefined}
          /></div>
          <div className="w-full h-full flex flex-col"><CouponCard
            brandName="EcoHome"
            brandCategory="Home"
            brandDescription="Sample description for EcoHome."
            value={600}
            points={60}
            expiry="31 Dec 2025"
            code="ECO600"
            owned={true}
            logoUrl={undefined}
          /></div>
          <div className="w-full h-full flex flex-col"><CouponCard
            brandName="TechEase"
            brandCategory="Electronics"
            brandDescription="Sample description for TechEase."
            value={2000}
            points={200}
            expiry="31 Dec 2025"
            code="TECH2000"
            owned={false}
            logoUrl={undefined}
          /></div>
        </div>
      </div>
    </div>
  );
} 