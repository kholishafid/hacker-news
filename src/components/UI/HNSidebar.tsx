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
    <aside className="max-sm:min-w-fit min-w-[200px] md:h-screen border-r border-gray-200 max-md:fixed inset-x-0 max-md:border-t bottom-0 bg-white dark:bg-dark z-20">
      <div className="h-20 px-3 flex items-center max-md:hidden">
        {/* <h3 className="max-md:text-xl text-2xl font-semibold">HN</h3> */}
        <img
          src="/hackr.svg"
          alt="hackerns-logo"
          height={54}
          width={54}
          title="Hacker News"
          id="hackerns-logo"
        />
      </div>

      <ul className="space-y-3 max-md:flex justify-evenly max-md:space-y-0 max-md:py-3 max-md:h-16">
        {menuList.map((item) => {
          const Icon = Icons[item.icon];
          return (
            <Link
              to={item.path}
              className={`py-2 px-3 rounded md:cursor-pointer flex gap-3 items-center max-sm:justify-center decoration-slate-600 dark:text-white ${location.pathname === item.path ? "font-semibold" : ""
                }`}
              key={item.label}
            >
              <Icon className="w-6 h-6" />
              <span className="mt-0.5 max-sm:hidden">{item.label}</span>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default HNSidebar;
