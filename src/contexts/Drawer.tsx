import { FC, ReactNode, createContext, useContext, useState } from "react"
import { HackerNewsComment } from "../types/story-types"

interface DrawerContextValue {
  isActive: boolean
  dataContent: HackerNewsComment[] | undefined
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>
  setDataContent: React.Dispatch<React.SetStateAction<HackerNewsComment[] | undefined>>
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined)

interface DrawerContextProviderProps {
  children: ReactNode
}

export const useDrawerContext = (): DrawerContextValue => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export const DrawerContextProvider: FC<DrawerContextProviderProps> = ({ children }) => {
  const [dataContent, setDataContent] = useState<HackerNewsComment[]>()
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <DrawerContext.Provider
      value={{ isActive, dataContent, setDrawer: setIsActive, setDataContent: setDataContent }}
    >
      {children}
    </DrawerContext.Provider>
  )
}