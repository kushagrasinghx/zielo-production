import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, DollarSign, X, Edit3, Pause, Trash2, Copy } from 'lucide-react';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { brands } from '../../data/brands';
import type { Campaign } from '../../data/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

const getFormatIcon = (format: string) => {
  switch (format) {
    case 'Instagram Reel':
    case 'Instagram Post':
    case 'Instagram Story':
    case 'Instagram Carousel':
    case 'Reels':
    case 'Posts':
    case 'Stories':
      return <FaInstagram color="#9F1D35" size={18} />;
    case 'YouTube Video':
    case 'YouTube Short':
      return <FaYoutube color="#9F1D35" size={18} />;
    case 'TikTok Video':
    case 'TikTok':
      return <FaTiktok color="#9F1D35" size={18} />;
    default:
      return <DollarSign size={14} />;
  }
};

const getEngagementColor = (rating: number) => {
  if (rating >= 4.7) return 'bg-green-500';
  if (rating >= 4.5) return 'bg-green-400';
  if (rating >= 4.3) return 'bg-red-400';
  return 'bg-red-500';
};

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const BrandCampaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    format: 'all',
    dateRange: 'all',
    budget: 'all',
  });
  const navigate = useNavigate();

  // Flatten all campaigns from all brands
  const allCampaigns: (Campaign & { brandName: string; status: string })[] = brands.flatMap((brand) =>
    (brand.campaigns || []).map((c) => ({ ...c, brandName: brand.name, status: 'Active' }))
  );

  // Tabs
  const tabs = [
    { id: 'all', label: 'Active', count: allCampaigns.filter((c) => c.status === 'Active').length },
    { id: 'archived', label: 'Archived', count: 0 },
  ];

  // Filtering logic for DataTable
  const filteredCampaigns = useMemo(() => {
    return allCampaigns.filter((campaign) => {
      const matchesSearch =
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.brandName.toLowerCase().includes(searchQuery.toLowerCase());
      if (filters.status !== 'all' && campaign.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
      if (filters.format !== 'all' && campaign.type !== filters.format) {
        return false;
      }
      // Budget filter (using coins as a proxy)
      if (filters.budget !== 'all') {
        if (filters.budget === 'low' && campaign.coins >= 250) return false;
        if (filters.budget === 'medium' && (campaign.coins < 250 || campaign.coins >= 400)) return false;
        if (filters.budget === 'high' && campaign.coins < 400) return false;
      }
      return matchesSearch;
    });
  }, [allCampaigns, searchQuery, filters]);

  // Minimal pagination logic (must come after filteredCampaigns)
  const [page, setPage] = useState(1);
  const pageSize = 10; // or any number you want
  const pageCount = Math.ceil(filteredCampaigns.length / pageSize);
  const paginatedCampaigns = filteredCampaigns.slice((page - 1) * pageSize, page * pageSize);

  // DataTable columns
  const columns = useMemo<ColumnDef<Campaign & { brandName: string; status: string }>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Campaign Name',
        cell: ({ row }) => (
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => navigate(`/brand/campaigns/${slugify(row.original.brandName)}/${row.original.id}`)}
          >
            {row.original.title}
          </Button>
        ),
      },
      {
        accessorKey: 'brandName',
        header: 'Brand',
        cell: ({ row }) => row.original.brandName,
      },
      {
        accessorKey: 'type',
        header: 'Format / Medium',
        cell: ({ row }) => (
          <div className="flex items-center gap-2 flex-wrap">
            {getFormatIcon(row.original.type)}
            <span>{row.original.type}</span>
          </div>
        ),
      },
      {
        accessorKey: 'deadline',
        header: 'Deadline',
        cell: ({ row }) => row.original.deadline,
      },
      {
        accessorKey: 'creatorsNeeded',
        header: 'Creators Needed',
        cell: ({ row }) => row.original.creatorsNeeded,
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
              <div
                className={`h-2 rounded-full ${getEngagementColor(row.original.rating)}`}
                style={{ width: `${Math.min(row.original.rating * 20, 100)}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-900 min-w-[35px]">{row.original.rating}</span>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: () => (
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Active
          </span>
        ),
      },
      {
        id: 'actions',
        header: 'Action',
        cell: () => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" title="Edit">
              <Edit3 size={16} />
            </Button>
            <Button variant="ghost" size="icon" title="Pause">
              <Pause size={16} />
            </Button>
            <Button variant="ghost" size="icon" title="Duplicate">
              <Copy size={16} />
            </Button>
            <Button variant="ghost" size="icon" title="Delete">
              <Trash2 size={16} />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // DataTable setup
  const table = useReactTable({
    data: filteredCampaigns,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {},
  });

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter((value) => value !== 'all').length;
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const resetFilters = () => {
    setFilters({ status: 'all', format: 'all', dateRange: 'all', budget: 'all' });
  };

  const clearSearch = () => setSearchQuery('');

  return (
    <>
      <div className="font-sans space-y-6">
        {/* Tabs and Create Campaign */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#9F1D35] text-[#9F1D35]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
            <Button className="ml-4 flex items-center gap-2 bg-[#9F1D35] hover:bg-[#8a1a2e]" size="sm">
              <Plus size={20} />
              Create Campaign
            </Button>
            <Button className="ml-2 flex items-center gap-2 bg-gray-100 text-[#9F1D35] hover:bg-gray-200 border border-[#9F1D35]" size="sm" onClick={() => navigate('/brand/non-campaign-feed')}>
              Non Campaign Feed
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilterPopup(true)}
            className="flex items-center gap-2"
          >
            <Filter size={20} />
            Filter
            {getActiveFiltersCount() > 0 && (
              <span className="bg-[#9F1D35] text-white text-xs px-1.5 py-0.5 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </Button>
        </div>

        {/* Active Filters Display */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {Object.entries(filters).map(([key, value]) => {
              if (value === 'all') return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#fce8ec] text-[#9F1D35] text-sm rounded-full"
                >
                  {key}: {value}
                  <button
                    onClick={() => handleFilterChange(key, 'all')}
                    className="hover:bg-[#9F1D35] hover:text-white rounded-full p-0.5 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              );
            })}
            <button
              onClick={resetFilters}
              className="text-sm text-[#9F1D35] hover:text-[#8a1a2e] font-medium"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {paginatedCampaigns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center text-muted-foreground py-8">
                      No campaigns found.
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {/* Minimal Pagination */}
          <div className="flex items-center justify-center gap-2 py-4">
            <button
              type="button"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border bg-white text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? 'page' : undefined}
                className={`px-3 py-1 rounded border ${page === i + 1 ? 'bg-[#9F1D35] text-white' : 'bg-white text-gray-700'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage(p => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              className="px-3 py-1 rounded border bg-white text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Filter Popup */}
      {showFilterPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm bg-white/10"
            onClick={() => setShowFilterPopup(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Filter Campaigns</h2>
              <button
                onClick={() => setShowFilterPopup(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Filter Options */}
            <div className="space-y-6">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Format Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Format</label>
                <select
                  value={filters.format}
                  onChange={(e) => handleFilterChange('format', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent"
                >
                  <option value="all">All Formats</option>
                  <option value="Instagram Reel">Instagram Reel</option>
                  <option value="Instagram Post">Instagram Post</option>
                  <option value="Instagram Story">Instagram Story</option>
                  <option value="YouTube Video">YouTube Video</option>
                  <option value="YouTube Short">YouTube Short</option>
                  <option value="TikTok Video">TikTok Video</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Budget Range</label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Budgets' },
                    { value: 'low', label: 'Under 250 coins' },
                    { value: 'medium', label: '250 - 400 coins' },
                    { value: 'high', label: 'Above 400 coins' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="budget"
                        value={option.value}
                        checked={filters.budget === option.value}
                        onChange={(e) => handleFilterChange('budget', e.target.value)}
                        className="w-4 h-4 text-[#9F1D35] focus:ring-[#9F1D35]"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex-1"
              >
                Reset All
              </Button>
              <Button
                onClick={() => setShowFilterPopup(false)}
                className="flex-1 bg-[#9F1D35] text-white hover:bg-[#8a1a2e]"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrandCampaigns; 