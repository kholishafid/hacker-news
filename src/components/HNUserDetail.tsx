import { FC } from "react";
import { useFetch } from "../hooks/useFetch";
import { User } from "../types/user-types";
import dayjs from "dayjs";

interface HNUserDetailProps {
  id: string
}

const HNUserDetail: FC<HNUserDetailProps> = ({ id }) => {

  const { data } = useFetch<User>(`https://hacker-news.firebaseio.com/v0/user/${id}.json?print=pretty`)

  return (
    <div>
      {data && (
        <div className="text-gray-700">
          <div className="text-xl font-medium">{data.id}</div>
          <div className="text-sm flex divide-x mb-4">
            <div className="pr-2">Karma : {data.karma}</div>
            <div className="pl-2">Joined : {dayjs.unix(data.created).format('YYYY MMMM DD')}</div>
          </div>
          <pre
            className='whitespace-normal font-sans leading-7 text-sm'
            dangerouslySetInnerHTML={{ __html: data.about as string }}
          ></pre>
        </div>
      )
      }
    </div >
  );
}

export default HNUserDetail;