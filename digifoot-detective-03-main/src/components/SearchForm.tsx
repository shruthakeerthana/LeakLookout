
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RocketIcon } from "lucide-react";

interface SearchFormProps {
  onSearch: (input: string) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const validateInput = (value: string): boolean => {
    // Clear previous errors
    setError("");
    
    // Empty input check
    if (!value.trim()) {
      setError("Please enter a username or email address");
      return false;
    }
    
    // Email validation if it looks like an email
    if (value.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError("Please enter a valid email address");
        return false;
      }
    }
    
    // Username validation - alphanumeric with some common symbols
    else {
      const usernameRegex = /^[a-zA-Z0-9._-]{2,30}$/;
      if (!usernameRegex.test(value)) {
        setError("Username should be 2-30 characters and contain only letters, numbers, periods, underscores, or hyphens");
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateInput(input)) {
      onSearch(input);
    }
  };

  return (
    <Card className="w-full max-w-xl glass-card animate-fade-in relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 z-0" />
      
      <CardHeader className="text-center relative z-10">
        <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
          <RocketIcon className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Digital Footprint Mirror
        </CardTitle>
        <CardDescription className="text-lg mt-2 text-foreground/80">
          Discover your online presence and security risks
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter username or email address"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-12 text-lg bg-background/50 backdrop-blur-sm border-primary/20 focus-visible:ring-primary/30 transition-all"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-lg font-medium bg-gradient-to-r from-primary via-accent to-primary hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Check Digital Footprint"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
