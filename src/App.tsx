// src/App.tsx
import './App.css';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/profile/Profile';
import Chatbox from './pages/Chatbox/Chatbox';
import Navbar from './assets/components/Navbar';
import BottomBar from './assets/components/BottomBar';
import Rightbar from './assets/components/Rightbar';
import ProtectedRoute from './assets/components/ProtectedRoute'; // Import ProtectedRoute
import PublicRoute from './assets/components/PublicRoute';

function App() {
  // Feed component
  const Feed = () => {
    return (
      <>
        <Navbar />
        <main>
          {/* <BottomBar /> */}
          <div className="container">
            <Outlet />
          </div>
          {/* <Rightbar /> */}
        </main>
        <BottomBar />
      </>
    );
  };

  // Routing
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Feed />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile/:id',
          element: <Profile />,
        },
        {
          path: '/chatbox/:id',
          element: <Chatbox />,
        },
      ],
    },
    {
      path: '/login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: '/signup',
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
