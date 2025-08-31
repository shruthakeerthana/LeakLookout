
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const InfoPanel = () => {
  return (
    <div className="w-full max-w-xl mx-auto my-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="how-it-works" className="border border-neon-blue/30 rounded-lg bg-cyber-dark/50 backdrop-blur-sm">
          <AccordionTrigger className="text-sm font-medium text-neon-cyan px-4 py-3">
            How does this work?
          </AccordionTrigger>
          <AccordionContent className="text-sm text-white px-4">
            <p className="mb-2">
              DigiFoot Detective demonstrates what a digital footprint analyzer would look like. In a full implementation:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>
                <span className="font-medium text-neon-blue">Username lookup:</span> Uses the Sherlock tool in the backend to find user profiles across 300+ platforms
              </li>
              <li>
                <span className="font-medium text-neon-blue">Email breach check:</span> Integrates with the HaveIBeenPwned API to detect if your email has been exposed in data breaches
              </li>
              <li>
                <span className="font-medium text-neon-blue">Exposure score:</span> Calculates your digital exposure risk based on platform presence and breach data
              </li>
            </ul>
            <p>Currently using mock data for demonstration. Try "johndoe", "janedoe", or "safeuser" (with or without "@example.com").</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
