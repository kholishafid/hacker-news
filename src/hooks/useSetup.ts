import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RefObject, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useSetup = (observerElement: RefObject<HTMLDivElement>, storySourceUrl: string) => {

  const { pathname } = useLocation();

  const { data: stories } = useQuery({
    queryKey: [storySourceUrl],
    queryFn: () =>
      axios
        .get(
          storySourceUrl
        )
        .then((res) => res.data as number[]),
    staleTime: 60 * 1000
  });

  const [storyList, setStoryList] = useState<number[]>(stories?.slice(0, 20) ?? []);

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
  }, [storyList, stories, observerElement]);

  useEffect(() => {
    setStoryList(stories?.slice(0, 20) || []);
  }, [stories]);

  return {
    storyList, pathname
  }
}

export default useSetup
