import { FC, useState } from "react";
import { HackerNewsComment } from "../types/story-types";
import HNStoryTime from "./Story/HNStoryTime";
import HNStoryCommentCount from "./Story/HNStoryCommentCount";
import HNUsername from "./Story/HNUsername";
import { useNavigate } from "react-router-dom";
import { MinusSquare, PlusSquare } from "lucide-react";

interface HNCommentBlockProps {
  comment: HackerNewsComment;
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
    if (e.target instanceof HTMLAnchorElement) {
      e.stopPropagation();
    }
  };

  return (
    <div>
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: show ? text : minText }}
        onClick={handleArticleClick}
        onSelect={(e) => e.stopPropagation()}
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
  return (
    <div
      className="p-6 md:cursor-pointer"
      onClick={() => navigate(`/story/${comment.id}`)}
    >
      <div className="flex gap-2 mb-2">
        <HNUsername author={comment.author} />
        <HNStoryTime unix={comment.created_at_i} />
      </div>
      <CommentText text={comment.text ?? ""} />
      {comment.children && (
        <div className="mt-4">
          <HNStoryCommentCount commentCount={comment.children.length} />
        </div>
      )}
    </div>
  );
};

export default HNCommentBlock;
