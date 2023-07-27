import { FC } from "react";
import { useEffect, useRef, useState } from "react";
import Story from "../components/Story/HNStory";
import { useFetch } from "../hooks/useFetch";
import HNLoader from "../components/UI/HNLoader";

const Jobs: FC = () => {
  const [storyList, setStoryList] = useState<number[]>([]);

  const observerElement = useRef<HTMLDivElement>(null);

  const { data: stories, loading } = useFetch<number[]>(
    "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty"
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (stories) {
            setStoryList((prev) => [
              ...prev,
              ...stories.slice(prev.length, prev.length + 20),
            ]);
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
  }, [observerElement, stories]);

  useEffect(() => {
    setStoryList(stories?.slice(0, 20) || []);
  }, [stories]);

  return (
    <main className="relative h-screen w-full overflow-y-auto">
      {loading || (storyList.length === 0 && <HNLoader />)}
      {storyList && (
        <div className="space-y-3">
          {storyList.map((id, idx) => (
            <Story
              key={id}
              id={id}
              index={idx + 1}
              comment={false}
              points={false}
            />
          ))}
        </div>
      )}
      <div ref={observerElement}></div>
    </main>
  );
};

export default Jobs;
