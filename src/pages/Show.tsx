import { FC } from "react";
import { useRef } from "react";
import HNLoader from "../components/UI/HNLoader";
import HNStory from "../components/Story/HNStory";
import useSetup from "../hooks/useSetup";

const Show: FC = () => {
  const observerElement = useRef<HTMLDivElement>(null);

  const { storyList } = useSetup(
    observerElement,
    "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty"
  );

  if (storyList.length === 0) {
    return <HNLoader />;
  }

  return (
    <>
      {storyList.map((storyId) => (
        <HNStory key={storyId} id={storyId} />
      ))}
      <div ref={observerElement}></div>
    </>
  );
};

export default Show;
