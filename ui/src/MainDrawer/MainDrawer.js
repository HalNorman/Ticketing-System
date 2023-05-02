import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {IconButton, Tab} from "@mui/material";
import * as React from "react";
import {useState, useEffect} from "react";
import {Tabs} from "@mui/material";
import {TextField} from "@mui/material";
import {Icon} from "@mui/material";
import {Typography} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {Fragment} from "react";
import API from '../API_Interface/API_Interface';
import TempTicketDisplay from "./TempTicketDisplay";
import TicketInstance from "./TicketInstance";
import TicketTemplate from "./TicketTemplate";



const drawerWidth = 210;



export default function MainDrawer (props) {

   const [ticketInstanceIDs, setTicketInstanceIDs] = useState([]);
   const [ticketTemplateIDs, setTicketTemplateIDs] = useState([]);
   const [ticketOrTemplateDisplay,setTicketOrTemplateDisplay] = useState(null)

    useEffect(() => {
        const api = new API();

        async function getTickets() {
            const routesJSONString = await  api.getAllTicketsForUser(props.user.userID);
            console.log(`routes from the DB ${JSON.stringify(routesJSONString)}`);
            setTicketInstanceIDs(routesJSONString.data);
        }



        getTickets();
    }, []);

    useEffect(() => {
        const api = new API();

        async function getTemplates() {
            const templatesJSONString = await  api.getAllTemplates();
            console.log(`routes from the DB ${JSON.stringify(templatesJSONString)}`);
            setTicketTemplateIDs(templatesJSONString.data);
        }



        getTemplates();
        console.log(ticketTemplateIDs)
    }, []);





    console.log('user ', props.user.userID);
    console.log(ticketInstanceIDs);

  
    const [tickets, setTickets] = useState(Array.from({length: 30}, (item,idx) => { //for tickets instances
        return{
            user: "user" + idx,
            name: "ticket" + idx,
            date: "date" + idx,
            otherInfo: "other Info" + idx
        }

    }))

    const  [templates, setTemplates] = useState([]); // ticket templates
    useEffect(() => {
        setTemplates(ticketInstanceIDs.map((ticket) => ({
            ticketID: ticket.ticketID,
            title: ticket.title,
            info: ticket.info,
        })));
      }, [ticketInstanceIDs]);


    const [searchValue, setSearchValue] = useState(""); //value in search bar
    const [tabValue, setTabValue] = useState("Tickets"); //currently selected tab bar
    const [selectedValue,setSelectedValue] = useState(null) //current view to be displayed in window


    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };

    const handleValueSelection = (data,view) => {
        setSelectedValue(data)
        setTicketOrTemplateDisplay(view)

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
                <Box sx={{  borderRight: "1px solid" }}>
                    <Tabs value={tabValue} centered  aria-label="basic tabs example" >
                        <Tab sx={{borderRight: "1px solid", width: drawerWidth/2, }} label="Tickets " value={1} onClick={() => handleTabChange("Tickets")} color = "secondary"/>
                        <Tab sx={{borderLeft: "1px solid",width: drawerWidth/2, }} label="Templates" value={2} onClick={() => handleTabChange("Templates")} color = "secondary" />
                    </Tabs>
                </Box>
                <TextField variant = "standard" sx={{borderTop:"1px solid",borderRight: "1px solid"}}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <Icon>
                                           <SearchIcon sx={{color: "secondary.main"}}/>
                                       </Icon>
                                   </InputAdornment>
                               ),
                           }}size="small" onChange={(s) => setSearchValue(s.target.value)} ></TextField>
                <Box sx={{ overflow: 'auto', border: '1px solid'}} >
                    {tabValue === "Templates" &&
                        <List>
                        {ticketTemplateIDs.filter((obj) => {
                          return obj.title.includes(searchValue);
                        }).map((obj, index) => (
                          <div className="font-link">

                            <ListItem sx={{borderTop: "1px solid",borderBottom: "1px solid"}} key={obj.ticketID} disablePadding >
                              <ListItemButton onClick={() => handleValueSelection(obj,"Template")}>

                                <ListItemText primary={obj.title}  primaryTypographyProps={{fontSize: '18px'}}  ></ListItemText>
                              </ListItemButton>
                            </ListItem>
                          </div>
                        ))}
                      </List>
                    }
                    {tabValue === "Tickets" &&
                        <List>
                            {ticketInstanceIDs.filter((data) => {
                                return data.title.includes(searchValue) || data.username.includes(searchValue)
                            }).map((instance, index) => (
                                <ListItem sx={{borderBottom: "1px solid",borderTop: "1px solid" }} key={instance} multiline = "true" disablePadding >
                                    <ListItemButton onClick={() => handleValueSelection(instance,"Ticket")}>
                                        <ListItemText primaryTypographyProps={{fontSize: '18px'}} primary={instance.title} secondary ={instance.user}/>
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
                    {ticketOrTemplateDisplay === "Ticket" &&
                <TicketInstance ticket = {selectedValue}/>}
                {ticketOrTemplateDisplay === "Template" &&
                <TicketTemplate template = {selectedValue}/>}


            </Box>
        </Fragment>
    )
}