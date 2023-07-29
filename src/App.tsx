import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { DrawerContextProvider } from "./contexts/Drawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HNSidebar, { MenuItem } from "./components/UI/HNSidebar";
import { ArrowLeft } from "lucide-react";

const AppHeader = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className="p-6 border-b absolute top-0 inset-x-0 bg-white/80 backdrop-blur-sm z-10 h-20 flex items-center gap-2">
      {id && (
        <span
          className="hover:bg-black/5 rounded-full p-1.5 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
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
      <div className="max-w-5xl mx-auto flex h-screen overflow-hidden">
        <HNSidebar menuList={sidebarMenu} />
        <DrawerContextProvider>
          <div className="w-full border-r relative">
            <AppHeader />
            <main
              className="relative h-full w-full overflow-y-auto pt-20"
              id="main-app"
            >
              <Outlet />
            </main>
          </div>
        </DrawerContextProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
