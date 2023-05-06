//AppBar.js
//Component for AppBar of the homepage
import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import StyleIcon from '@mui/icons-material/Style';
import {Fragment} from "react";


import SettingsIcon from '@mui/icons-material/Settings';
import {AccountCircle} from "@mui/icons-material";
import {FormControlLabel, IconButton, Typography} from "@mui/material";
import {Switch} from "@mui/material";

import {useState} from "react";

export default function MenuAppBar(props) {


    const [checked,setChecked] = useState(true)
    const handleChange = (event) => {
        setChecked(event.target.checked);
        props.adminSwitch();
    }

    const displaySwitch = (user) => {
        if(user.role === 'admin'){
            return <FormControlLabel control={
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    color = "default"
                    >
                    </Switch>} label="Admin" sx={{color: "secondary.main"}}/>;
        }
        else {
            return <Typography variant = "h5" sx={{color:"secondary.main"}}>{`Hello ${user.fName} ${user.lName}`}</Typography>;
        }
    }

    return (
        <Box>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
                <Toolbar>
                    <img src = {require('../TicketLogo2-export.png')} alt = "logo " onClick={() => props.handlePageChange("MainDrawer")}/>
                    {displaySwitch(props.user)}
                    <Box sx = {{flexGrow: 1}}></Box>
                    {props.admin &&
                        <Fragment>
                            <IconButton onClick={() => props.handlePageChange("TagEditor")}>
                                <StyleIcon sx={{color: "secondary.main"}}/>
                            </IconButton>
                            <IconButton onClick={() => props.handlePageChange("Settings")}>
                                <SettingsIcon sx={{color: "secondary.main"}} />
                            </IconButton>
                        </Fragment>
                    }
                    <IconButton onClick={() => props.handlePageChange("Profile")}>
                        <AccountCircle sx={{color: "secondary.main"}} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}