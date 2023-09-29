import { MessageSquare } from "lucide-react";
import { cn } from "../../lib/utils";

const HNStoryCommentCount = ({ commentCount, className }: { commentCount: number, className?: string }) => {
  return (
    <div
      className={cn(['text-xs flex items-center hover:underline w-fit cursor-pointer', className])}
    >
      <MessageSquare className="w-4 h-4 mr-1" />
      <span>{commentCount} reply</span>
    </div>
  );
};

export default HNStoryCommentCount;
