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
import HNLoader from "../components/UI/HNLoader";
import HNStoryTime from "../components/Story/HNStoryTime";
import { FC, ReactNode } from "react";
import HNStoryBody from "../components/Story/HNStoryContent";
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
      <div className="p-6 border-b">
        <div className="flex items-center mb-2 gap-1">
          {username}
          {time}
        </div>
        <div className="relative w-fit">{content}</div>
      </div>
      <div className="py-4 px-6 border-b flex gap-4">
        {point}
        {commentCount}
      </div>
    </>
  );
};

const Story = () => {
  const { id } = useParams();

  const { data: story, isLoading } = useQuery({
    queryKey: [id],
    queryFn: () =>
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((res) => res.data as StoryTypesInterface),
  });

  if (isLoading) return <HNLoader />;

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
        point={<HNStoryPoints points={story.score} />}
        commentCount={
          <HNStoryCommentCount commentCount={story.kids?.length ?? 0} />
        }
      />
      {story.kids && story.kids?.length > 0 && (
        <div className="divide-y">
          {story.kids.length > 10 ? story.kids.slice(0, 10).map((i) => (
            <HNCommentBlock key={i} comment={i} />
          )) : story.kids.map((i) => (
            <HNCommentBlock key={i} comment={i} />
          ))}
        </div>
      )}
    </>
  );
};

export default Story;
