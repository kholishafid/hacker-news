import { FC } from "react";

interface HNStoryTitleProps {
  title: string;
  url?: string;
  className?: string;
}

const extractDomain = (url: string) => {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname;
};


const HNStoryTitle: FC<HNStoryTitleProps> = ({ url, title }) => {
  if (url && url !== '') {
    return (
      <h1 className="mb-1">
        <a href={url} target="_blank" onClick={(e) => e.stopPropagation()} className="text-neutral-900 dark:text-white hover:text-amber-500 mr-1.5 inline-flex flex-col">
          <span>{title}</span>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">({extractDomain(url)})</span>
        </a>
      </h1>
    )
  }

  return (
    <h1 className="dark:text-white">{title}</h1>
  );
};

export default HNStoryTitle;
