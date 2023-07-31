import { FC } from "react";
import { useEffect, useRef, useState } from "react";
import HNLoader from "../components/UI/HNLoader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HNStory from "../components/Story/HNStory";
import { useLocation } from "react-router-dom";

const Show: FC = () => {
  const [storyList, setStoryList] = useState<number[]>([]);

  const observerElement = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const { data: stories } = useQuery({
    queryKey: [pathname],
    queryFn: () =>
      axios
        .get(
          "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty"
        )
        .then((res) => res.data as number[]),
  });

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
  }, [storyList, stories]);

  useEffect(() => {
    setStoryList(stories?.slice(0, 20) || []);
  }, [stories]);

  if (storyList.length === 0) {
    return (
      <main className="relative">
        <HNLoader />
      </main>
    );
  }

  return (
    <>
      {storyList && (
        <div>
          {storyList.map((id, idx) => (
            <HNStory key={id} id={id} index={idx + 1} />
          ))}
        </div>
      )}
      <div ref={observerElement}></div>
    </>
  );
};

export default Show;
