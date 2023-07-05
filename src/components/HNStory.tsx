import { FC, useEffect, useState } from "react";
import { StoryTypesInterface } from "../types/story-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Icons } from "./Icons";
import Skeleton from "./Skeleton";
import { useDrawerContext } from "../contexts/Drawer";
import HNModal from "./UI/HNModal";
import HNUserDetail from "./HNUserDetail";

dayjs.extend(relativeTime)

interface StoryProps {
  id: number
  index?: number
  comment?: boolean
  points?: boolean
}

const Story: FC<StoryProps> = ({ id, index, comment = true, points = true }) => {
  const [story, setData] = useState<StoryTypesInterface | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(`https://hn.algolia.com/api/v1/items/${id}`)
          .then((res) => res.json())
          .then((data) => setData(data))
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

  }, [id])

  const { setDrawer, setDataContent } = useDrawerContext()

  const username = (story: StoryTypesInterface) => {
    return (<div className={`text-sm flex gap-1  items-center hover:underline cursor-pointer ${points ? 'px-2' : 'pr-2'}`}>
      <Icons.User className="w-4 h-4" />
      <span>{story.author}</span>
    </div>)
  }

  return (
    <div>
      {story && !loading ?
        (
          <div className='border-b border-gray-200 p-4 shadow-sm text-gray-700 flex'>
            {index && (
              <div className="mr-5 flex">
                <span className='text-lg mb-3 font-medium'>{index}</span>
              </div>
            )}
            <div>
              <h3 className="text-lg mb-3 font-medium flex">
                <a href={story.url} target="_blank">{story.title}</a>
              </h3>
              <div className="flex divide-x divide-gray-400">
                {points &&
                  <div className='text-sm flex gap-1  items-center pr-2'>
                    <Icons.Coffee className="w-4 h-4" />
                    <span>{story.points}</span>
                  </div>
                }
                <HNModal trigger={username(story)}>
                  <HNUserDetail id={story.author} />
                </HNModal>
                <div className='text-sm flex gap-1  items-center px-2'>
                  <Icons.Clock4 className="w-4 h-4" />
                  <span>{dayjs.unix(story.created_at_i).fromNow()}</span>
                </div>
                {comment &&
                  <div
                    className='text-sm flex gap-1  items-center px-2 cursor-pointer hover:underline'
                    onClick={() => {
                      setDrawer(true)
                      setDataContent(story ?? undefined)
                    }}
                  >
                    <Icons.MessageSquare className="w-4 h-4" />
                    <span>{story.children ? story.children.length : 0} comments</span>
                  </div>
                }
              </div>
            </div>
          </div>
        )
        : (
          <div className='border border-gray-200 p-4 shadow-sm text-gray-700'>
            <Skeleton className="w-full h-6 rounded" />
            <div className="flex gap-2 mt-2 rounded">
              <Skeleton className="w-10 h-4 rounded" />
              <Skeleton className="w-10 h-4 rounded" />
              <Skeleton className="w-10 h-4 rounded" />
            </div>
          </div>
        )
      }
      {error && <h1>There was an Error</h1>}
    </div >
  );
}

export default Story;