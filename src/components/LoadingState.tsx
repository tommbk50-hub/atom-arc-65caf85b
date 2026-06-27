import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  label?: string;
  className?: string;
}

/**
 * Centered spinner shown while the mock data service resolves a request.
 */
export default function LoadingState({ label = "Loading…", className = "" }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-muted-foreground ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-4 text-sm font-medium">{label}</p>
    </div>
  );
}
