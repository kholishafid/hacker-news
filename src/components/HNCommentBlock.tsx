import { FC, useState } from "react";
import HNStoryTime from "./Story/HNStoryTime";
import HNStoryCommentCount from "./Story/HNStoryCommentCount";
import HNUsername from "./Story/HNUsername";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HackerNewsComment } from "../types/story-types";
import { HNStoryLoader } from "./Story/HNStory";

interface HNCommentBlockProps {
  comment: number;
}

export const CommentText = ({
  text,
  full = false,
}: {
  text: string;
  full?: boolean;
}) => {
  const [show, setShow] = useState<boolean>(full);

  const minText = text.length > 200 ? text.substring(0, 200) + "..." : text;

  const handleShow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(!show);
  };

  const handleArticleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div>
      <article
        className="prose prose-slate prose-a:text-blue-500 prose-a:font-normal dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: show ? text : minText }}
        onClick={handleArticleClick}
      ></article>
      {text.length > 200 && (
        <div
          className="text-xs md:cursor-pointer mt-1 inline-block dark:text-white"
          onClick={handleShow}
        >
          {show ?
            <span className="flex items-center w-fit font-semibold">read less </span>
            :
            <span className="flex items-center w-fit font-semibold">read more </span>
          }
        </div>
      )}
    </div>
  );
};

const HNCommentBlock: FC<HNCommentBlockProps> = ({ comment }) => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [comment],
    queryFn: () =>
      axios
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${comment}.json`
        )
        .then((res) => res.data as HackerNewsComment),
  });

  if (data === undefined || isLoading) {
    return <HNStoryLoader />
  }

  return (
    <div
      className="p-6">
      <div className="gap-2 mb-4">
        <HNUsername author={data.by} className="mb-1" />
        <HNStoryTime unix={data.time} />
      </div>
      {
        !data.deleted ? <CommentText text={data.text ?? ""} /> : '[Deleted]'
      }
      {data.kids ? (
        <div className="mt-4" onClick={() => navigate(`/story/${comment}`)} >
          <HNStoryCommentCount commentCount={data.kids.length} />
        </div>
      ) : null}
    </div>
  );
};

export default HNCommentBlock;
