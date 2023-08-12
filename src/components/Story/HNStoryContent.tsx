import { FC } from "react";
import { CommentText } from "../HNCommentBlock";
import HNBadge from "../UI/HNBadge";
import HNStoryTitle from "./HNStoryTitle";

interface HNStoryBodyProps {
  type: string;
  text?: string;
  url?: string;
  title?: string;
}

const HNStoryBody: FC<HNStoryBodyProps> = ({ type, text, title, url }) => {
  if (type === "comment") {
    return <CommentText text={text ?? ""} full={true} />;
  }

  return (
    <>
      <HNStoryTitle url={url} title={title ?? ""} className="mr-2" />
      {url && (
        <HNBadge className="group-hover:flex md:absolute left-[100%] top-0.5">
          <a href={url}>visit</a>
        </HNBadge>
      )}
      {text && (
        <div className="mt-4">
          <CommentText text={text} />
        </div>
      )}
    </>
  );
};

export default HNStoryBody;
