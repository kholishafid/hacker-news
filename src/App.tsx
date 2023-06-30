import { Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import Sidebar, { MenuItem } from './components/UI/Sidebar'
import { router } from './router'
import { DrawerContextProvider } from './contexts/Drawer'



function App() {
  const sidebarMenu: MenuItem[] = [
    {
      label: 'Home',
      icon: 'Home',
      path: '/',
    },
    {
      label: 'Ask',
      icon: 'BadgeHelp',
      path: '/ask',
    },
    {
      label: 'Job',
      icon: 'Contact2',
      path: '/job',
    },
  ]

  return (
    <div>
      <Sidebar menuList={sidebarMenu} />
      <DrawerContextProvider>
        <Outlet />
      </DrawerContextProvider>
    </div>
  )
}

export default App
