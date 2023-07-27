import { FC } from "react";
import { Icon, Icons } from "../Icons";
import { Link, useLocation } from "react-router-dom";

export type MenuItem = {
  label: string;
  icon: Icon;
  path: string;
};

interface HNSidebarProps {
  menuList: MenuItem[];
}

const HNSidebar: FC<HNSidebarProps> = ({ menuList }) => {
  const location = useLocation();

  return (
    <aside className="min-w-[200px] h-screen border-r border-gray-200">
      <div className="h-20 px-3 flex items-center">
        <h3 className="text-2xl font-semibold">HN</h3>
      </div>

      <ul className="space-y-3">
        {menuList.map((item) => {
          const Icon = Icons[item.icon];
          return (
            <Link
              to={item.path}
              className={`py-2 px-3 font-medium rounded cursor-pointer flex gap-3 items-center text-gray-700 decoration-slate-600 ${
                location.pathname === item.path ? "underline" : ""
              }`}
              key={item.label}
            >
              <Icon className="w-6 h-6 text-gray-700" />
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default HNSidebar;
