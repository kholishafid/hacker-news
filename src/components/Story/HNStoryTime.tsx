import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Clock4 } from "lucide-react";
import { cn } from "../../lib/utils";
dayjs.extend(relativeTime);

const HNStoryTime = ({
  unix,
  className,
}: {
  unix: number;
  className?: string;
}) => {
  return (
    <div className={cn(["text-xs flex gap-1  items-center dark:text-white", className])}>
      <Clock4 className="w-3 h-3" />
      <span>{dayjs.unix(unix).fromNow()}</span>
    </div>
  );
};

export default HNStoryTime;
