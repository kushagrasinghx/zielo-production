import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-react";

interface SearchAndFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
}

export function SearchAndFilter({
  searchValue,
  onSearchChange,
  onFilterClick,
}: SearchAndFilterProps) {
  return (
    <div className="flex items-center justify-between w-full gap-3">
      {/* Search Input with Shortcut */}
      <div className="relative w-full max-w-sm">
        <Input
          type="text"
          placeholder="Search brand..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 pl-3 pr-16 text-sm rounded-md bg-muted border border-border placeholder:text-muted-foreground focus-visible:ring-0"
        />
      </div>

      {/* Neutral Filter Button */}
      <Button
        variant="outline"
        onClick={onFilterClick}
        className="h-9 px-3 text-sm rounded-md flex items-center gap-2"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filter
      </Button>
    </div>
  );
}
