import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {IconButton, Tab} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {Tabs} from "@mui/material";
import {TextField} from "@mui/material";
import {Icon} from "@mui/material";
import {Typography} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {Fragment} from "react";

import TempTicketDisplay from "./TempTicketDisplay";
import TicketInstance from "./TicketInstance";

const drawerWidth = 210;

export default function MainDrawer (props) {

    const [templates,setTemplates] = useState(Array.from({length: 30}, (item,idx) => "template" + idx)) // for ticket templates
    const [tickets,setTickets] = useState(Array.from({length: 30}, (item,idx) => { //for tickets instances
        return{
            user: "user" + idx,
            name: "ticket" + idx,
            date: "date" + idx,
            otherInfo: "other Info" + idx
        }

    }))
    const [searchValue, setSearchValue] = useState(""); //value in search bar
    const [tabValue, setTabValue] = useState("Tickets"); //currently selected tab bar
    const [selectedValue,setSelectedValue] = useState(null) //current view to be displayed in window

    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };

    const handleValueSelection = (text) => {
        setSelectedValue(text)
    }

    return(
        <Fragment>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ borderColor: 'divider' }}>
                    <Tabs value={tabValue} centered  aria-label="basic tabs example">
                        <Tab sx={{border: "1px solid lightgray", width: drawerWidth/2}} label="Tickets " value={1} onClick={() => handleTabChange("Tickets")}/>
                        <Tab sx={{border: "1px solid lightgray", width: drawerWidth/2}} label="Templates" value={2} onClick={() => handleTabChange("Templates")} />
                    </Tabs>
                </Box>
                <TextField variant = "standard" sx={{borderTop:"1px solid lightgray" }}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <Icon>
                                           <SearchIcon />
                                       </Icon>
                                   </InputAdornment>
                               ),
                           }}size="small" onChange={(s) => setSearchValue(s.target.value)} ></TextField>
                <Box sx={{ overflow: 'auto', border: '1px solid lightgray'}} >
                    {tabValue === "Templates" &&
                        <List>
                            {templates.filter((data) => {
                                return data.includes(searchValue);
                            }).map((text, index) => (
                                <div className="font-link">
                                <ListItem sx={{borderTop: "1px solid lightgray"}} key={text} disablePadding >
                                    <ListItemButton onClick={() => handleValueSelection(text)}>
                                            <ListItemText primary={text}  primaryTypographyProps={{fontSize: '18px'}}  ></ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                </div>
                            ))}
                        </List>
                    }
                    {tabValue === "Tickets" &&
                        <List>
                            {tickets.filter((data) => {
                                return data.user.includes(searchValue) || data.name.includes(searchValue)
                            }).map((text, index) => (
                                <ListItem sx={{borderTop: "1px solid lightgray"}} key={text} multiline = "true" disablePadding >
                                    <ListItemButton onClick={() => handleValueSelection(text.user + " " + text.name)}>
                                        <ListItemText primaryTypographyProps={{fontSize: '18px'}} primary={text.name} secondary ={text.user}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    }
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />

                <TicketInstance/> //this is the component that will be displayed in the main window, we could pass this the selectedValue state variable

            </Box>
        </Fragment>
    )
}