import { FC } from "react";
import { Icons } from "../Icons";

const HNLoader: FC = () => {
  return (
    <div className="absolute bg-black/5 grid place-items-center inset-0">
      <Icons.Loader2 className="w-5 h-5 animate-spin" />
    </div>
  );
}

export default HNLoader;