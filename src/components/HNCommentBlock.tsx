import { FC, useState } from "react";
import { HackerNewsComment } from "../types/story-types";
import HNModal from "./UI/HNModal";
import HNUserDetail from "./HNUserDetail";
import HNStoryTime from "./Story/HNStoryTime";
import HNStoryCommentCount from "./Story/HNStoryCommentCount";
import HNUsername from "./Story/HNUsername";
import { useNavigate } from "react-router-dom";

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
        <span
          className="text-xs font-medium md:cursor-pointer underline "
          onClick={handleShow}
        >
          {show ? "read less" : "read more"}
        </span>
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
        <HNModal trigger={<HNUsername author={comment.author} />}>
          <HNUserDetail id={comment.author} />
        </HNModal>
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
