import classes from './CreateQuiz.module.css'
import {TextField,IconButton,Button} from '@material-ui/core'
import {useState,SyntheticEvent,ChangeEvent} from 'react'
import {PhotoCamera} from '@material-ui/icons'
import {useQuiz} from '../../Store/QuizContext/QuizContext'
import {useAuth} from '../../Store/AuthContext/AuthContext'
import axios from 'axios'
import {successToast,warningToast} from '../../Components/'

export const CreateQuiz=()=>{

    const [quizName,setQuizName]=useState("")
    const [quizDescription,setQuizDescription]=useState("")

    const [image,setImage]=useState("")
    const [fileUploadInfo,setFileUploadInfo]=useState("")

    const {userName,token,userId}=useAuth()
    const {setQuizLoading,quizLoading,createQuiz,dispatch}=useQuiz()

    const fileUpload=async (file:FileList|null)=>{
        const allowedExtensions=new RegExp("^.*(.jpg|.jpeg|.png)")
        if(file && allowedExtensions.test(file[0].name.toLowerCase())&&file[0].size<=4000000){
            try{
                setQuizLoading(true)
                const data=new FormData()
                data.append("file",file[0]);
                data.append("upload_preset","conclave");
                data.append("cloud_name","conclave");
                const {data:imageData}=await axios.post("https://api.cloudinary.com/v1_1/conclave/image/upload",data);
                setImage(imageData.url)
                setQuizLoading(false)
                successToast("Image uploaded successfully")
            }catch(error){
                console.log(error)
                warningToast("Unable to upload image")
            }
        }else{
            setFileUploadInfo("Please upload a .jpg or .png file under 4mb")
        }
    }

    const quizNameEntered=(event:ChangeEvent)=>{
        const name=(event.target as HTMLInputElement).value;
        setQuizName(name)
        setQuizDescription(`${userName}'s quiz on ${name}`)
    }

    const createQuizSubmitted=(event:SyntheticEvent)=>{
        event.preventDefault()
        if(quizName && quizDescription){
            createQuiz({
                name:quizName,
                description:quizDescription,
                image:image
            },setQuizLoading,token,userId,dispatch)
        }
    }

    return(
        <div className={classes["create-quiz-page"]}>
            <div className={classes["create-quiz-container"]}>
                <h1>
                    Create your quiz!
                </h1>
                <form className={classes["create-quiz-form"]} onSubmit={createQuizSubmitted}>
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
                    <TextField 
                        required 
                        label="Quiz Name" 
                        fullWidth 
                        onChange={quizNameEntered}
                        value={quizName}
                        variant="outlined" 
                    />
                    <TextField
                        required
                        label="Description"
                        multiline
                        fullWidth
                        onChange={event=>setQuizDescription(event.target.value)}
                        value={quizDescription}
                        variant="outlined"
                        rows={4}
                    />
                    <Button type="submit" size="large" variant="contained" color="primary" disabled={quizLoading}>
                        Create
                    </Button>
                </form>
            </div>
        </div>
    )
}