import classes from './Singup.module.css'
import {useState,SyntheticEvent} from 'react'
import {useAuth} from '../../Store/AuthContext/AuthContext'
import {SigninPages} from '../../Store/AuthContext/AuthContext.types'
import {successToast, warningToast} from '../../Components/'
import {TextField,Button,IconButton,Checkbox} from '@material-ui/core'
import {PhotoCamera} from '@material-ui/icons'
import axios from 'axios'

export const Signup=()=>{

    const {signUpUser,signInUser,currentPage,setCurrentPage,changePassword,setAuthLoading,authLoading}=useAuth()

    const [userName,setUserName]=useState("")
    const [userNameValid,setUserNameValid]=useState(true)

    const [email,setEmail]=useState("")
    const [emailValid,setEmailValid]=useState(true)

    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const [image,setImage]=useState("")
    const [fileUploadInfo,setFileUploadInfo]=useState("")

    const [isAdmin,setIsAdmin]=useState(false)

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

    const fileUpload=async (file:FileList|null)=>{
        const allowedExtensions=new RegExp("^.*(.jpg|.jpeg|.png)")
        if(file && allowedExtensions.test(file[0].name.toLowerCase())&&file[0].size<=4000000){
            try{
                setAuthLoading(true)
                const data=new FormData()
                data.append("file",file[0]);
                data.append("upload_preset","conclave");
                data.append("cloud_name","conclave");
                const {data:imageData}=await axios.post("https://api.cloudinary.com/v1_1/conclave/image/upload",data);
                setImage(imageData.url)
                setAuthLoading(false)
                successToast("Image uploaded successfully")
            }catch(error){
                console.log(error)
                warningToast("Unable to upload image")
            }
        }else{
            setFileUploadInfo("Please upload a .jpg or .png file under 4mb")
        }
    }

    const signUpSubmit=async (event:SyntheticEvent)=>{
        event.preventDefault();
        validateUserName();
        validateEmail();
        if(userNameValid && emailValid){
            signUpUser({
                name:userName,
                email:email,
                password:password,
                image:image,
                isAdmin:isAdmin
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
                            {image?
                            <img
                                src={image}
                                alt="Profile"
                                className={classes["profile-picture"]}
                            /> 
                            :<div>
                                <input accept="image/*" style={{display:"none"}} id="icon-button-file" type="file" onChange={event=>fileUpload(event.target.files)}/>
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                    <span className={classes["upload-profile-picture"]}>Upload Profile picture</span>
                                </label>
                                {fileUploadInfo&&<p className={classes["file-upload-info"]}>{fileUploadInfo}</p>}
                            </div>}
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
                            <label>
                                <Checkbox
                                    onClick={()=>setIsAdmin(state=>!state)}
                                    checked={isAdmin}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                Quiz Creator Account
                            </label>
                            <Button variant="contained" color="primary"  type="submit" disabled={authLoading?true:false}>
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
                            <Button variant="contained" color="primary"  type="submit" disabled={authLoading?true:false}>
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
                            <Button variant="contained" color="primary"  type="submit" disabled={authLoading?true:false}>
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