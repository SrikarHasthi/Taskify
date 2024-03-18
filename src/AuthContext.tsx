import { ReactNode, createContext, useContext, useState } from "react";
import { apiClient, executeBasicAuthentication } from "./api/apis";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>; // Adjusted return type to Promise<boolean>
    logout: () => void;
    token: string | null;
  }
  
  export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => Promise.resolve(false), // Adjusted to return a Promise
    logout: () => {},
    token: null, // Adjusted to null instead of an empty string
  });

export const useAuth = () => useContext(AuthContext)
interface Props {
    children?: ReactNode
    // any props that come into the component
  }
//2: Share the created context with other components
export default function AuthProvider({ children }: Props) {

    //3: Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
    const [token, setToken] = useState<string | null>(null)

    // const login = (username: string, password: string):boolean => {
    //     if(username==='srikar' && password==='dummy'){
    //         setAuthenticated(true)
    //         return true            
    //     } else {
    //         setAuthenticated(false)
    //         return false
    //     }        
    // }

    const login = async (username: string, password: string):Promise<boolean> => {
        const baToken = 'Basic ' + window.btoa(username + ":" + password)
        console.log("helooooo");
        
        let data = await executeBasicAuthentication(baToken).then((res)=> {
            console.log(res);
            
            if(res && res.status === 200){
                setAuthenticated(true)
                setToken(baToken)
                apiClient.interceptors.request.use((config) => {
                    console.log("dfsdd");
                    
                    config.headers.Authorization = baToken
                    return config
                })
                return true
            }
            else {
                logout()
                return false
            }
        })
        return true
    }

    const logout = () => {
        setAuthenticated(false)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, token}  }>
            {children}
        </AuthContext.Provider>
    )
} 