import { BrandCard } from "@/components/BrandCard";
import { brands } from "@/data/brands";
import { useState } from "react";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FilterState = {
  collaborationTypes: string[];
  niches: string[];
  ugcTypes: string[];
  locations: string[];
};

export default function AllBrands() {
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    collaborationTypes: [],
    niches: [],
    ugcTypes: [],
    locations: [],
  });

  const collaborationTypeOptions = [
    "Product Gifting",
    "Paid",
    "Commission-Based",
  ];
  const nicheOptions = [
    "Beauty",
    "Tech",
    "Wellness",
    "Fashion",
    "Food & Beverage",
    "Fitness",
    "Home & Decor",
  ];
  const ugcTypeOptions = [
    "Stories",
    "Reels",
    "Product Demo",
    "Review",
    "Unboxing",
    "How-To/Tutorial",
  ];
  const locationOptions = [
    "USA",
    "India",
    "Europe",
    "Asia",
    "Other",
  ];

  const handleFilterClick = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  const handleCheckbox = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const arr = prev[category];
      return {
        ...prev,
        [category]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Manage and view all brands here.
          </p>
        </div>
        <SearchAndFilter
          searchValue={search}
          onSearchChange={setSearch}
          onFilterClick={handleFilterClick}
        />
      </div>

      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="right" className="max-w-sm w-full p-0 sm:p-0">
          <SheetHeader className="p-4 pb-2 border-b">
            <SheetTitle>Filter Brands</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 space-y-8 max-h-[calc(100vh-64px)] min-h-0">
            <div>
              <Label className="mb-2 block">Collaboration Type</Label>
              <div className="flex flex-col gap-2">
                {collaborationTypeOptions.map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.collaborationTypes.includes(type)}
                      onChange={() => handleCheckbox("collaborationTypes", type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Niche/Industry</Label>
              <div className="flex flex-col gap-2">
                {nicheOptions.map((niche) => (
                  <label key={niche} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.niches.includes(niche)}
                      onChange={() => handleCheckbox("niches", niche)}
                    />
                    {niche}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-2 block">UGC Type</Label>
              <div className="flex flex-col gap-2">
                {ugcTypeOptions.map((ugc) => (
                  <label key={ugc} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.ugcTypes.includes(ugc)}
                      onChange={() => handleCheckbox("ugcTypes", ugc)}
                    />
                    {ugc}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Location</Label>
              <div className="flex flex-col gap-2">
                {locationOptions.map((loc) => (
                  <label key={loc} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.locations.includes(loc)}
                      onChange={() => handleCheckbox("locations", loc)}
                    />
                    {loc}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 p-4 border-t bg-background sticky bottom-0 z-10">
            <Button variant="outline" onClick={handleFilterClose} type="button" className="w-1/2">
              Close
            </Button>
            <Button onClick={handleFilterClose} type="button" className="w-1/2">
              Apply
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <div className="grid gap-6 pt-2 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {brands
          .filter((brand) =>
            brand.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((brand, index) => (
            <BrandCard key={index} {...brand} />
          ))}
      </div>
    </div>
  );
}
