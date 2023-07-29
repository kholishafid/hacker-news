import { MessageSquare } from "lucide-react";

const HNStoryCommentCount = ({ commentCount }: { commentCount: number }) => {
  return (
    <div
      className="text-xs flex items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <MessageSquare className="w-4 h-4 mr-1" />
      <span>{commentCount} reply</span>
    </div>
  );
};

export default HNStoryCommentCount;
