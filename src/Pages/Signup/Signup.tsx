import classes from './Singup.module.css'
import {useState,SyntheticEvent} from 'react'
import {useAuth} from '../../Store/AuthContext/AuthContext'
import {SigninPages} from '../../Store/AuthContext/AuthContext.types'
import {warningToast} from '../../Components/'
import {TextField,Button} from '@material-ui/core'

export const Singup=()=>{

    const {signUpUser,signInUser,currentPage,setCurrentPage,changePassword}=useAuth()

    const [userName,setUserName]=useState("")
    const [userNameValid,setUserNameValid]=useState(true)

    const [email,setEmail]=useState("")
    const [emailValid,setEmailValid]=useState(true)

    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const validateUserName=()=>{
        if(userName.length===0)
            setUserNameValid(false)
        else
            setUserNameValid(true)
    }
    
    const validateEmail=()=>{
        if(email.length>0 && new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email))
            setEmailValid(true)
        else
            setEmailValid(false)
    }

    const signUpSubmit=async (event:SyntheticEvent)=>{
        event.preventDefault();
        validateUserName();
        validateEmail();
        if(userNameValid && emailValid){
            signUpUser({
                name:userName,
                email:email,
                password:password
            })
        }
    }

    const signInSubmit=async (event:SyntheticEvent)=>{
        event.preventDefault();
        validateEmail();
        if(emailValid)
            signInUser({
                email:email,
                password:password
            })
    }

    const changePasswordSubmit=async (event:SyntheticEvent)=>{
        event.preventDefault();
        validateEmail();
        if(password===confirmPassword){
            changePassword({
                email:email,
                password:password,
                confirmPassword:confirmPassword
            })
        }else{
            warningToast("Passwords do not match")
        }
    }

    const pageToRender=(currentPage:SigninPages)=>{
        switch (currentPage) {
            case "SIGNUP_PAGE":
                return(
                    <>
                        <h1>
                            Sign Up:
                        </h1>
                        <form 
                            className={classes["signup-container"]}
                            onSubmit={signUpSubmit}
                        >
                            <div>
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={userName}
                                    onChange={event=>setUserName(event.target.value)}
                                />
                                {!userNameValid&&<p className={classes["error-text"]}>Please enter a valid user name</p>}
                            </div>
                            <div>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    required
                                    fullWidth
                                    value={email}
                                    onChange={event=>setEmail(event.target.value)}
                                />
                                {!emailValid&&<p className={classes["error-text"]}>Please enter a valid email</p>}
                            </div>
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                required
                                fullWidth
                                value={password}
                                onChange={event=>setPassword(event.target.value)}
                            />
                            <Button variant="contained" color="primary"  type="submit">
                                Sign up!
                            </Button>
                        </form>
                    </>
                )
            case "SIGNIN_PAGE":
                return(
                    <>
                        <h1>
                            Sign In:
                        </h1>
                        <form 
                            className={classes["signup-container"]}
                            onSubmit={signInSubmit}
                        >
                            <div>
                                <TextField
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={email}
                                    onChange={event=>setEmail(event.target.value)}
                                />
                                {!emailValid&&<p className={classes["error-text"]}>Please enter a valid email</p>}
                            </div>
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                required
                                value={password}
                                onChange={event=>setPassword(event.target.value)}
                            />
                            <Button variant="contained" color="primary"  type="submit">
                                Sign In
                            </Button>
                        </form>
                    </>
                )
            case "CHANGE_PASSWORD":
                return(
                    <>
                        <h1>
                            Change Password:
                        </h1>
                        <form 
                            className={classes["signup-container"]}
                            onSubmit={changePasswordSubmit}
                        >
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                required
                                fullWidth
                                value={email}
                                onChange={event=>setEmail(event.target.value)}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                required
                                value={password}
                                onChange={event=>setPassword(event.target.value)}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                required
                                fullWidth
                                value={confirmPassword}
                                onChange={event=>setConfirmPassword(event.target.value)}
                            />
                            <Button variant="contained" color="primary"  type="submit">
                                Change Password
                            </Button>
                        </form>
                    </>
                )
            default:
                <p>Something went wrong</p>
        }
    }

    return (
        <div className={classes["signup-page-container"]}>
            <div className={classes["signin-signup-container"]}>
                {pageToRender(currentPage)}
                {currentPage==="SIGNIN_PAGE"&&<p className={classes["switch-page"]} onClick={()=>setCurrentPage("CHANGE_PASSWORD")}>Forgot Password</p>}
                {currentPage==="SIGNIN_PAGE"?<p className={classes["switch-page"]} onClick={()=>setCurrentPage("SIGNUP_PAGE")}>New to Pix? Sign up!</p>:
                <p className={classes["switch-page"]} onClick={()=>setCurrentPage("SIGNIN_PAGE")}>Already have an Account? Sign In!</p>}
            </div>
        </div>
    )
}