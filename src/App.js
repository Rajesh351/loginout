
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import RegistrationForm from './components/RegistrationForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { Showall } from './components/Showall';
import Update from './components/Update';
import { Home } from './components/Home';
import ProtectedRoute from './components/ProtectedRout';
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/create/employe',
    element:<ProtectedRoute> <RegistrationForm /></ProtectedRoute>
  },
  {
    path: '/dashbord',
    element: <ProtectedRoute> <Navbar/></ProtectedRoute>
  },
  {
    path: '/Showall',
    element: <ProtectedRoute><Showall/></ProtectedRoute>
  }
  ,
  {
    path: '/update/:id',
    element:<ProtectedRoute> <Update/></ProtectedRoute>
  },
  {
    path: '/Home',
    element: <ProtectedRoute><Home/></ProtectedRoute>
  }
])
function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
