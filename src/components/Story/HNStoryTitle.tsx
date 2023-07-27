import { FC } from "react";
import { cn } from "../../lib/utils";

interface HNStoryTitleProps {
  title: string;
  url?: string;
  className?: string;
}

const HNStoryTitle: FC<HNStoryTitleProps> = ({ url, title, className }) => {
  return (
    <>
      {url ? (
        <a
          href={url}
          target="_blank"
          onClick={(e) => e.stopPropagation()}
          className={cn([
            "group text-gray-800 text-lg mb-1 inline hover:underline underline-offset-2 decoration-2 w-fit",
            className,
          ])}
        >
          {title}
        </a>
      ) : (
        <span onClick={(e) => e.stopPropagation()} className="flex gap-2 group">
          {title}
        </span>
      )}
    </>
  );
};

export default HNStoryTitle;
