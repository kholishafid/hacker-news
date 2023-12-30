import { FC } from "react";
import { Icon, Icons } from "./Icons";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "./ThemeProvider";

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
  const { theme, setTheme } = useTheme()

  function toggleTheme(e: boolean) {
    if (e) {
      setTheme('dark')
      return
    }
    setTheme('light')
  }

  return (
    <aside className="min-w-fit fixed inset-x-0 z-20 bottom-0 md:px-4 md:py-1 md:sticky md:inset-y-0 md:max-h-screen md:min-w-60 flex flex-col">
      <h1 className="h-20 px-3 flex items-center max-md:hidden dark:text-white">
        Hackernews.
      </h1>

      <ul className="space-y-3 max-md:flex justify-evenly max-md:space-y-0 max-md:py-3 max-md:h-16 max-md:bg-white/80 max-md:backdrop-blur-sm max-md:dark:bg-neutral-800/50 max-md:dark:border-neutral-700">
        {menuList.map((item) => {
          const Icon = Icons[item.icon];
          return (
            <Link
              to={item.path}
              className={cn([
                `py-2 px-3 rounded-md md:cursor-pointer flex gap-3 items-center max-sm:justify-center text-neutral-700 dark:text-white border border-transparent`,
                `${location.pathname === item.path ? "bg-white text-neutral-950 shadow dark:bg-neutral-800 dark:border-neutral-700 dark:text-white" : ""}`
              ])}
              key={item.label}
            >
              <Icon />
              <span className="mt-0.5 max-sm:hidden">{item.label}</span>
            </Link>
          );
        })}
      </ul>
      <div className="py-2 px-3 rounded flex gap-3 items-center text-neutral-700 dark:text-white border border-transparent mt-auto md:mb-4 max-md:absolute -top-[80%] right-0">
        <div className="dark:text-white flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute w-6 h-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
          <span className="sr-only">Toggle theme</span>
        </div>
        <Switch defaultChecked={theme === 'dark' ? true : false} onCheckedChange={toggleTheme} />
      </div>
    </aside>
  );
};

export default HNSidebar;
