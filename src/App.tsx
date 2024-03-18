import React, { ReactNode } from 'react';
import './App.css';
import Home from './Home';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './AuthContext';

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const App: React.FC = () => {

const AuthenticatedRoute = ({children}: Props) => {
  const authContext = useAuth()
  
  if(authContext.isAuthenticated)
      return children

  return <Navigate to="/" />
}
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element= {<Login/>}></Route>
            <Route path='/todos' element= {
              <AuthenticatedRoute>
                <Home/>
            </AuthenticatedRoute>
            }></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
