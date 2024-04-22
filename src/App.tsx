import React, { ReactNode } from 'react';
import './App.css';
import Home from './Home';
import Login from './components/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './AuthContext';
import Register from './components/Login/Register';

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const App: React.FC = () => {

  const AuthenticatedRoute = ({ children }: Props) => {
    const authContext = useAuth()

    // useEffect(() => {
    //   const sessionData = sessionStorage.getItem('isAuthenticated');
    //   const bool = sessionData === 'true' ? true : false;
    //   authContext.setIsAuthenticated(bool);
    // }, [authContext]);

    if (authContext.isAuthenticated)
      return children
    else
      return <Navigate to="/taskify/login" />


  }
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/taskify/' element={<Navigate to="/taskify/login" />}></Route>
            <Route path='/taskify/login' element={<Login />}></Route>
            <Route path='/taskify/register' element={<Register />}></Route>
            <Route path='/taskify/home' element={
              <AuthenticatedRoute>
                <Home />
              </AuthenticatedRoute>
            }></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;