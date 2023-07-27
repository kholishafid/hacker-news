import { Coffee } from "lucide-react";

const HNStoryPoints = ({ points }: { points: number }) => {
  return (
    <div className="text-xs flex gap-1 items-center">
      <Coffee className="w-4 h-4" />
      <span>{points}</span>
    </div>
  );
};

export default HNStoryPoints;
