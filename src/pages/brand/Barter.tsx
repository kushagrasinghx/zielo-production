import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Clipboard, Trash2 } from 'lucide-react';

// Mock campaigns (replace with real data as needed)
const mockCampaigns = [
  'Product Demo for New Moisturizer',
  'Night Cream Routine',
  'Skincare Shelfie',
  'Eco-Friendly Makeup Tutorial',
  'Makeup Bag Essentials',
];

// Coupon data type
interface Coupon {
  id: number;
  productName: string;
  productDescription: string;
  code: string;
  assignedCampaign?: string;
}

const initialCoupons: Coupon[] = [
  {
    id: 1,
    productName: 'Skincare Cream',
    productDescription:
      'It has survived not only five centuries, but also the leap into electronic typesetting.',
    code: 'NYK500OFF',
  },
  {
    id: 2,
    productName: 'Skincare Cream',
    productDescription:
      'It has survived not only five centuries, but also the leap into electronic typesetting.',
    code: 'FLT250FF',
  },
  {
    id: 3,
    productName: 'Skincare Cream',
    productDescription:
      'It has survived not only five centuries, but also the leap into electronic typesetting.',
    code: 'FLT150FF',
  },
  {
    id: 4,
    productName: 'Skincare Cream',
    productDescription:
      'It has survived not only five centuries, but also the leap into electronic typesetting.',
    code: 'BMSMOVIE100',
  },
];

const Barter: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState<{ open: boolean; couponId: number | null }>({ open: false, couponId: null });
  const [newCoupon, setNewCoupon] = useState({ code: '', productName: '', productDescription: '' });
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [confirmUnassign, setConfirmUnassign] = useState<{ open: boolean; couponId: number | null }>({ open: false, couponId: null });
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; couponId: number | null }>({ open: false, couponId: null });

  // Filter coupons by search
  const filteredCoupons = coupons.filter((c) =>
    c.productName.toLowerCase().includes(search.toLowerCase()) ||
    c.productDescription.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  // Add coupon handler
  const handleAddCoupon = () => {
    setCoupons([
      ...coupons,
      {
        id: coupons.length + 1,
        productName: newCoupon.productName,
        productDescription: newCoupon.productDescription,
        code: newCoupon.code,
      },
    ]);
    setNewCoupon({ code: '', productName: '', productDescription: '' });
    setAddOpen(false);
  };

  return (
    <div className="space-y-6 w-full">
      <p className="text-sm text-muted-foreground mb-2">Welcome to your brand barter deals. Here you can manage barter deals and exchanges.</p>
      <div className="flex items-center justify-between mb-4 gap-2">
        <Input
          placeholder="Search coupons..."
          className="max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setAddOpen(true)} variant="outline">Add Coupon</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Coupon Code</TableHead>
            <TableHead>Product Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCoupons.map((coupon, idx) => (
            <TableRow key={coupon.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell className="font-semibold">{coupon.productName}</TableCell>
              <TableCell>
                <CopiableCode code={coupon.code} />
              </TableCell>
              <TableCell>{coupon.productDescription}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {coupon.assignedCampaign ? (
                    <>
                      <span className="text-xs text-muted-foreground mb-1">Assigned: <span className="font-semibold text-[#9F1D35]">{coupon.assignedCampaign}</span></span>
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setConfirmUnassign({ open: true, couponId: coupon.id })}
                        >
                          Unassign
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setConfirmDelete({ open: true, couponId: coupon.id })}
                          className="text-red-500 hover:bg-red-50"
                          title="Delete Coupon"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAssignOpen({ open: true, couponId: coupon.id })}
                        className="border-[#9F1D35] text-[#9F1D35] hover:bg-[#fbeaec]"
                      >
                        Assign
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setConfirmDelete({ open: true, couponId: coupon.id })}
                        className="text-red-500 hover:bg-red-50"
                        title="Delete Coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Coupon Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Coupon</DialogTitle>
            <DialogDescription>Enter coupon details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Coupon Code"
              value={newCoupon.code}
              onChange={(e) => setNewCoupon((c) => ({ ...c, code: e.target.value }))}
            />
            <Input
              placeholder="Product Name"
              value={newCoupon.productName}
              onChange={(e) => setNewCoupon((c) => ({ ...c, productName: e.target.value }))}
            />
            <Input
              placeholder="Product Description"
              value={newCoupon.productDescription}
              onChange={(e) => setNewCoupon((c) => ({ ...c, productDescription: e.target.value }))}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddCoupon}>Add</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Campaign Dialog */}
      <Dialog open={assignOpen.open} onOpenChange={(open) => setAssignOpen({ open, couponId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Coupon to Campaign</DialogTitle>
            <DialogDescription>Select a campaign to assign this coupon.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {mockCampaigns.map((name) => (
              <Button
                key={name}
                variant={selectedCampaign === name ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setSelectedCampaign(name)}
              >
                {name}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (assignOpen.couponId !== null && selectedCampaign) {
                  setCoupons((prev) =>
                    prev.map((c) =>
                      c.id === assignOpen.couponId ? { ...c, assignedCampaign: selectedCampaign } : c
                    )
                  );
                }
                setAssignOpen({ open: false, couponId: null });
                setSelectedCampaign('');
              }}
              disabled={!selectedCampaign}
            >
              Assign
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unassign Confirmation Dialog */}
      <Dialog open={confirmUnassign.open} onOpenChange={(open) => setConfirmUnassign({ open, couponId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unassign Coupon</DialogTitle>
            <DialogDescription>Are you sure you want to unassign this coupon from its campaign?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmUnassign.couponId !== null) {
                  setCoupons((prev) =>
                    prev.map((c) =>
                      c.id === confirmUnassign.couponId ? { ...c, assignedCampaign: undefined } : c
                    )
                  );
                }
                setConfirmUnassign({ open: false, couponId: null });
              }}
            >
              Unassign
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDelete.open} onOpenChange={(open) => setConfirmDelete({ open, couponId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Coupon</DialogTitle>
            <DialogDescription>Are you sure you want to delete this coupon? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmDelete.couponId !== null) {
                  setCoupons((prev) => prev.filter((c) => c.id !== confirmDelete.couponId));
                }
                setConfirmDelete({ open: false, couponId: null });
              }}
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const CopiableCode: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="px-2 py-1 flex items-center gap-2 border-gray-300"
      onClick={handleCopy}
      type="button"
    >
      <Clipboard className="w-4 h-4" />
      <span>{copied ? 'Copied!' : code}</span>
    </Button>
  );
};

export default Barter; 