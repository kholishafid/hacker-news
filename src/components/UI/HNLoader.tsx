import { FC } from "react";
import { Loader2 } from "lucide-react";

const HNLoader: FC = () => {
  return <Loader2 className="w-6 h-6 animate-spin mx-auto mt-6" />;
};

export default HNLoader;
