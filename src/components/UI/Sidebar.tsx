import { FC } from "react";
import { Icon, Icons } from "../Icons";
import { Link, useLocation } from "react-router-dom";

export type MenuItem = {
  label: string,
  icon: Icon,
  path: string
}

interface SidebarProps {
  menuList: MenuItem[]
}


const Sidebar: FC<SidebarProps> = ({ menuList }) => {

  const location = useLocation()

  return (
    <aside className='w-64 h-screen bg-gray-50 fixed left-0 top-0 p-4 border-r border-gray-200'>
      <div className='py-2 px-3'>
        <h3 className='text-xl font-semibold'>Hacker News</h3>
      </div>

      <div className="border-b border-gray-200 mt-2 mb-3"></div>

      <ul className='space-y-3'>
        {menuList.map((item) => {
          const Icon = Icons[item.icon]
          return (
            <Link
              to={item.path}
              className={`py-2 px-3 font-medium rounded cursor-pointer hover:bg-gray-200 flex gap-3 items-center text-gray-700 decoration-slate-600 ${location.pathname === item.path ? 'bg-gray-100 underline' : ''}`}
              key={item.label}
            >
              <Icon className="w-6 h-6 text-gray-700" />
              <span className="mt-0.5">{item.label}</span>
            </Link>
          )
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;