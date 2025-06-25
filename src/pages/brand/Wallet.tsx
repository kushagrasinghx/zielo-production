import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Download,
  Filter,
  Edit,
  X,
  Search as SearchIcon,
  IndianRupee,
  Banknote,
  FileText,
  FileSpreadsheet,
  Link2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const exportOptions = [
  { value: 'csv', label: 'CSV Format', icon: <FileText className="mr-2" /> },
  { value: 'excel', label: 'Microsoft Excel', icon: <FileSpreadsheet className="mr-2" /> },
  { value: 'google', label: 'Google Sheets Integration', icon: <Link2 className="mr-2" /> },
];

const Wallet: React.FC = () => {
  const [activeTab] = useState('overview');
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [exportType, setExportType] = useState('csv');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    budgetRange: 'all',
    category: 'all',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const currentBalance = 236062;

  // Sample campaign budget data
  const campaignBudgets = [
    // ... (same as your provided array)
    { id: 1, name: 'Summer Glow-Up', budgetAssigned: 11000, spent: 9000, remaining: 3000, costPerView: 3.24, barterCoupons: 10, status: 'active', category: 'Fashion', startDate: '2025-05-01' },
    { id: 2, name: 'Diwali Launch', budgetAssigned: 8000, spent: 2000, remaining: 6000, costPerView: 2.01, barterCoupons: 8, status: 'active', category: 'Technology', startDate: '2025-04-01' },
    { id: 3, name: 'Skincare 360', budgetAssigned: 5000, spent: 3000, remaining: 2000, costPerView: 3.09, barterCoupons: 3, status: 'paused', category: 'Beauty', startDate: '2025-06-01' },
    { id: 4, name: 'Winter Wellness', budgetAssigned: 2000, spent: 1650, remaining: 350, costPerView: 1.28, barterCoupons: 2, status: 'completed', category: 'Lifestyle', startDate: '2025-03-15' },
    { id: 5, name: 'Morning Glow Ritual', budgetAssigned: 7000, spent: 1080, remaining: 5920, costPerView: 2.07, barterCoupons: 4, status: 'active', category: 'Beauty', startDate: '2025-05-01' },
    { id: 6, name: 'Festive Feels', budgetAssigned: 8000, spent: 652, remaining: 7348, costPerView: 4.36, barterCoupons: 8, status: 'active', category: 'Lifestyle', startDate: '2025-04-15' },
    { id: 7, name: 'Summer Essentials Drop', budgetAssigned: 3500, spent: 2369, remaining: 1131, costPerView: 3.10, barterCoupons: 0, status: 'active', category: 'Fashion', startDate: '2025-05-10' },
    { id: 8, name: 'Luxe Skincare Diaries', budgetAssigned: 10000, spent: 3570, remaining: 6430, costPerView: 2.38, barterCoupons: 15, status: 'draft', category: 'Beauty', startDate: '2025-05-05' },
    { id: 9, name: 'Monsoon Beauty Boost', budgetAssigned: 6500, spent: 963, remaining: 5537, costPerView: 1.93, barterCoupons: 0, status: 'active', category: 'Beauty', startDate: '2025-05-01' },
    { id: 10, name: 'Winter Wellness', budgetAssigned: 4000, spent: 748, remaining: 2048, costPerView: 3.42, barterCoupons: 4, status: 'paused', category: 'Lifestyle', startDate: '2025-04-15' },
  ];

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const resetFilters = () => {
    setFilters({ status: 'all', dateRange: 'all', budgetRange: 'all', category: 'all' });
    setSearchQuery('');
  };

  const getActiveFiltersCount = () => {
    const filterCount = Object.values(filters).filter((value) => value !== 'all').length;
    return searchQuery ? filterCount + 1 : filterCount;
  };

  const getFilteredCampaigns = () => {
    let filtered = campaignBudgets;
    if (searchQuery) {
      filtered = filtered.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.status !== 'all') {
      filtered = filtered.filter((campaign) => campaign.status === filters.status);
    }
    if (filters.dateRange !== 'all') {
      const today = new Date();
      filtered = filtered.filter((campaign) => {
        const startDate = new Date(campaign.startDate);
        const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        if (filters.dateRange === 'week' && daysDiff > 7) return false;
        if (filters.dateRange === 'month' && daysDiff > 30) return false;
        if (filters.dateRange === 'quarter' && daysDiff > 90) return false;
        return true;
      });
    }
    if (filters.budgetRange !== 'all') {
      filtered = filtered.filter((campaign) => {
        if (filters.budgetRange === 'low' && campaign.budgetAssigned >= 5000) return false;
        if (filters.budgetRange === 'medium' && (campaign.budgetAssigned < 5000 || campaign.budgetAssigned >= 10000)) return false;
        if (filters.budgetRange === 'high' && campaign.budgetAssigned < 10000) return false;
        return true;
      });
    }
    if (filters.category !== 'all') {
      filtered = filtered.filter((campaign) => campaign.category === filters.category);
    }
    return filtered;
  };

  const filteredCampaigns = getFilteredCampaigns();
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddFunds = () => {
    setShowAddFunds(true);
  };

  const handleExport = () => {
    setShowExport(true);
  };

  const handleEditCampaign = (campaign: any) => {
    // Handle edit campaign logic
    // TODO: Implement edit campaign logic
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="space-y-6 w-full">
      {/* Page Description */}
      <p className="text-sm text-muted-foreground">Welcome to your brand wallet. Here you can view and manage your wallet.</p>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Current Balance: <span className="font-semibold text-[#9F1D35] text-lg">₹{currentBalance.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddFunds} className="bg-[#9F1D35] text-white" size="sm">
            <Plus size={18} /> Add Funds
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download size={18} /> Export
          </Button>
        </div>
      </div>

      {/* Add Funds Dialog */}
      <Dialog open={showAddFunds} onOpenChange={setShowAddFunds}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Funds to Wallet</DialogTitle>
            <DialogDescription>Enter the amount and select a payment method to add funds to your wallet.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="add-amount">Amount</Label>
              <Input
                id="add-amount"
                type="number"
                min="1"
                placeholder="Enter amount (₹)"
                value={addAmount}
                onChange={e => setAddAmount(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block">Payment Method</Label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('card')}
                  className="flex items-center gap-2"
                >
                  <CreditCard size={18} /> Saved Cards
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('upi')}
                  className="flex items-center gap-2"
                >
                  <IndianRupee size={18} /> UPI
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === 'netbanking' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('netbanking')}
                  className="flex items-center gap-2"
                >
                  <Banknote size={18} /> Netbanking
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button className="bg-[#9F1D35] text-white" disabled={!addAmount || Number(addAmount) <= 0} onClick={() => setShowAddFunds(false)}>
              Add Funds
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExport} onOpenChange={setShowExport}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
            <DialogDescription>Select the format to export your wallet data.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {exportOptions.map(option => (
              <Button
                key={option.value}
                type="button"
                variant={exportType === option.value ? 'default' : 'outline'}
                className="w-full justify-start flex items-center gap-2"
                onClick={() => setExportType(option.value)}
              >
                {option.icon}
                {option.label}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button className="bg-[#9F1D35] text-white" onClick={() => setShowExport(false)}>
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 relative max-w-md">
          <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <Button variant="outline" onClick={() => setShowFilterPopup(true)} className="flex items-center gap-2">
          <Filter size={18} /> Filter
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
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#fce8ec] text-[#9F1D35] text-sm rounded-full">
              Search: {searchQuery}
              <button
                onClick={clearSearch}
                className="hover:bg-[#9F1D35] hover:text-white rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          )}
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

      {/* Campaign Budget Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Budget Assigned</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Remaining</TableHead>
            <TableHead>Cost Per View</TableHead>
            <TableHead>Barter Coupons</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCampaigns.length > 0 ? (
            currentCampaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>₹{campaign.budgetAssigned.toLocaleString()}</TableCell>
                <TableCell>₹{campaign.spent.toLocaleString()}</TableCell>
                <TableCell>₹{campaign.remaining.toLocaleString()}</TableCell>
                <TableCell>₹{campaign.costPerView}</TableCell>
                <TableCell>{campaign.barterCoupons > 0 ? `${campaign.barterCoupons} Assigned` : '0'}</TableCell>
                <TableCell>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                    campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleEditCampaign(campaign)}>
                    <Edit size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-12">
                <div className="flex flex-col items-center gap-2">
                  <SearchIcon size={24} className="text-muted-foreground" />
                  <div className="text-lg font-medium text-foreground">No campaigns found</div>
                  <div className="text-muted-foreground">Try adjusting your search or filter criteria</div>
                  <Button variant="link" onClick={resetFilters} className="text-[#9F1D35]">Clear all filters</Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Filter Dialog */}
      <Dialog open={showFilterPopup} onOpenChange={setShowFilterPopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Campaigns</DialogTitle>
            <DialogDescription>Refine your campaign list by applying filters.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Status Filter */}
            <div>
              <Label className="mb-1 block">Status</Label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            {/* Date Range Filter */}
            <div>
              <Label className="mb-1 block">Date Range</Label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
            {/* Budget Range Filter */}
            <div>
              <Label className="mb-1 block">Budget Range</Label>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Budgets' },
                  { value: 'low', label: 'Under ₹5,000' },
                  { value: 'medium', label: '₹5,000 - ₹10,000' },
                  { value: 'high', label: 'Above ₹10,000' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="budgetRange"
                      value={option.value}
                      checked={filters.budgetRange === option.value}
                      onChange={(e) => handleFilterChange('budgetRange', e.target.value)}
                      className="w-4 h-4 text-[#9F1D35] focus:ring-[#9F1D35]"
                    />
                    <span className="text-sm text-foreground">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Category Filter */}
            <div>
              <Label className="mb-1 block">Category</Label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F1D35] focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Fashion">Fashion</option>
                <option value="Beauty">Beauty</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
          </div>
          <DialogFooter className="mt-8">
            <Button variant="outline" onClick={resetFilters} className="flex-1">Reset All</Button>
            <DialogClose asChild>
              <Button className="flex-1 bg-[#9F1D35] text-white hover:bg-[#8a1a2e]">Apply Filters</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallet;
