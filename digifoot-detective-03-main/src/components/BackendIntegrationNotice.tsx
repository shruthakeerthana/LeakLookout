
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { TrafficCone, Globe } from "lucide-react"

export const BackendIntegrationNotice = () => {
  // Check if we're in demo mode
  const isDemo = !import.meta.env.VITE_USE_REAL_API || import.meta.env.MODE === "development";

  return (
    <Alert variant="default" className="mt-2 bg-primary/20 border border-primary/30">
      {isDemo ? (
        <>
          <TrafficCone className="h-4 w-4 text-neon-cyan" />
          <AlertTitle className="text-neon-cyan font-bold">Demo Mode</AlertTitle>
          <AlertDescription className="text-sm text-white">
            This is a front-end demo using simulated API responses. For full functionality, add your API keys in the Supabase dashboard.
          </AlertDescription>
        </>
      ) : (
        <>
          <Globe className="h-4 w-4 text-green-400" />
          <AlertTitle className="text-green-400 font-bold">Live API Mode</AlertTitle>
          <AlertDescription className="text-sm text-white">
            Using real-time API integrations for username search and security checks.
          </AlertDescription>
        </>
      )}
    </Alert>
  )
}
