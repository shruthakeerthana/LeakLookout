
import React from "react";
import { User, Link, Globe } from "lucide-react";

// Will render mock/demo content for now.
type LinkedAccount = {
  platform: string;
  username: string;
  url?: string;
  info?: string;
};

type LinkedAccountsListProps = {
  accounts: LinkedAccount[];
};

export const LinkedAccountsList: React.FC<LinkedAccountsListProps> = ({ accounts }) => {
  if (!accounts.length) return null;
  return (
    <section className="glass-card my-6 p-4">
      <h3 className="text-lg font-bold flex items-center gap-2 mb-3"><Link size={20}/>{" "}Linked Accounts & Profiles</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {accounts.map((acc, i) => (
          <li key={i} className="flex items-center gap-4 py-2 px-2 rounded border border-border/40 bg-white/20 dark:bg-accent/10">
            <Globe size={18} className="text-primary" />
            <div>
              <div className="font-semibold">{acc.platform} / {acc.username}</div>
              {acc.info && <div className="text-xs text-muted-foreground">{acc.info}</div>}
              {acc.url && (
                <a className="text-primary underline text-xs" href={acc.url} target="_blank" rel="noopener noreferrer">
                  Visit profile
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
