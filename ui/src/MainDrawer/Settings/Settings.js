import {Button, Select, Typography} from "@mui/material";
import Box from "@mui/material/Box";

import React, {useState, useEffect, Fragment} from 'react';
import API from "../../API_Interface/API_Interface";


export default function Settings(props) {
    const api = new API();


        const themes =[
            {
                    primary: "2011a2",
                    secondary: "55e7ff",
                    text: "ff34b3",
            },
            {
                primary: "242f40",
                secondary: "cca43b",
                text: "363636",
            },
            {
                primary: "ec4e20",
                secondary: "ff9505",
                text: "016fB9",
            },

        ]

        async function setNewTheme(primary,secondary,text) {
            console.log("hello")
            await api.setTheme(primary,secondary,text);
            props.handleThemeChange(primary,secondary,text);
        }


        const ColorBox = (text,color) => {
            return(
                <Fragment>
                    <Typography>
                        {text}:
                            </Typography>
                                <Box sx={{
                                    my: 1,
                                    p: 1,
                                    border: "1px solid black",
                                    bgcolor: color.primary
                                }} />
                </Fragment>
        )
        }

        return(
            <Box sx={{my:8, flexDirection: "up",marginLeft: "5px"}}>
                {themes.map((theme,idx) => (
                    <Box key={theme.primary}
                         sx={{
                             display: "flex",
                             alignItems: "center",
                             my: 1,
                             p: 1,
                             border: "1px solid",
                         }}
                    >
                        <Typography>
                            Primary:
                        </Typography>
                        <Box sx={{
                            my: 1,
                            p: 1,
                            border: "1px solid",
                        }} bgcolor={'#' + theme.primary} />
                        <Typography>
                            Secondary:
                        </Typography>
                        <Box sx={{
                            my: 1,
                            p: 1,
                            border: "1px solid ",
                        }} bgcolor={'#' + theme.secondary}/>
                        <Typography>
                            Text:
                        </Typography>
                        <Box sx={{
                            my: 1,
                            p: 1,
                            border: "1px solid",

                        }} bgcolor={'#' + theme.text} marginRight={3}/>
                        <Button  onClick={() => setNewTheme(theme.primary,theme.secondary,theme.text)}variant="contained">Select</Button>

                    </Box>
                ))}

            </Box>

        )
/*
    return(
        <Box sx={{my:8}}>
            <IconButton>
                <HistoryIcon onClick={()=>setNewTheme()}/>
            </IconButton>
        </Box>
    )
*/



}