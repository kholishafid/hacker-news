import { FC } from "react";
import { cn } from "../lib/utils";

interface SkeletonProps {
  className?: string
}

const Skeleton: FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={cn(['bg-black/10 animate-pulse', className])} >
    </div>
  );
}

export default Skeleton;
