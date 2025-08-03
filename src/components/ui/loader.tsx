import { cn } from "@/lib/utils"

export function Loader({ className, text }: { className?: string, text?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 py-16", className)}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      {text && <p className="text-muted-foreground animate-pulse">{text}</p>}
    </div>
  );
}
