import { FC } from "react";

interface HNStoryTitleProps {
  title: string;
  url?: string;
  className?: string;
}


const HNStoryTitle: FC<HNStoryTitleProps> = ({ url, title }) => {
  if (url && url !== '') {
    return <div>
      <h1 className="mb-1">
        {title}
      </h1>
      <span className="text-sm">URL : <a href={url} target="_blank" onClick={(e) => e.stopPropagation()} className="text-blue-500 underline">{url}</a></span>
    </div>
  }

  return (
    <h1>{title}</h1>
  );
};

export default HNStoryTitle;
