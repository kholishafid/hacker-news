import { FC, MouseEvent, ReactNode, useRef } from "react";
import { useDrawerContext } from "../../contexts/Drawer";

interface DrawerProps {
  children: ReactNode;
}

const Drawer: FC<DrawerProps> = ({ children }) => {
  const { isActive, setDrawer } = useDrawerContext();
  const drawerOverlay = useRef<HTMLDivElement>(null);

  const handleClick = (ev: MouseEvent) => {
    const target = ev.target as HTMLDivElement;
    if (target === drawerOverlay.current) {
      setDrawer(false);
    }
  };

  return (
    <>
      {isActive && (
        <div
          className="fixed inset-0 bg-black/10  border-l border-gray-200 z-0 flex justify-end"
          onClick={(ev) => handleClick(ev)}
          ref={drawerOverlay}
        >
          <aside className="w-fit h-screen bg-gray-50 max-w-3xl overflow-y-auto z-30">
            {children}
          </aside>
        </div>
      )}
    </>
  );
};

export default Drawer;
