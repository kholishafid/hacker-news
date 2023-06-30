import { FC } from "react";
import { useEffect, useRef, useState } from 'react'
import Story from "../components/Story";
import { useFetch } from "../hooks/useFetch";
import HNLoader from "../components/UI/HNLoader";
import HNDrawer from "../components/UI/HNDrawer";
import { useDrawerContext } from "../contexts/Drawer";
import Comment from "../components/Comment";

const Jobs: FC = () => {
  const [storyList, setStoryList] = useState<number[]>([])

  const observerElement = useRef<HTMLDivElement>(null)

  const { data: stories, loading } = useFetch<number[]>('https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty')

  const { dataContent } = useDrawerContext()

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          if (stories) {
            setStoryList(prev => [...prev, ...stories.slice(prev.length, prev.length + 20)])
          }
        }
      },
      { threshold: 1 }
    );

    if (observerElement.current) {
      observer.observe(observerElement.current);
    }

    const observerElementCurrent = observerElement.current

    return () => {
      if (observerElementCurrent) {
        observer.unobserve(observerElementCurrent);
      }
    };
  }, [observerElement, stories]);

  useEffect(() => {
    setStoryList(stories?.slice(0, 20) || [])
  }, [stories])

  return (
    <main className='p-4 md:ml-64 relative h-screen'>
      {loading || storyList.length === 0 && <HNLoader />}
      {storyList && (
        <div className='space-y-3'>
          {storyList.map((id, idx) => (
            <Story key={id} id={id} index={idx + 1} />
          ))}
        </div>
      )}
      <div ref={observerElement}></div>
      <HNDrawer>
        <div className="divide-y space-y-4">
          {dataContent?.map((element) => {
            return (
              <div key={element.id}>
                <Comment comment={element} />
              </div>
            )
          })}
        </div>
      </HNDrawer>
    </main>
  );
}

export default Jobs;