import { FC } from "react";
import { useEffect, useRef, useState } from "react";
import Story from "../components/Story/HNStory";
import { useFetch } from "../hooks/useFetch";
import HNLoader from "../components/UI/HNLoader";
import HNDrawer from "../components/UI/HNDrawer";
import { useDrawerContext } from "../contexts/Drawer";
import Comment from "../components/HNCommentBlock";

const Asks: FC = () => {
  const [storyList, setStoryList] = useState<number[]>([]);

  const observerElement = useRef<HTMLDivElement>(null);

  const { data: stories, loading } = useFetch<number[]>(
    "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty"
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

  const { dataContent } = useDrawerContext();

  return (
    <main className="relative h-screen w-full overflow-y-auto">
      {loading || (storyList.length === 0 && <HNLoader />)}
      {storyList && (
        <div className="space-y-3">
          {storyList.map((id, idx) => (
            <Story key={id} id={id} index={idx + 1} />
          ))}
        </div>
      )}
      <div ref={observerElement}></div>
      <HNDrawer>
        <div className="divide-y space-y-4">
          {dataContent && <Story id={dataContent?.id} />}
          {dataContent?.children?.map((element) => {
            return (
              <div key={element.id}>
                <Comment comment={element} />
              </div>
            );
          })}
        </div>
      </HNDrawer>
    </main>
  );
};

export default Asks;
