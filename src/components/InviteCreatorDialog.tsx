import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function InviteCreatorDialog({
  trigger,
  link = "https://zielo.app/invite/creator"
}: {
  trigger: React.ReactNode;
  link?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[26rem] max-w-[26rem] p-4">
        <DialogHeader>
          <DialogTitle>Invite a Creator</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 items-center">
          <div className="w-full flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Share this link to invite a creator:</span>
            <div className="flex items-center gap-2 border rounded px-2 py-2 bg-muted">
              <span className="truncate text-xs select-all" style={{maxWidth: '120px'}}>{link}</span>
            </div>
            <Button
              size="sm"
              variant={copied ? "outline" : "default"}
              onClick={() => {
                navigator.clipboard.writeText(link);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
              className="transition-all"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteCreatorDialog; 