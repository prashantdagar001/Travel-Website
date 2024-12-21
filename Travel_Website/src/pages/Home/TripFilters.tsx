import { Search, SlidersHorizontal } from 'lucide-react';

interface TripFiltersProps {
  onSearch: (query: string) => void;
  onSortChange: (sort: string) => void;
}

export function TripFilters({ onSearch, onSortChange }: TripFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search destinations..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-gray-600" />
        <select
          className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="date-asc">Date: Soonest First</option>
          <option value="date-desc">Date: Latest First</option>
        </select>
      </div>
    </div>
  );
}