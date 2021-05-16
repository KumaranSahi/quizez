import {State,Action,UserData,SigninPages,ChangePassword,SigninUser,SignedInUserInfo} from './AuthContext.types'
import {Dispatch,SetStateAction} from 'react'
import {ResponseTemplate} from '../../Generics.types'
import axios from 'axios'
import {successToast,warningToast,infoToast} from '../../Components/'

export const authReducer=(state:State,action:Action)=>{
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

export const signUpUser=async (userData:UserData,setLoading:Dispatch<SetStateAction<boolean>>,setCurrentPage:Dispatch<SetStateAction<SigninPages>>)=>{
    setLoading(true)
    try{
        const {data,status}=await axios.post<ResponseTemplate>('/api/users/signup',userData);
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

export const checkAuthTimeout=(expirationTime:number,dispatch:Dispatch<Action>,setLoading:Dispatch<SetStateAction<boolean>>)=>{
    setTimeout(()=>{
        signOutUser(dispatch,setLoading)
    },
    expirationTime*1000
    )
}

export const signOutUser=(dispatch:Dispatch<Action>,setLoading:Dispatch<SetStateAction<boolean>>)=>{
    // const {push}=useHistory();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('image')
    dispatch({
        type:"SIGNOUT_USER"
    })
    setLoading(false)
    // push("/")
}

export const changePassword=async (userData:ChangePassword,setLoading:Dispatch<SetStateAction<boolean>>,setCurrentPage:Dispatch<SetStateAction<SigninPages>>)=>{
    setLoading(true)
    try{
        const {data}=await axios.post<ResponseTemplate>('/api/users/password',userData);
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

export const onReload=(dispatch:Dispatch<Action>,setLoading:Dispatch<SetStateAction<boolean>>)=>{
    const token=localStorage.getItem('token');
    let date=localStorage.getItem('expiresIn')
    let expiresIn:Date=new Date();
    if(date)
        expiresIn=new Date(date);
    
    if(expiresIn<=new Date()){
        signOutUser(dispatch,setLoading)
    }
    else{
        const userId=localStorage.getItem('userId');
        const userName=localStorage.getItem('userName')
        const image=localStorage.getItem('image')
        checkAuthTimeout((expiresIn.getTime()-new Date().getTime())/1000,dispatch,setLoading)
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

export const signInUser=async (emailAndPassword:SigninUser,dispatch:Dispatch<Action>,setLoading:Dispatch<SetStateAction<boolean>>)=>{
    setLoading(true)
    // const {push}=useHistory();
    try{
        const {data:{data,ok}}=await axios.post<ResponseTemplate<SignedInUserInfo>>('/api/users/signin',emailAndPassword);
        if(ok){
            localStorage.setItem("token",data!.token);
            localStorage.setItem("userId",data!.userId);
            localStorage.setItem("userName",data!.userName);
            data?.image && localStorage.setItem("image",data.image)
            const expiresIn=new Date(new Date().getTime()+3600000);
            localStorage.setItem('expiresIn',""+expiresIn);
            checkAuthTimeout(3600,dispatch,setLoading)
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
            // push("/")
        }
    }catch(error){
        warningToast("Invalid username or password")
        console.log(error)
        setLoading(false)
    }
}