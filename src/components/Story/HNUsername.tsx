import { cn } from "../../lib/utils";

const HNUsername = ({
  author,
  className,
}: {
  author: string;
  className?: string;
}) => {
  return (
    <div
      className={cn([
        "flex gap-1  items-center text-neutral-600 dark:text-neutral-200",
        className,
      ])}
    >
      <span className="text-sm font-medium">{author}</span>
    </div>
  );
};

export default HNUsername;
