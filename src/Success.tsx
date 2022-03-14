import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Success =()=>{
    const location = useLocation()
    const [prePage, setPrePage] = useState<{type:string}>(location.state as {type: string})

    return(
        <Container sx={{backgroundColor:"#fff",height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Box 
                component="div" 
                
            >
                {prePage.type==="pre"&&
                    <>
                        <Typography 
                            variant="h1" 
                            component="h1" 
                            sx={{fontSize:"2rem"}} mb={2}
                        >
                            Thank you.
                        </Typography>
                        <Typography>Apply is complete.</Typography>
                        <Typography>Contact us with any questions.:test@example.com</Typography>
                    </>
                }
                {prePage.type==="attend"&&
                    <>
                        <Typography 
                            variant="h1" 
                            component="h1" 
                            sx={{fontSize:"2rem"}} mb={2}
                        >
                            Thank you.
                        </Typography>
                        <Typography>Confirmation is complete.</Typography>
                        <Typography>Contact us with any questions.:test@example.com</Typography>
                    </>
                }
            </Box>
            
        </Container>
    )
}

export default Success;