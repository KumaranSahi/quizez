import {useContext,createContext,useReducer,FC,useState,useEffect} from 'react'
import {Props,State,SigninPages,AuthContextType} from './AuthContext.types'
import {authReducer,signUpUser,signOutUser,changePassword,onReload,signInUser} from './AuthReducer'

export const AuthContext=createContext({});

export const useAuth=()=>useContext(AuthContext) as AuthContextType;

const initialState:State={
    userId:null,
    token:null,
    userName:null,
    expiresIn:null,
    image:null
}

export const AuthContextProvider : FC=({children}:Props)=>{
    const [loading,setLoading]=useState(false)
    const [currentPage,setCurrentPage]=useState<SigninPages>("SIGNIN_PAGE")

    const [state,dispatch]=useReducer(authReducer,initialState)

    useEffect(()=>{
        onReload(dispatch,setLoading)
    },[])

    return(
        <AuthContext.Provider value={{
            userId:state.userId,
            token:state.token,
            userName:state.userName,
            image:state.image,
            signUpUser:signUpUser,
            signInUser:signInUser,
            signOutUser:signOutUser,
            currentPage:currentPage,
            changePassword:changePassword,
            setCurrentPage:setCurrentPage,
            authLoading:loading,
            setAuthLoading:setLoading,
            dispatch:dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}