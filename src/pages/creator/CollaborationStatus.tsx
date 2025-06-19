import { brands } from '@/data/brands';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock status assignment for demo (in real app, this would come from backend/user data)
const statusMap = [
  { key: 'pending', label: 'Pending', color: 'text-[#9F1D35]', border: 'border-[#9F1D35]' },
  { key: 'approved', label: 'Approved', color: 'text-[#9F1D35]', border: 'border-[#9F1D35]' },
  { key: 'rejected', label: 'Rejected', color: 'text-[#EF4444]', border: 'border-[#EF4444]' },
  { key: 'archived', label: 'Archived', color: 'text-[#6B7280]', border: 'border-[#6B7280]' },
  { key: 'submitted', label: 'Submitted', color: 'text-[#6B7280]', border: 'border-[#6B7280]' },
];

// Assign brands to statuses for demo
const statusAssignments = brands.reduce((acc, brand, idx) => {
  const status = statusMap[idx % statusMap.length].key;
  if (!acc[status]) acc[status] = [];
  acc[status].push(brand);
  return acc;
}, {} as Record<string, typeof brands>);

export default function CollaborationStatus() {
  return (
    <div className="w-full">
      <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {statusMap.map((status, i) => (
          <div key={status.key} className="flex flex-col min-w-0">
            <div className={`border-b pb-1 mb-2 ${status.border}`}> 
              <span className={`font-semibold text-sm ${status.color}`}>{status.label} ({statusAssignments[status.key]?.length || 0})</span>
            </div>
            <div className="flex flex-col gap-4">
              {statusAssignments[status.key]?.map((brand, idx) => (
                <Card key={brand.name + idx} className="relative p-0 overflow-visible border border-[#e2e8f0] bg-white rounded-2xl w-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 px-4 pt-4 pb-2">
                      <div className="w-8 h-8 bg-[#f3f5f9] rounded-full flex items-center justify-center border border-[#e2e8f0] overflow-hidden">
                        {brand.logo ? (
                          <img src={brand.logo} alt={brand.name} className="object-cover w-full h-full" />
                        ) : (
                          <span className="text-xs font-semibold text-gray-400">{brand.name[0]}</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-yellow-500 text-xs font-medium">
                          <Star size={12} fill="#FEC84B" color="#FEC84B" className="inline-block" />
                          <span>{brand.rating}</span>
                        </div>
                        <div className="font-semibold text-xs leading-tight mb-0 text-gray-900">{brand.name}</div>
                      </div>
                    </div>
                    <CardContent className="px-4 pt-0 pb-2">
                      <div className="text-xs text-gray-700 mb-2 line-clamp-3 min-h-[48px]">{brand.description}</div>
                      <div className="flex flex-wrap gap-2">
                        {brand.categories.map((cat) => (
                          <span key={cat} className="bg-[#fbeaec] text-[#9F1D35] font-medium text-xs px-2 rounded-lg border border-[#f3cdd3]">{cat}</span>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                  <CardFooter className="flex items-center justify-between px-4 pt-0 pb-3 mt-0">
                    <span className="text-xs text-gray-400">Date: <span className="font-semibold text-gray-900">20/05/2025</span></span>
                  </CardFooter>
                  {/* Action Buttons */}
                  {status.key === 'pending' && (
                    <div className="flex gap-2 px-4 pb-4 pt-0">
                      <Button size="sm" className="flex-1 bg-[#fbeaec] text-[#9F1D35] font-medium text-xs border border-[#f3cdd3] hover:bg-[#fad7df] py-1.5 px-2">Archive</Button>
                      <Button size="sm" className="flex-1 bg-[#9F1D35] text-white hover:bg-[#8a1a2e] text-xs py-1.5 px-2">Submit</Button>
                    </div>
                  )}
                  {status.key === 'archived' && (
                    <div className="flex gap-2 px-4 pb-4 pt-0">
                      <Button size="sm" className="flex-1 bg-[#fbeaec] text-[#9F1D35] font-medium text-xs border border-[#f3cdd3] hover:bg-[#fad7df] py-1.5 px-2">Unarchive</Button>
                    </div>
                  )}
                  {status.key === 'rejected' && (
                    <div className="flex gap-2 px-4 pb-4 pt-0">
                      <Button size="sm" className="flex-1 bg-[#fbeaec] text-[#9F1D35] font-medium text-xs border border-[#f3cdd3] hover:bg-[#fad7df] py-1.5 px-2">Resubmit</Button>
                    </div>
                  )}
                </Card>
              ))}
              {(!statusAssignments[status.key] || statusAssignments[status.key].length === 0) && (
                <div className="text-xs text-gray-400 text-center py-3">No brands</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 