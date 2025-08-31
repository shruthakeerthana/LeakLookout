
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, MapPin } from "lucide-react";

interface IpInfoData {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  org?: string;
}

export const IpInfoPanel = () => {
  const [info, setInfo] = useState<IpInfoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ipinfo.io/json")
      .then((res) => res.json())
      .then((data) => {
        setInfo({
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country,
          org: data.org,
        });
      })
      .catch(() => setInfo(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="w-full max-w-xl mx-auto mb-6 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/70 border-2 shadow-md animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-3">
        <Globe className="h-6 w-6 text-yellow-500" />
        <CardTitle className="text-lg text-black dark:text-white">What your device is leaking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <CardDescription className="mb-3 text-yellow-600 dark:text-yellow-300 text-sm">
          This info is visible to every website you visit:
        </CardDescription>
        {loading ? (
          <div className="text-xs text-black dark:text-white">Detecting…</div>
        ) : info ? (
          <ul className="space-y-1 text-sm font-mono text-black dark:text-white">
            <li>
              <span className="font-semibold">IP:</span>{" "}
              <span>{info.ip}</span>
            </li>
            <li>
              <span className="font-semibold">Location:</span>{" "}
              {info.city || "?"}, {info.region || "?"}, {info.country || "?"}
            </li>
            <li>
              <span className="font-semibold">ISP/Network:</span>{" "}
              {info.org || "?"}
            </li>
          </ul>
        ) : (
          <div className="text-xs text-destructive">
            Could not detect network information.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
