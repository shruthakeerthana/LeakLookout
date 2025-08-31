
import React from "react";
import { Users } from "lucide-react";
type Props = { matches: { platform: string; username: string; details?: string }[] };
export const PublicBehaviorMatchesSection: React.FC<Props> = ({ matches }) => {
  if (!matches.length) return null;
  return (
    <section className="glass-card my-6 p-4">
      <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
        <Users size={20}/> {" "}Possible Impersonation / Public Behavior Matches
      </h3>
      <ul className="space-y-3">
        {matches.map((m, i) => (
          <li key={i}>
            <div className="flex items-center gap-3">
              <span className="font-bold">{m.username}</span>
              <span className="text-xs text-muted-foreground">{m.platform}</span>
            </div>
            <div className="text-xs text-muted-foreground">{m.details}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};
