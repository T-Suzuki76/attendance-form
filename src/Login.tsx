import { Container, Box, Typography, TextField, Button } from "@mui/material"
import { FormEvent, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Login =()=>{
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const navi = useNavigate();
    const onChangePass=(i:string)=>{setPass(i)}
    const onChangeEmail=(i:string)=>{setEmail(i)}
    const checkAuth = (e:FormEvent) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            navi("/list");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode}:${errorMessage}`);
        });
    }
    return(
        <Container sx={{backgroundColor:"#fff",height:"100vh", display:"flex", alignItems:"center"}}>         
                <Box 
                    component="form"
                    width={300} sx={{margin:"0 auto"}}
                >
                    <Typography 
                        variant="h1" 
                        component="h1" 
                        sx={{fontSize:"20px"}} mb={2}
                    >
                        Admin Sign In
                    </Typography>
                    <TextField 
                        color="primary" 
                        variant="filled" 
                        label="Email" 
                        type="email" 
                        value={email}
                        sx={{width:"100%",mb:2}}
                        onChange={e=>onChangeEmail(e.target.value)}
                    />
                    <TextField 
                        color="primary" 
                        variant="filled" 
                        label="Password"
                        type="text"
                        value={pass}
                        sx={{width:"100%",mb:2}}
                        onChange={e=>onChangePass(e.target.value)}
                    />
                    <Button 
                        variant="contained" 
                        sx={{ml:0,mr:"auto"}}
                        onClick={(e: FormEvent<Element>)=>checkAuth(e)}
                        onSubmit={(e: FormEvent<Element>)=>checkAuth(e)}
                    >
                        Sign In
                    </Button>
                </Box>
        </Container>
    )
}

export default Login