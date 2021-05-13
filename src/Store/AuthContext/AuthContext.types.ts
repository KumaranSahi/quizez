import { ReactNode } from "react";

export type Props={
    children?:ReactNode;
}

export type AuthContextType={
    userId:string;
    token:string;
    userName:string;
    image:string;
    dispatch:Action,
    signUpUser:(userData:UserData)=>void,
    signInUser:(emailAndPassword:SigninUser)=>void,
    signOutUser:()=>void,
    currentPage:SigninPages,
    changePassword:(userData:ChangePassword)=>void,
    setCurrentPage:(arg0:SigninPages)=>void,
    authLoading:Boolean
}

export type State={
    userId:string|null;
    token:string|null;
    userName:string|null;
    expiresIn:Date|null;
    image?:string|null;
}

export type Action=
    |{type:"SIGNIN_USER";payload:State;}
    |{type:"SIGNOUT_USER";}

export type SigninPages=
    |"SIGNIN_PAGE"|"SIGNUP_PAGE"|"CHANGE_PASSWORD"

export type UserData={
    name:string;
    email:string;
    password:string;
    image?:string;
    isAdmin?:Boolean;
}

export type SigninUser={
    email:string;
    password:string;
}

export type ChangePassword={
    email:string;
    password:string;
    confirmPassword:string;
}

export type SignedInUserInfo={
    token:string;
    userId:string;
    userName:string;
    expiresIn:Date;
    image?:string;
}