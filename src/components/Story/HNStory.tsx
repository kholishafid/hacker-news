import { StoryTypesInterface } from "../../types/story-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Skeleton from "../Skeleton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HNStoryTime from "./HNStoryTime";
import HNUsername from "./HNUsername";
import HNStoryPoints from "./HNStoryPoints";
import HNStoryCommentCount from "./HNStoryCommentCount";
import HNStoryBody from "./HNStoryContent";

dayjs.extend(relativeTime);

interface StoryProps {
  id: number;
  comment?: boolean;
  points?: boolean;
  type?: string;
}

export const HNStoryLoader = () => {
  return (
    <div className="border-b border-gray-200 dark:border-neutral-700 p-6">
      <Skeleton className="w-24 h-5 rounded-md mb-3" />
      <Skeleton className="w-full h-14 rounded-lg dark:bg-white/5" />
      <div className="flex gap-2 mt-3">
        <Skeleton className="w-16 h-5 rounded-md" />
        <Skeleton className="w-16 h-5 rounded-md" />
      </div>
    </div>
  )
}

const HNStory = ({ id, comment = true, points = true }: StoryProps) => {
  const {
    data: story,
    isLoading,
    error,
  } = useQuery({
    queryKey: [id],
    queryFn: () =>
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((res) => res.data as StoryTypesInterface),
  });
  const navigate = useNavigate();

  if (isLoading) return <HNStoryLoader />
  if (error) return <div>There was an error</div>;

  if (!story) return null;

  return (
    <div
      className="border-b border-gray-200 dark:border-neutral-700 p-6 flex md:cursor-pointer"
      onClick={() => navigate(`/story/${story.id}`)}
    >
      <div className="w-full">
        <div className="flex items-center mb-2 gap-1">
          <HNUsername author={story.by} />
          <span className="text-neutral-200">·</span>
          <HNStoryTime unix={story.time} />
        </div>
        <HNStoryBody type={story.type} url={story.url} text={story.text} title={story.title} />
        {(comment || points) && (
          <div className="flex gap-6 mt-4">
            {points && <HNStoryPoints points={story.score} />}
            {comment && (
              <HNStoryCommentCount
                commentCount={(story.kids && story.kids.length) ?? 0}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HNStory;
