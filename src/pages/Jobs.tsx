import { FC } from "react";
import { useRef } from "react";
import HNLoader from "../components/UI/HNLoader";
import HNStory from "../components/Story/HNStory";
import useSetup from "../hooks/useSetup";

const Jobs: FC = () => {
  const observerElement = useRef<HTMLDivElement>(null);

  const { storyList } = useSetup(
    observerElement,
    "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty"
  );

  if (storyList.length === 0) {
    return <HNLoader />;
  }

  return (
    <>
      {storyList.map((storyId) => (
        <HNStory key={storyId} id={storyId} comment={false} points={false} />
      ))}
      <div ref={observerElement}></div>
    </>
  );
};

export default Jobs;
