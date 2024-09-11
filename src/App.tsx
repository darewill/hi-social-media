import './App.css'
import { Outlet, Router, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/profile/Profile'
import Chatbox from './pages/chatbox/Chatbox'
import Navbar from './assets/components/Navbar'
import Leftbar from './assets/components/Leftbar'
import Rightbar from './assets/components/Rightbar'

function App() {

  //Feed

  const Feed = () => {
    return (
      <>
      <Navbar />
        <main>
          <Leftbar />
          <div className="container">
            <Outlet />
          </div>
          <Rightbar />
        </main>
      </>
    );
  };


  //Routing
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Feed />,
      children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile/:id',
        element: <Profile />
      },
      {
        path: '/chatbox/:id',
        element: <Chatbox />
      },
    ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
