import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Target } from "lucide-react";
import svg1158 from "@/assets/svg1158.png";

// Mock Data
const topProducts = [
  { name: "Vitamin C Serum", units: 1200, revenue: 960000 },
  { name: "Herbal Face Wash", units: 950, revenue: 570000 },
  { name: "Organic Hair Oil", units: 780, revenue: 468000 },
  { name: "Aloe Vera Gel", units: 640, revenue: 384000 },
];

const purchases = [
  { id: 1, customer: "Wanderlust Adventures", product: "Face Serum", date: "May 6 2025 | 04:27 PM", amount: 1299 },
  { id: 2, customer: "Tech Innovations", product: "Hair Oil", date: "May 6 2025 | 04:27 PM", amount: 720 },
  { id: 3, customer: "NutriWell Foods", product: "Face Serum", date: "May 6 2025 | 04:27 PM", amount: 850 },
  { id: 4, customer: "EverEm Skincare", product: "Herbal Face Wash", date: "May 6 2025 | 04:27 PM", amount: 1000 },
  { id: 5, customer: "Prestige", product: "Face Serum", date: "May 6 2025 | 04:27 PM", amount: 1500 },
  { id: 6, customer: "QuillPen", product: "Hair Oil", date: "May 6 2025 | 04:27 PM", amount: 600 },
  { id: 7, customer: "India Premium", product: "Herbal Face Wash", date: "May 6 2025 | 04:27 PM", amount: 450 },
  { id: 8, customer: "Enigma", product: "Face Serum", date: "May 6 2025 | 04:27 PM", amount: 900 },
  { id: 9, customer: "CreativeB", product: "Hair Oil", date: "May 6 2025 | 04:27 PM", amount: 599 },
  { id: 10, customer: "CreativeA", product: "Herbal Face Wash", date: "May 6 2025 | 04:27 PM", amount: 349 },
  { id: 11, customer: "NextGen", product: "Face Serum", date: "May 6 2025 | 04:27 PM", amount: 1100 },
  { id: 12, customer: "BrandX", product: "Hair Oil", date: "May 6 2025 | 04:27 PM", amount: 800 },
];

const PAGE_SIZE = 10;

export default function Affiliate() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [targetDialogOpen, setTargetDialogOpen] = useState(false);

  // Filtered and paginated purchases
  const filteredPurchases = purchases.filter(
    (p) =>
      p.customer.toLowerCase().includes(filter.toLowerCase()) ||
      p.product.toLowerCase().includes(filter.toLowerCase())
  );
  const pageCount = Math.ceil(filteredPurchases.length / PAGE_SIZE);
  const paginatedPurchases = filteredPurchases.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Earnings mock
  const totalEarnings = 136000;
  const totalRevenue = 843000;
  const earningsChange = 0.016; // +1.6%

  return (
    <div className="space-y-6 w-full max-w-screen mx-auto">
      <p className="text-sm text-muted-foreground">Manage your affiliate program and track performance.</p>
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
        {/* Top Sold Products */}
        <Card className="w-full min-h-[280px]">
          <CardHeader>
            <CardTitle className="text-base">Top Sold Products</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-4 md:px-6 pb-4">
            <div className="overflow-x-auto w-full min-w-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Total Units Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((prod) => (
                    <TableRow key={prod.name}>
                      <TableCell>{prod.name}</TableCell>
                      <TableCell>{prod.units.toLocaleString()}</TableCell>
                      <TableCell>
                        ₹{prod.revenue.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        {/* Total Earnings */}
        <Card className="w-full min-h-[280px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="w-full flex flex-col items-center">
              <CardTitle className="text-base">Total Earnings</CardTitle>
              <CardDescription className="mt-2 text-3xl font-bold text-foreground">
                ₹{totalEarnings.toLocaleString()}
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium text-xs">
                  +{(earningsChange * 100).toFixed(2)}% from last month
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Total Revenue: <span className="font-semibold text-foreground">₹{totalRevenue.toLocaleString()}</span>
              </div>
              <img
                src={svg1158}
                alt="Earnings Illustration"
                className="w-40 h-30 md:w-60 md:h-40 object-contain mt-4 mx-auto"
              />
            </div>
          </CardHeader>
        </Card>
        {/* Target Card */}
        <Card className="flex h-full w-full min-h-[280px]">
          <CardHeader className="flex flex-1 flex-col items-center justify-center text-center h-full w-full">
            <Target className="w-8 h-8 text-[#A32035] mb-2" />
            <CardTitle className="text-base mb-1">Set your Sales Target</CardTitle>
            <CardDescription>
              Unlock exciting rewards by reaching your custom milestone.
            </CardDescription>
            <Dialog open={targetDialogOpen} onOpenChange={setTargetDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 bg-[#A32035] hover:bg-[#8a1a2b] text-white font-medium rounded-md px-4 py-2 text-sm w-full max-w-xs">
                  Set Target Now
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-xs sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Set Your Sales Target</DialogTitle>
                  <DialogDescription>
                    Enter your custom sales target to unlock rewards!
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <Label htmlFor="target">Target Amount (₹)</Label>
                  <Input id="target" type="number" placeholder="Enter amount" className="w-full" />
                </div>
                <DialogFooter>
                  <Button onClick={() => setTargetDialogOpen(false)} type="submit" className="bg-[#A32035] hover:bg-[#8a1a2b] text-white font-medium rounded-md px-4 py-2 text-sm w-full">
                    Save Target
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
        </Card>
      </div>

      {/* Purchases Table */}
      <div className="bg-white rounded-xl border shadow-sm p-2 sm:p-4 md:p-6 w-full overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 w-full">
          <h2 className="font-semibold text-lg text-foreground">Purchases</h2>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Input
              placeholder="Filter by customer or product..."
              value={filter}
              onChange={(e) => {
                setPage(1);
                setFilter(e.target.value);
              }}
              className="w-full md:w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto w-full min-w-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Purchase Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPurchases.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No purchases found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedPurchases.map((purchase, idx) => (
                  <TableRow key={purchase.id}>
                    <TableCell>{(page - 1) * PAGE_SIZE + idx + 1}</TableCell>
                    <TableCell>{purchase.customer}</TableCell>
                    <TableCell>{purchase.product}</TableCell>
                    <TableCell>{purchase.date}</TableCell>
                    <TableCell>₹{purchase.amount.toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
        <div className="mt-4 flex justify-end w-full">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-disabled={page === 1}
                  tabIndex={page === 1 ? -1 : 0}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {[...Array(pageCount)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {pageCount > 3 && page < pageCount - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  aria-disabled={page === pageCount}
                  tabIndex={page === pageCount ? -1 : 0}
                  className={page === pageCount ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
