import { Alert, Button, Container, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";

const Attend =()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [result, setResult] = useState<boolean|undefined>(undefined);
    const [text,setText] = useState("");
    const navi = useNavigate();
    
    const onChangeName=(i:string)=>{setName(i)}
    const onChangeEmail=(i:string)=>{setEmail(i)}
    const checkMemberList =async(e:FormEvent)=>{
        e.preventDefault();
        const docRef = doc(db,"participants",name);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists() && docSnap.data().email===email){
            setResult(true);
            setName("");
            setEmail("");
            await updateDoc(doc(db,"participants",name),{
                attend: true
            })
            navi("/success",{state:{type:"attend"}}); 
        }else if(docSnap.exists() && docSnap.data().email!==email){
            setResult(false);
            setText("wrong email or name!")
        }else{
            setResult(false);
            setText("not exists user data")
        }
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
                        Attendance Form
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
                        onClick={(e: FormEvent<Element>)=>checkMemberList(e)}
                        onSubmit={(e: FormEvent<Element>)=>checkMemberList(e)}
                    >
                        apply
                    </Button>
                    {result===false&&<Alert severity="error" sx={{mt:2}}>{text}</Alert>}
                </Box>
        </Container>
    )
}

export default Attend