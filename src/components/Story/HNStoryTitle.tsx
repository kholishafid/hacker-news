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
      <span className="text-sm">URL : <a href={url} className="text-blue-500 hover:underline">{url}</a></span>
    </div>
  }

  return (
    <h1>{title}</h1>
  );
};

export default HNStoryTitle;
