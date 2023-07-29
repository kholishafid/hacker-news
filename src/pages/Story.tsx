import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { StoryTypesInterface } from "../types/story-types";
import HNModal from "../components/UI/HNModal";
import HNUserDetail from "../components/HNUserDetail";
import HNStoryPoints from "../components/Story/HNStoryPoints";
import HNStoryCommentCount from "../components/Story/HNStoryCommentCount";
import HNCommentBlock, { CommentText } from "../components/HNCommentBlock";
import HNUsername from "../components/Story/HNUsername";
import HNLoader from "../components/UI/HNLoader";
import HNStoryTitle from "../components/Story/HNStoryTitle";
import HNStoryTime from "../components/Story/HNStoryTime";
import HNBadge from "../components/UI/HNBadge";
dayjs.extend(relativeTime);

const StoryParent = ({ story }: { story: StoryTypesInterface }) => {
  return (
    <>
      <div className="p-6 border-b">
        <div className="flex items-center mb-2 gap-1">
          <HNModal trigger={<HNUsername author={story.author} />}>
            <HNUserDetail id={story.author} />
          </HNModal>
          <HNStoryTime unix={story.created_at_i} />
        </div>
        <div className="relative w-fit">
          {story.type === "comment" ? (
            <CommentText text={story.text ?? ""} full={true} />
          ) : (
            <>
              <HNStoryTitle
                url={story.url}
                title={story.title}
                className="mr-2"
              />
              {story.url && (
                <HNBadge className="group-hover:flex absolute left-[100%] top-0.5">
                  visit
                </HNBadge>
              )}
              {story.text && (
                <div className="mt-4">
                  <CommentText text={story.text} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="py-4 px-6 border-b flex gap-4">
        <HNStoryPoints points={story.points} />
        <HNStoryCommentCount
          commentCount={story.children ? story.children.length : 0}
        />
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

  if (isLoading)
    return (
      <main className="h-full w-full overflow-y-auto relative">
        <HNLoader />
      </main>
    );

  if (!story) return null;

  return (
    <>
      <StoryParent story={story} />
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
