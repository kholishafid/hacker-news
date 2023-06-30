import { FC, ReactNode } from "react";

interface HNCardProps {
  children: ReactNode
  className?: string
}

const HNCard: FC<HNCardProps> = ({ children, className }) => {
  return (
    <div className={`border p-4 rounded shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export default HNCard;