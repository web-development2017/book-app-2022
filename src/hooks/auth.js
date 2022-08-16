import { AuthService } from "../service/AuthService";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";

const authContext = createContext();

export default function useAuth(){
    return useContext(authContext);
}

export function AuthProvider(props){
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/books');
    const auth = getAuth();
    useEffect(()=>{
        onAuthStateChanged(auth, (data) =>{
            if(data !== null){
                setUser(data.displayName);
            }            
        })
    },[])
    useEffect(()=>{
        console.log(user)
    },[user])

    const login = async () => {
        console.log('login')
        await AuthService.login()
    };

    const logout = async () =>{
        await AuthService.logout();
        setUser(null)
    };

    const value = { login, logout, user }

    return <authContext.Provider value={ value } { ...props } />
}