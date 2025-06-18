import { Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BrandCardProps {
  name: string;
  description: string;
  rating: number;
  categories: string[];
  activeCampaigns: number;
  imageUrl?: string;
}

export function BrandCard({
  name,
  description,
  rating,
  categories,
  activeCampaigns,
  imageUrl,
}: BrandCardProps) {
  return (
    <Card className="relative p-0 overflow-visible border border-[#e2e8f0] bg-white rounded-2xl w-full h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 px-6 pt-5 pb-2">
          <div className="w-8 h-8 bg-[#f3f5f9] rounded-full flex items-center justify-center border border-[#e2e8f0] overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://placehold.co/48x48?text=Logo&font=roboto&style=bold";
                }}
              />
            ) : (
              <span className="text-sm font-semibold text-gray-400">{name[0]}</span>
            )}
          </div>
          <div>
            <CardTitle className="text-sm font-semibold leading-tight mb-0">{name}</CardTitle>
            <div className="flex items-center gap-1 text-yellow-500 text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-3.5 h-3.5 inline-block">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
              <span>{rating}</span>
            </div>
          </div>
        </div>

        <CardContent className="px-6 py-2">
          <CardDescription className="text-sm leading-snug text-gray-700 mb-2">
            {description}
          </CardDescription>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className="bg-[#fbeaec] text-[#9F1D35] font-medium text-xs px-2.5 py-0.5 rounded-lg border border-[#f3cdd3]"
              >
                {cat}
              </span>
            ))}
          </div>
        </CardContent>
      </div>

      <CardFooter className="flex items-center justify-between px-6 pt-2 pb-4 mt-auto">
        <span className="text-xs font-medium text-gray-700">
          Active Campaigns:{" "}
          <span className="text-[#9F1D35] font-bold">
            {activeCampaigns.toString().padStart(2, "0")}
          </span>
        </span>
        <Link to={`/brand/${name.toLowerCase().replace(/\s+/g, '-')}`}>
          <Button
            className="bg-[#fbeaec] text-[#9F1D35] text-xs font-medium rounded-md px-4 py-1.5 hover:bg-[#9F1D35] hover:text-white border border-[#f3cdd3]"
            size="sm"
          >
            Collaborate
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
