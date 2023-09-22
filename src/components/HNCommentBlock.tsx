import { FC, useState } from "react";
import HNStoryTime from "./Story/HNStoryTime";
import HNStoryCommentCount from "./Story/HNStoryCommentCount";
import HNUsername from "./Story/HNUsername";
import { useNavigate } from "react-router-dom";
import { MinusSquare, PlusSquare } from "lucide-react";
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
        className="prose prose-sm prose-a:text-blue-500 prose-a:font-normal cursor-auto"
        dangerouslySetInnerHTML={{ __html: show ? text : minText }}
        onClick={handleArticleClick}
      ></article>
      {text.length > 200 && (
        <div
          className="text-xs md:cursor-pointer mt-2"
          onClick={handleShow}
        >
          {show ?
            <span className="flex items-center border-b w-fit border-transparent hover:border-gray-400">read less <MinusSquare className='w-3.5 h-3.5 ml-1' /></span>
            :
            <span className="flex items-center border-b w-fit border-transparent hover:border-gray-400">read more <PlusSquare className='w-3.5 h-3.5 ml-1' /></span>
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
      className="p-6 md:cursor-pointer"
      onClick={() => navigate(`/story/${comment}`)}
    >
      <div className="flex gap-2 mb-2">
        <HNUsername author={data.by} />
        <HNStoryTime unix={data.time} />
      </div>
      <CommentText text={data.text ?? ""} />
      {data.kids && (
        <div className="mt-4">
          <HNStoryCommentCount commentCount={data.kids.length} />
        </div>
      )}
    </div>
  );
};

export default HNCommentBlock;
