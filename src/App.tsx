import { Outlet } from "react-router-dom";
import "./App.css";
import { DrawerContextProvider } from "./contexts/Drawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HNSidebar, { MenuItem } from "./components/UI/HNSidebar";

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
            <header className="p-6 border-b absolute top-0 inset-x-0 bg-white/80 backdrop-blur-sm z-10 h-20 flex items-center">
              <h3>Hacker News</h3>
            </header>
            <main className="relative h-full w-full overflow-y-auto pt-20">
              <Outlet />
            </main>
          </div>
        </DrawerContextProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
