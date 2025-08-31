
import React from "react";
import md5 from "md5";

interface GravatarProps {
  email: string;
  size?: number;
  className?: string;
}

export const Gravatar: React.FC<GravatarProps> = ({
  email,
  size = 96,
  className = "",
}) => {
  if (!email || !email.includes("@")) return null;

  // Generate MD5 hash of the trimmed lowercase email
  const hash = md5(email.trim().toLowerCase());
  
  // Use a default identicon if no Gravatar is found
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;

  return (
    <div className="flex flex-col items-center mb-6">
      <img
        src={gravatarUrl}
        alt="Gravatar"
        width={size}
        height={size}
        className={`rounded-full border shadow-lg ${className}`}
        style={{ background: "#eee" }}
      />
      <span className="text-xs text-muted-foreground mt-1">Profile image based on your email</span>
    </div>
  );
};
