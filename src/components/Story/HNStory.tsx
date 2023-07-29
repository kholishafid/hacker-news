import { FC } from "react";
import { StoryTypesInterface } from "../../types/story-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Skeleton from "../Skeleton";
import HNModal from "../UI/HNModal";
import HNUserDetail from "../HNUserDetail";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HNStoryTitle from "./HNStoryTitle";
import HNStoryTime from "./HNStoryTime";
import HNUsername from "./HNUsername";
import HNStoryPoints from "./HNStoryPoints";
import HNStoryCommentCount from "./HNStoryCommentCount";
import HNBadge from "../UI/HNBadge";

dayjs.extend(relativeTime);

interface StoryProps {
  id: number;
  index?: number;
  comment?: boolean;
  points?: boolean;
  type?: string;
}

const HNStory: FC<StoryProps> = ({ id, comment = true, points = true }) => {
  const {
    data: story,
    isLoading,
    error,
  } = useQuery({
    queryKey: [id],
    queryFn: () =>
      axios
        .get(`https://hn.algolia.com/api/v1/items/${id}`)
        .then((res) => res.data as StoryTypesInterface),
  });
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="border-b border-gray-200 p-6">
        <Skeleton className="w-full h-6 rounded" />
        <Skeleton className="w-14 h-3 mt-2 rounded" />
        <div className="flex gap-2 mt-2 rounded">
          <Skeleton className="w-12 h-3 rounded" />
          <Skeleton className="w-12 h-3 rounded" />
        </div>
      </div>
    );

  if (error) return <div>There was an error</div>;

  if (!story) return null;

  return (
    <div
      className="border-b border-gray-200 p-6 flex cursor-pointer"
      onClick={() => navigate(`/story/${story.id}`)}
    >
      <div className="w-full">
        <div className="flex items-center mb-2 gap-1">
          <HNModal trigger={<HNUsername author={story.author} />}>
            <HNUserDetail id={story.author} />
          </HNModal>
          <HNStoryTime unix={story.created_at_i} />
        </div>
        <div className="group relative w-fit">
          <HNStoryTitle className="mr-2" title={story.title} url={story.url} />
          {story.url && (
            <HNBadge className="hidden group-hover:flex absolute left-[100%] top-0.5">
              visit
            </HNBadge>
          )}
        </div>
        {(comment || points) && (
          <div className="flex gap-6 mt-4">
            {points && <HNStoryPoints points={story.points} />}
            {comment && (
              <HNStoryCommentCount
                commentCount={(story.children && story.children.length) ?? 0}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HNStory;
