import { FC, useEffect, useState } from "react";
import { useRef } from "react";
import HNStory, { HNStoryLoader } from "../components/Story/HNStory";
import useSetup from "../hooks/useSetup";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

const Home: FC = () => {
  const [loaderShow, setLoaderShow] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const observerElement = useRef<HTMLDivElement>(null);

  const { storyList } = useSetup(
    observerElement,
    `https://hacker-news.firebaseio.com/v0/${searchParams.get('c') ?? 'topstories'}.json?print=pretty`
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout

    timeout = setTimeout(() => {
      setLoaderShow(true)
    }, 300);

    return () => clearTimeout(timeout)
  }, [])

  function changeStoryCategory(val: string) {
    setSearchParams({
      c: val
    })
  }

  return (
    <>
      <div className="px-5 py-3 border-b dark:border-neutral-700">
        <Tabs defaultValue={searchParams.get('c') ?? 'topstories'} onValueChange={changeStoryCategory}>
          <TabsList>
            <TabsTrigger value="topstories">Top Stories</TabsTrigger>
            <TabsTrigger value="newstories">New Stories</TabsTrigger>
            <TabsTrigger value="beststories">Best Stories</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {
        storyList.length > 0 ? (
          <>
            {storyList?.map((storyId) => (
              <HNStory key={storyId} id={storyId} />
            ))}
            <div id="observe" ref={observerElement}></div>
          </>
        ) : loaderShow ? (
          <>
            {[...Array(20)].map((_, x) => (
              <HNStoryLoader key={x} />
            ))}
          </>
        ) : null
      }
    </>
  );
};

export default Home;
