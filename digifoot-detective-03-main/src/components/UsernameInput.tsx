
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { User, Plus, Bug, Zap } from "lucide-react";

type UsernameInputProps = {
  onSubmit: (values: { usernames: string[] }) => void;
  loading?: boolean;
};

export const UsernameInput: React.FC<UsernameInputProps> = ({ onSubmit, loading }) => {
  const [usernames, setUsernames] = useState<string[]>([""]);
  
  const updateUsername = (i: number, value: string) => {
    const updated = [...usernames];
    updated[i] = value;
    setUsernames(updated);
  };

  const addUsername = () => setUsernames(u => [...u, ""]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ usernames: usernames.filter(Boolean) });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl shadow flex flex-col gap-3">
      <div>
        <span className="font-semibold flex items-center gap-2 text-horror-bone mb-3">
          <Bug size={18} className="text-horror-toxic" />
          Username(s) <span className="text-horror-ash text-xs">(3-5 best guesses)</span>
        </span>
        {usernames.map((uname, idx) => (
          <div key={idx} className="flex items-center gap-2 mt-2 animate-fade-in" style={{animationDelay: `${idx * 0.1}s`}}>
            <Input
              placeholder={`e.g. shrutha05`}
              value={uname}
              onChange={e => updateUsername(idx, e.target.value)}
              autoComplete="off"
              className="horror-input"
            />
            {idx === usernames.length - 1 && usernames.length < 5 && (
              <button
                type="button"
                className="text-horror-toxic bg-horror-rotten/30 hover:bg-horror-rotten/50 px-2 py-1 rounded shadow-md transition-colors duration-200"
                onClick={addUsername}
                aria-label="Add another username"
              >
                <Plus size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 bg-horror-rotten hover:bg-horror-rotten/80 text-horror-bone font-bold rounded px-5 py-2 shadow-md shadow-horror-toxic/10 hover:shadow-horror-toxic/20 transition-all duration-300 flex items-center justify-center gap-2"
        disabled={loading}
      >
        <Zap size={18} className="text-horror-toxic" />
        {loading ? "Scanning..." : "Scan My Digital Shadow"}
      </button>
    </form>
  );
};
