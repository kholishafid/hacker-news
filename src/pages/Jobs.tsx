import { FC, useEffect, useState } from "react";
import { useRef } from "react";
import HNStory, { HNStoryLoader } from "../components/Story/HNStory";
import useSetup from "../hooks/useSetup";

const Jobs: FC = () => {
  const [loaderShow, setLoaderShow] = useState<boolean>(false)
  const observerElement = useRef<HTMLDivElement>(null);

  const { storyList } = useSetup(
    observerElement,
    "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty"
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout

    timeout = setTimeout(() => {
      setLoaderShow(true)
    }, 300);

    return () => clearTimeout(timeout)
  }, [])

  if (storyList.length === 0) {
    if (loaderShow) {
      return [...Array(20)].map((_, x) => (
        <HNStoryLoader key={x} />
      ))
    }
    return null
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
