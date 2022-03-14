import { Alert, Button, Container, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";

const Pre =()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [result, setResult] = useState<boolean|undefined>(undefined);
    const navi = useNavigate();

    const onChangeName=(i:string)=>{setName(i)}
    const onChangeEmail=(i:string)=>{setEmail(i)}
    const setMemberList =async(e:FormEvent)=>{
        e.preventDefault();
        try {
            await setDoc(doc(db,"participants",name),{
                name: name,
                email: email,
                time: serverTimestamp(),
                attend: false
            })
            setResult(true)
            setName("")
            setEmail("")
            navi("/success",{state:{type:"pre"}});
        } catch (error) {
            setResult(false)
        }
    }
    
    return(
        <Container sx={{backgroundColor:"#fff",height:"100vh", display:"flex", alignItems:"center"}}>         
                <Box 
                    component="form" 
                    width={300} sx={{margin:"0 auto"}}
                    onSubmit={(e: FormEvent<Element>)=>setMemberList(e)}
                >
                    <Typography 
                        variant="h1" 
                        component="h1" 
                        sx={{fontSize:"20px"}} mb={2}
                    >
                        Participation Form
                    </Typography>
                    <TextField 
                        color="primary" 
                        variant="filled" 
                        label="Name"
                        type="text"
                        value={name}
                        sx={{width:"100%",mb:2}}
                        onChange={e=>onChangeName(e.target.value)}
                    />
                    <TextField 
                        color="primary" 
                        variant="filled" 
                        label="Email" 
                        type="email" 
                        value={email}
                        sx={{width:"100%",mb:2}}
                        onChange={e=>onChangeEmail(e.target.value)}
                    />
                    <Button 
                        variant="contained" 
                        sx={{ml:0,mr:"auto"}}
                        onClick={(e: FormEvent<Element>)=>setMemberList(e)}
                    >
                        apply
                    </Button>
                    {result===false&&<Alert severity="error">Sorry...failed. Try again.</Alert>}
                </Box>
        </Container>
    )
}

export default Pre