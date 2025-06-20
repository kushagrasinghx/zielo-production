import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export function DashboardLoader() {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if (progress < 90) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 90;
          return prev + 8;
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [progress]);

  return (
    <div className="flex flex-1 w-full h-full min-h-[300px] justify-center items-center font-[Segoe UI] text-[1.1rem] text-[#333]">
      <div className="w-full max-w-xs flex flex-col items-center gap-4">
        <Progress value={progress} className="w-full" />
      </div>
    </div>
  );
} 