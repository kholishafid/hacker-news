import { ExternalLink } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "../../lib/utils";

const HNBadge = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn([
        "rounded-lg border px-2 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gray-600 text-white font-medium group-hover:decoration-0 hover:bg-gray-600/80 inline-flex items-center gap-1",
        className,
      ])}
    >
      <span className="text-xs py-1">{children}</span>{" "}
      <ExternalLink size={16} />
    </span>
  );
};

export default HNBadge;
