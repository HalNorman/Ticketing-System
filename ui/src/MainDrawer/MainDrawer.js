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

import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {Fragment} from "react";

import TempTicketDisplay from "./TempTicketDisplay";

const drawerWidth = 210;

export default function MainDrawer (props) {

    const [templates,setTemplates] = useState(Array.from({length: 30}, (item,idx) => "template" + idx))
    const [tickets,setTickets] = useState(Array.from({length: 30}, (item,idx) => {
        return{
            user: "user" + idx,
            name: "ticket" + idx,
            date: "date" + idx,
            otherInfo: "other Info" + idx
        }

    }))
    const [searchValue, setSearchValue] = useState("");
    const [tabValue, setTabValue] = useState("Tickets");
    const [selectedValue,setSelectedValue] = useState(null)
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setTabValue(index);
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
                        <Tab sx={{border: "1px solid lightgray"}} label="Tickets " value={1} onClick={() => handleTabChange("Tickets")}/>
                        <Tab sx={{border: "1px solid lightgray"}} label="Templates" value={2} onClick={() => handleTabChange("Templates")} />
                    </Tabs>
                </Box>
                <TextField variant = "standard"
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
                                <ListItem sx={{border: "1px solid lightgray"}} key={text} disablePadding >
                                    <ListItemButton onClick={() => handleValueSelection(text)}>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    }
                    {tabValue === "Tickets" &&
                        <List>
                            {tickets.filter((data) => {
                                return data.user.includes(searchValue) || data.name.includes(searchValue)
                            }).map((text, index) => (
                                <ListItem sx={{border: "1px solid lightgray"}} key={text} multiline = "true" disablePadding >
                                    <ListItemButton onClick={() => handleValueSelection(text.user + " " + text.name)}>
                                        <ListItemText primary={text.name} secondary ={text.user}/>
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
                <TempTicketDisplay selectedValue={selectedValue}>
                </TempTicketDisplay>
            </Box>

        </Fragment>

    )
}