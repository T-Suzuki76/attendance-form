import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, query, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "./firebase"
import { CSVLink } from "react-csv"
import './App.css'

type infoType = {
    name: string
    email: string
    time: Timestamp
    attend: boolean
}

const List = () =>{
    const [admin, setAdmin] = useState<boolean|undefined>(undefined);
    const [list, setList] = useState<infoType[]>()
    const headers = [
        {label: "name", key: "name"},
        {label: "email", key: "email"},
        {label: "attend", key: "attend"},
        {label: "time", key: "time"}
    ]
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setAdmin(true)
            }else{
                setAdmin(false)
            }
        })
        const q = query(collection(db,"participants"));
        onSnapshot(q,(querySnapshot)=>{
            const ary:infoType[] = [];
            querySnapshot.forEach(doc=>{
                ary.push({
                    name: doc.data().name,
                    email: doc.data().email,
                    time: doc.data().time.toDate().toLocaleString(),
                    attend: doc.data().attend
                })
            })
            setList(ary)
        })
    },[])
    return(
        <>
            {admin===false&&admin===undefined?
                    <Container sx={{backgroundColor:"#fff",height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Box 
                            component="div" 
                        >
                            <Typography
                                variant="h1" 
                                component="h1" 
                                sx={{fontSize:"2rem"}} mb={2}
                            >
                                認証情報が正しくありません。
                            </Typography>
                        </Box>
                    </Container>
                :
                    <>  
                        {list!==undefined&&
                            <Button variant="contained" sx={{color:"white",m:2,backgroundColor:"#bbdefb"}}>
                                <CSVLink data={list} headers={headers} filename={"participants-list.csv"} className="csvBtn">
                                    Download in CSV format
                                </CSVLink>
                            </Button>                        
                        }

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 300, width:"100%" }} aria-label="simple table">
                                <TableHead sx={{backgroundColor:"#bbdefb"}}>
                                    <TableRow>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Date</TableCell>
                                        <TableCell align="center">Attendance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {list!==undefined&&
                                        list.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">{row.email}</TableCell>
                                                <TableCell align="center">{row.time}</TableCell>
                                                <TableCell align="center">
                                                    {row.attend?
                                                        <Typography>true</Typography>
                                                        :
                                                        <Typography color="#f44336">false</Typography>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>                    
                    </>

            }
        </>
    )
}

export default List