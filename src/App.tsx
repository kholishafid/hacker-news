import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HNSidebar, { MenuItem } from "./components/UI/HNSidebar";
import { ArrowLeft } from "lucide-react";

const AppHeader = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className="p-6 border-b max-sm:fixed absolute top-0 inset-x-0 bg-white/80 backdrop-blur-sm z-10 flex items-center">
      {id && (
        <span
          className="hover:bg-black/5 rounded-full p-1.5 md:cursor-pointer mr-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={24} />
        </span>
      )}
      <h3 className="font-medium text-lg">{pathname}</h3>
    </header>
  );
};

function App() {
  const sidebarMenu: MenuItem[] = [
    {
      label: "Home",
      icon: "Home",
      path: "/",
    },
    {
      label: "Ask",
      icon: "BadgeHelp",
      path: "/ask",
    },
    {
      label: "Job",
      icon: "Contact2",
      path: "/job",
    },
    {
      label: "Show",
      icon: "Flame",
      path: "/show",
    },
  ];

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="max-w-5xl mx-auto flex max-sm:flex-col-reverse h-screen overflow-hidden max-sm:overflow-auto">
        <HNSidebar menuList={sidebarMenu} />
        <div className="w-full border-r relative flex flex-1 h-full">
          <AppHeader />
          <main
            className="relative w-full overflow-y-auto flex-1 pt-20 max-md:pb-14"
            id="main-app"
          >
            <Outlet />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
