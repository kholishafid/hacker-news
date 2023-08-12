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
        .get(`https://hn.algolia.com/api/v1/items/${id}`)
        .then((res) => res.data as StoryTypesInterface),
  });

  if (isLoading) return <HNLoader />;

  if (!story) return null;

  return (
    <>
      <StoryParent
        username={<HNUsername author={story.author} />}
        time={<HNStoryTime unix={story.created_at_i} />}
        content={
          <HNStoryBody
            type={story.type}
            title={story.title}
            text={story.text}
            url={story.url}
          />
        }
        point={<HNStoryPoints points={story.points} />}
        commentCount={
          <HNStoryCommentCount commentCount={story.children?.length ?? 0} />
        }
      />
      {story.children && story.children?.length > 0 && (
        <div className="divide-y">
          {story.children.map((child) => (
            <HNCommentBlock key={child.id} comment={child} />
          ))}
        </div>
      )}
    </>
  );
};

export default Story;
