import HNSidebar, { MenuItem } from "./components/HNSidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import "./App.css";

const sidebarMenu: MenuItem[] = [
  {
    label: "Feed",
    icon: "QueueList",
    path: "/",
  },
  {
    label: "Ask",
    icon: "QuestionMarkCircle",
    path: "/ask",
  },
  {
    label: "Job",
    icon: "Briefcase",
    path: "/job",
  },
  {
    label: "Show",
    icon: "Megaphone",
    path: "/show",
  },
];

const AppHeader = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className="p-6 border-b max-sm:fixed absolute top-0 inset-x-0 bg-white/80 backdrop-blur-sm z-10 flex items-center dark:bg-neutral-800/50 dark:text-neutral-100 dark:border-neutral-700">
      {id && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      )}
      <h3 className="font-medium text-lg">{pathname}</h3>
    </header>
  );
};

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <div className="max-w-3xl mx-auto flex max-sm:flex-col-reverse h-screen max-sm:overflow-auto relative">
          <HNSidebar menuList={sidebarMenu} />
          <div className="w-full min-w-3xl relative flex flex-1 h-full border-r overflow-x-hidden dark:border-neutral-700">
            <AppHeader />
            <main
              className="relative w-full overflow-y-auto flex-1 pt-20 max-md:pb-14 bg-white dark:bg-neutral-800"
              id="main-app"
            >
              <Outlet />
            </main>
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
