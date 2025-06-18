import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";

export interface CouponCardProps {
  brandName: string;
  brandCategory: string;
  brandDescription: string;
  value: number;
  points: number;
  expiry: string;
  code: string;
  owned: boolean;
  logoUrl?: string;
}

export const CouponCard: React.FC<CouponCardProps> = ({
  brandName,
  brandCategory,
  brandDescription,
  value,
  points,
  expiry,
  code,
  owned,
  logoUrl,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card
      className={`relative p-0 overflow-visible border rounded-2xl w-full h-full flex flex-col justify-between ${
        owned
          ? "bg-white text-primary border-2 border-dashed border-primary"
          : "bg-white text-[#1a222b] border-[#e2e8f0]"
      }`}
    >
      <CardHeader className="flex flex-col items-center pt-5 pb-2 px-4">
        {logoUrl ? (
          <img src={logoUrl} alt={brandName} className="w-8 h-8 rounded-full mb-2 object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mb-2 text-sm font-semibold text-gray-400">
            {brandName[0]}
          </div>
        )}
        <CardTitle className="text-sm font-semibold text-center leading-tight mb-0">{brandName}</CardTitle>
        <CardDescription className="text-xs text-center mt-0.5">{brandCategory}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="font-semibold text-xs mb-1">{brandName} {brandCategory}</div>
        <div className="text-xs mb-2 text-gray-700 leading-snug">{brandDescription}</div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span>Value: <span className="font-bold text-[#9F1D35] line-through">₹{value.toLocaleString()}</span></span>
          <span>Points: <span className="font-bold">{points}</span></span>
        </div>
        <div className="text-xs text-muted-foreground mb-2">Expires: {expiry}</div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 px-4 pb-4">
        {owned ? (
          <div className="w-full flex flex-col items-center gap-2">
            <Button
              variant="secondary"
              className="w-full bg-[#ffe9ec] text-[#9F1D35] font-medium text-xs cursor-pointer border border-[#f3cdd3] hover:bg-[#9F1D35] hover:text-white py-1.5 px-2 rounded-md"
              size="sm"
              onClick={handleCopy}
            >
              <span className="flex items-center gap-2">
                <Clipboard className="w-4 h-4" />
                {copied ? "Copied!" : code}
              </span>
            </Button>
          </div>
        ) : (
          <Button
            variant="default"
            className="w-full text-xs font-medium py-1.5 px-2 rounded-md"
            size="sm"
          >
            Buy Coupon
          </Button>
        )}
      </CardFooter>
      {owned && (
        <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">Owned</span>
      )}
    </Card>
  );
}; 