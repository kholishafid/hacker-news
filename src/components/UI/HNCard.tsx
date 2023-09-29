import { FC, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface HNCardProps {
  children: ReactNode
  className?: string
}

const HNCard: FC<HNCardProps> = ({ children, className }) => {
  return (
    <div className={cn(['border p-4 rounded shadow-sm', className])}>
      {children}
    </div>
  );
}

export default HNCard;
