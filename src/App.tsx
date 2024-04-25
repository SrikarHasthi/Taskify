import React, { ReactNode } from 'react';
import './App.css';
import Home from './Home';
import Login from './components/Login/Login';
import { HashRouter , Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './AuthContext';
import Register from './components/Login/Register';

interface Props {
  children?: ReactNode
}

const App: React.FC = () => {

  const AuthenticatedRoute = ({ children }: Props) => {
    const authContext = useAuth()

    if (authContext.isAuthenticated)
      return children
    else
      return <Navigate to="/" />


  }
  return (
    <div className="App">
      <AuthProvider>
        <HashRouter >
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/home' element={
              <AuthenticatedRoute>
                <Home />
              </AuthenticatedRoute>
            }></Route>
          </Routes>
        </HashRouter >
      </AuthProvider>
    </div>
  );
}

export default App;
