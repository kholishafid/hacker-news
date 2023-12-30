import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { StoryTypesInterface } from "../types/story-types";
import HNStoryPoints from "../components/Story/HNStoryPoints";
import HNStoryCommentCount from "../components/Story/HNStoryCommentCount";
import HNCommentBlock from "../components/HNCommentBlock";
import HNUsername from "../components/Story/HNUsername";
import HNStoryTime from "../components/Story/HNStoryTime";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import HNStoryBody from "../components/Story/HNStoryContent";
import Skeleton from "../components/Skeleton";
dayjs.extend(relativeTime);

interface StoryParentProps {
  username: ReactNode;
  time: ReactNode;
  content: ReactNode;
  point?: ReactNode;
  commentCount: ReactNode;
}

const StoryParent: FC<StoryParentProps> = ({
  username,
  time,
  content,
  point,
  commentCount,
}) => {
  return (
    <>
      <div className="p-6 border-b dark:border-neutral-700">
        <div className="flex items-center mb-2 gap-1">
          {username}
          <span className="text-neutral-200">·</span>
          {time}
        </div>
        <div className="relative w-fit">{content}</div>
      </div>
      <div className="py-4 px-6 border-b flex gap-4 dark:border-neutral-700">
        {point}
        {commentCount}
      </div>
    </>
  );
};

const Story = () => {
  const [commentList, setCommentList] = useState<number[]>([])

  const { id } = useParams();

  const { data: story, isLoading } = useQuery({
    queryKey: [id],
    queryFn: () =>
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((res) => res.data as StoryTypesInterface),
  });

  const observerElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (story?.kids && story.kids.length > 10) {
      setCommentList(story?.kids?.slice(0, 10))
    } else {
      if (story?.kids) {
        setCommentList(story.kids)
      }
    }
  }, [story])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && story) {
          if (story.kids && story.kids !== undefined && story.kids.length > 0) {
            const newAr = [...story.kids.slice(commentList.length, commentList.length + 10)]

            setCommentList((prev) => [
              ...prev,
              ...newAr
            ])
          }
        }
      },
      { threshold: 1 }
    );

    if (observerElement.current) {
      observer.observe(observerElement.current);
    }

    const observerElementCurrent = observerElement.current;

    return () => {
      if (observerElementCurrent) {
        observer.unobserve(observerElementCurrent);
      }
    };
  }, [commentList, story, observerElement]);

  if (isLoading) return (
    <div className="animate-pulse">
      <div className="p-6 border-b dark:border-neutral-700">
        <Skeleton className="w-20 h-5 rounded-lg mb-2" />
        <Skeleton className="w-96 h-5 rounded-lg" />
      </div>
      <div className="py-4 px-6 border-b flex gap-4 dark:border-neutral-700">
        <Skeleton className="w-12 h-5 rounded-lg" />
        <Skeleton className="w-12 h-5 rounded-lg" />
      </div>
    </div>
  );

  if (!story) return null;

  return (
    <>
      <StoryParent
        username={<HNUsername author={story.by} />}
        time={<HNStoryTime unix={story.time} />}
        content={
          <HNStoryBody
            type={story.type}
            title={story.title}
            text={story.text}
            url={story.url}
          />
        }
        point={story.type === 'story' ? <HNStoryPoints points={story.score} /> : null}
        commentCount={
          <HNStoryCommentCount commentCount={story.kids?.length ?? 0} className="hover:no-underline" />
        }
      />
      <div className="divide-y dark:divide-neutral-700">
        {commentList &&
          commentList.map((id, i) => {
            return <HNCommentBlock comment={id} key={i} />
          })
        }
      </div>
      <div ref={observerElement} />
    </>
  );
};

export default Story;
