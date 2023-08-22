import { FC } from "react";
import { CommentText } from "../HNCommentBlock";
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
      {text && (
        <div className="mt-2">
          <CommentText text={text} />
        </div>
      )}
    </>
  );
};

export default HNStoryBody;
