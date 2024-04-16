import { ReactNode, createContext, useContext, useState } from "react";
import { apiClient, executeBasicAuthentication, executeJwtAuthentication, getUserDetails } from "./api/apis";
import { UserData } from "./Interfaces";

interface AuthContextType {
    isAuthenticated: boolean;
    // login: (username: string, password: string) => Promise<boolean>; // Adjusted return type to Promise<boolean>
    login: (username: string, password: string) => Promise<boolean>; // Adjusted return type to Promise<boolean>
    logout: () => void;
    token: string | null;
    userData: UserData;
}

//   export const AuthContext = createContext<AuthContextType>({
//     isAuthenticated: false,
//     login: () => Promise.resolve(false), // Adjusted to return a Promise
//     logout: () => {},
//     token: null, // Adjusted to null instead of an empty string
//   });

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => Promise.resolve(false), // Adjusted to return a Promise
    logout: () => { },
    token: null, // Adjusted to null instead of an empty string
    userData: { userId: 0, email: '', password: '', todoHistory: [] },
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
    const [userData, setUserData] = useState<UserData>({ userId: 0, email: '', password: '', todoHistory: [] });
    const [token, setToken] = useState<string | null>(null) //check if i need this

    // const login = async (username: string, password: string): Promise<boolean> => {
    //     let data = await getUserDetails().then((res) => {
    //         if (res && res.data) {
    //             console.log(res.data);
    //             setUserData(res.data);

    //             if (username === 'srikar' && password === 'dummy') {
    //                 setAuthenticated(true);
    //                 return true;
    //             }
    //             else {
    //                 setAuthenticated(false)
    //                 return false
    //             }

    //         }
    //         return false
    //     })
    //     return data;
    // }

    const login = async (username: string, password: string): Promise<boolean> => {
        const baToken = 'Basic ' + window.btoa(username + ":" + password)

        let data = await executeBasicAuthentication(baToken).then(async (res) => {
            console.log(res);

            if (res && res.status === 200) {
                setAuthenticated(true)
                setToken(baToken) //check if i need this
                apiClient.interceptors.request.use((config) => {
                    console.log("dfsdd");

                    config.headers.Authorization = baToken
                    return config
                })
                await getUserDetails().then((res2) => {
                    if (res2 && res2.data) {
                        setUserData(res2.data);
                        return true;
                    }
                })

            }
            else {
                console.log("wrong username or password");

                logout()
                return false
            }
        })
        return true;
    }

    // const login = async (username: string, password: string): Promise<boolean> => {

    //     let data = await executeJwtAuthentication(username, password).then(async (res) => {
    //         console.log(res);

    //         if (res && res.status === 200) {
    //             const jwtToken = 'Basic ' + res.data.token
    //             setAuthenticated(true)
    //             setToken(jwtToken)
    //             apiClient.interceptors.request.use((config) => {
    //                 console.log("dfsdd");

    //                 config.headers.Authorization = jwtToken
    //                 return config
    //             })
    //             await getUserDetails().then((res) => {
    //                 if (res && res.data) {
    //                     console.log(res.data);
    //                     setUserData(res.data);
    //                     return true;
    //                 }
    //             })

    //         }
    //         else {
    //             console.log("wrong username or password");

    //             logout()
    //             return false
    //         }
    //     })
    //     return true;
    // }

    

    const logout = () => {
        setAuthenticated(false)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token, userData }}>
            {children}
        </AuthContext.Provider>
    )
} 

