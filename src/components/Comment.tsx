import { FC, useState } from "react";
import { HackerNewsComment } from "../types/story-types";
import HNCard from "./UI/HNCard";
import { Icons } from "./Icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import HNCollapsible from "./UI/HNCollapsible";
import * as Collapsible from "@radix-ui/react-collapsible";

dayjs.extend(relativeTime);

interface CommentProps {
  comment: HackerNewsComment
}

const LoadMoreButton = ({ reply }: { reply: HackerNewsComment[] }) => {
  return (
    <span className='text-xs text-gray-700 mt-2 block'>Load {reply.length} reply</span>
  )
}

const Comment: FC<CommentProps> = ({ comment }) => {

  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <HNCard className="mt-4 relative rounded-tl-none bg-white rounded-md">
        <div className="h-4 w-1 border-l border-gray-300 absolute -top-4 left-0`"></div>
        <div className="flex divide-x divide-gray-400 mb-2">
          <div className='text-sm flex gap-1  items-center pr-2'>
            <Icons.User className="w-4 h-4" />
            <span>{comment.author}</span>
          </div>
          <div className='text-sm flex gap-1  items-center px-2'>
            <Icons.Clock4 className="w-4 h-4" />
            <span>{dayjs.unix(comment.created_at_i).fromNow()}</span>
          </div>
        </div>
        <pre
          className='whitespace-normal font-sans text-gray-800 leading-7'
          dangerouslySetInnerHTML={{ __html: comment.text as string }}
          key={comment.id}
        >
        </pre>
      </HNCard>
      {comment.children && comment.children.length > 0 &&
        <div className="ml-4 font-sans">
          <Collapsible.Root open={open} onOpenChange={setOpen}>
            <HNCollapsible triggerChildren={<LoadMoreButton reply={comment.children} />}>
              {comment.children.map((child) => {
                return <Comment key={child.id} comment={child} />
              })}
            </HNCollapsible>
          </Collapsible.Root>
        </div>
      }
    </>
  );
}

export default Comment;