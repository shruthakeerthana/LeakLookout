
import React from "react";
import { Shield, Search } from "lucide-react";

type Props = {
  usernames: string[];
  onRescan: () => void;
  loading: boolean;
  className?: string;
};

export const DashboardTrailScan: React.FC<Props> = ({ 
  usernames, 
  onRescan, 
  loading,
  className = ""
}) => (
  <div className={`flex items-center gap-3 my-4 ${className}`}>
    <Shield className="text-neon-green" size={32}/>
    <span className="font-bold text-lg text-gradient-primary">
      {usernames.join(", ")}
    </span>
    <button
      type="button"
      className="ml-4 flex items-center gap-1 px-4 py-2 rounded bg-accent font-semibold text-accent-foreground hover:bg-primary hover:text-primary-foreground transition"
      onClick={onRescan}
      disabled={loading}
    >
      <Search className="w-4 h-4" />
      {loading ? "Scanning..." : "Re-Scan"}
    </button>
  </div>
);
