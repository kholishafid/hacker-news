import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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
    <div className={cn(["text-xs flex gap-1  items-center text-neutral-600 dark:text-neutral-200", className])}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
        <path fillRule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clipRule="evenodd" />
      </svg>

      <span>{dayjs.unix(unix).fromNow()}</span>
    </div>
  );
};

export default HNStoryTime;
