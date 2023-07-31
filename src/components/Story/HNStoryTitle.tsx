import { FC, MouseEvent } from "react";
import { cn } from "../../lib/utils";

interface HNStoryTitleProps {
  title: string;
  url?: string;
  className?: string;
}


const HNStoryTitle: FC<HNStoryTitleProps> = ({ url, title, className }) => {

  const handleTitleClick = (e: MouseEvent) => {
    e.stopPropagation()
    if(url) {
      window.open(url,'_blank')
    }
  }

  return (
    <>
      {url ? (
        <span
          onClick={handleTitleClick}
          className={cn([
            "group mb-1 inline hover:underline underline-offset-2 decoration-2 w-fit",
            className,
          ])}
        >
          {title}
        </span>
      ) : (
        <span className="flex gap-2 group">{title}</span>
      )}
    </>
  );
};

export default HNStoryTitle;
