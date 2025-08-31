
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { CircleCheck, Lock, KeyRound, CircleX } from "lucide-react";
import React from "react";

interface SecurityTipsModalProps {
  open: boolean;
  onClose: () => void;
}

const topTips = [
  {
    icon: <CircleCheck className="text-green-500 w-5 h-5" />,
    text: "Use a password manager and enable 2FA everywhere.",
  },
  {
    icon: <Lock className="text-sky-400 w-5 h-5" />,
    text: "Never reuse passwords across websites.",
  },
  {
    icon: <KeyRound className="text-yellow-400 w-5 h-5" />,
    text: "Regularly update passwords for critical accounts (email, bank, etc).",
  },
  {
    icon: <CircleX className="text-red-400 w-5 h-5" />,
    text: "Avoid clicking suspicious links or opening unknown attachments.",
  },
  {
    icon: <Lock className="text-pink-400 w-5 h-5" />,
    text: "Enable device PIN/biometrics and keep OS/apps up to date.",
  }
];

export const SecurityTipsModal: React.FC<SecurityTipsModalProps> = ({ open, onClose }) => (
  <Dialog open={open} onOpenChange={(v) => { if(!v) onClose(); }}>
    <DialogContent className="max-w-md bg-[#181825] border-2 border-[#2c2334] text-[#f8f9fa] rounded-2xl">
      <DialogHeader>
        <DialogTitle className="flex gap-2 items-center text-[#50fa7b] text-2xl glitch-text">
          <Lock className="w-6 h-6" />
          Digital Security Tips
        </DialogTitle>
      </DialogHeader>
      <div className="py-3 px-1 space-y-4">
        {topTips.map((tip, idx) => (
          <div className="flex items-center gap-3" key={idx}>
            {tip.icon}
            <span className="text-base">{tip.text}</span>
          </div>
        ))}
      </div>
      <DialogClose asChild>
        <button 
          className="mt-4 px-4 py-2 bg-[#23243a] text-[#50fa7b] rounded shadow hover:bg-[#1e1e2b] transition-colors font-semibold"
        >
          Close
        </button>
      </DialogClose>
    </DialogContent>
  </Dialog>
);
