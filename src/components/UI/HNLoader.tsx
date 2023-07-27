import { FC } from "react";
import { Loader2 } from "lucide-react";

const HNLoader: FC = () => {
  return (
    <div className="absolute inset-0 p-6 flex justify-center">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );
};

export default HNLoader;
