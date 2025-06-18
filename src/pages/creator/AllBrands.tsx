import { BrandCard } from "@/components/BrandCard";
import { brands } from "@/data/brands";
import { useState } from "react";
import { SearchAndFilter } from "@/components/SearchAndFilter";

export default function AllBrands() {
  const [search, setSearch] = useState("");

  const handleFilterClick = () => {
    // Optional: open filter modal
    alert("Filter clicked!");
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
