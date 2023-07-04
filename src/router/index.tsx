import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import App from '../App'
import Jobs from '../pages/Jobs'
import Asks from '../pages/Asks'
import Show from '../pages/Show'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'job',
        element: <Jobs />
      },
      {
        path: 'ask',
        element: <Asks />
      },
      {
        path: 'show',
        element: <Show />
      },
    ]
  }
])