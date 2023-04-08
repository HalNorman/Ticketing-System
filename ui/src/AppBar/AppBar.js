import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import {Fragment} from "react";


import SettingsIcon from '@mui/icons-material/Settings';
import {AccountCircle} from "@mui/icons-material";
import {FormControlLabel, IconButton} from "@mui/material";
import {Switch} from "@mui/material";

import {useState} from "react";


export default function MenuAppBar(props) {


    const [checked,setChecked] = useState(true)
    const handleChange = (event) => {
        setChecked(event.target.checked)
        props.adminSwitch();
    }
    return (
        <Box>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
                <Toolbar>
                    <img src = {require('../TicketLogo2-export.png')} alt = "logo "/>
                    <FormControlLabel control={
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            color = "default"
                        >
                        </Switch>} label="Admin" />
                    <Box sx = {{flexGrow: 1}}></Box>
                    {props.admin &&
                        <Fragment>
                            <IconButton>
                                <AddIcon/>
                            </IconButton>
                            <IconButton>
                                <SettingsIcon/>
                            </IconButton>
                        </Fragment>
                    }
                    <IconButton>
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}