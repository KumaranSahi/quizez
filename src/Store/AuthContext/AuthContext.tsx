import {useContext,createContext,useReducer,FC,useState,useEffect} from 'react'
import {Props,State,Action,SigninPages,UserData,SigninUser,SignedInUserInfo,ChangePassword} from './AuthContext.types'
import {successToast,warningToast,infoToast} from '../../Components/'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

import {ResponseTemplate} from '../../Generics.types'

export const AuthContext=createContext({});

export const useAuth=()=>useContext(AuthContext);

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
    const {push}=useHistory();

    const authReducer=(state:State,action:Action)=>{
        switch (action.type) {
            case "SIGNIN_USER":
                return{
                    ...state,
                    userId:action.payload.userId,
                    token:action.payload.token,
                    userName:action.payload.userName,
                    expiresIn:action.payload.expiresIn,
                    image:action.payload.image
                }
            case "SIGNOUT_USER":
                return{
                    ...state,
                    userId:null,
                    token:null,
                    userName:null,
                    expiresIn:null
                }
            default:
                return state;
        }
    }

    const [state,dispatch]=useReducer(authReducer,initialState)

    const signUpUser=async (userData:UserData)=>{
        setLoading(true)
        try{
            const {data,status}=await axios.post('/api/users/signup',userData);
            if(data.ok){
                successToast("User Added Successfully")
                setCurrentPage("SIGNIN_PAGE")
                setLoading(false)
            }
            else{
                if(+status===208){
                    infoToast("User already exists")
                    infoToast("Please Try loging in")
                }
                else
                    warningToast("Failed to add user")
                setLoading(false)
            }
        }catch(error){
            warningToast("Failed to add user")
            console.log(error)
            setLoading(false)
        }
    }

    const checkAuthTimeout=(expirationTime:number)=>{
        setTimeout(()=>{
            signOutUser()
        },
        expirationTime*1000
        )
    }

    const signOutUser=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem('expiresIn');
        dispatch({
            type:"SIGNOUT_USER"
        })
        setLoading(false)
        push("/")
    }

    const changePassword=async (userData:ChangePassword)=>{
        setLoading(true)
        try{
            const {data}=await axios.post('/api/users/password',userData);
            if(data.ok){
                successToast("Password changed successfully");
                setCurrentPage("SIGNIN_PAGE");
            }
            setLoading(false)
        }catch(error){
            warningToast("Unable to change password please try again later")
            console.log(error)
            setLoading(false)
        }
    }
    const onReload=()=>{
        const token=localStorage.getItem('token');
        let date=localStorage.getItem('expiresIn')
        let expiresIn:Date=new Date();
        if(date)
            expiresIn=new Date(date);
        
        if(expiresIn<=new Date()){
            signOutUser()
        }
        else{
            const userId=localStorage.getItem('userId');
            const userName=localStorage.getItem('userName')
            const image=localStorage.getItem('image')
            checkAuthTimeout((expiresIn.getTime()-new Date().getTime())/1000)
            dispatch({
                type:"SIGNIN_USER",
                payload:{
                    userId:userId,
                    token:token,
                    userName:userName,
                    expiresIn:expiresIn,
                    image:image
                }
            })
        }
        
    }

    const signInUser=async (emailAndPassword:SigninUser)=>{
        setLoading(true)
        try{
            const {data:{data,ok}}=await axios.post<ResponseTemplate<SignedInUserInfo>>('/api/users/signin',emailAndPassword);
            if(ok){
                localStorage.setItem("token",data!.token);
                localStorage.setItem("userId",data!.userId);
                localStorage.setItem("userName",data!.userName);
                data?.image && localStorage.setItem("image",data.image)
                const expiresIn=new Date(new Date().getTime()+3600000);
                localStorage.setItem('expiresIn',""+expiresIn);
                checkAuthTimeout(3600)
                dispatch({
                    type:"SIGNIN_USER",
                    payload:{
                        userId:data!.userId,
                        token:data!.token,
                        userName:data!.userName,
                        expiresIn:new Date(expiresIn)
                    }
                })
                successToast("User Logged in Successfully")
                setLoading(false)
                push("/")
            }
        }catch(error){
            warningToast("Invalid username or password")
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        onReload()
    },[])

    return(
        <AuthContext.Provider value={{
            userId:state.userId,
            token:state.token,
            userName:state.userName,
            expiresIn:state.expiresIn,
            dispatch:dispatch,
            signUpUser:signUpUser,
            signInUser:signInUser,
            signOutUser:signOutUser,
            currentPage:currentPage,
            changePassword:changePassword,
            setCurrentPage:setCurrentPage,
            authLoading:loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}