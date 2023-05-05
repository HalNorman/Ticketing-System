import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {IconButton, Tab} from "@mui/material";
import * as React from "react";
import {useState, useEffect, useCallback} from "react";
import {Tabs} from "@mui/material";
import {TextField} from "@mui/material";
import {Icon} from "@mui/material";
import {Typography, Button} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {Fragment} from "react";
import API from '../API_Interface/API_Interface';
import TempTicketDisplay from "./TempTicketDisplay";
import TicketInstance from "./TicketInstance";
import TicketTemplate from "./TicketTemplate";
import {AccountCircle} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import {FormControl, InputLabel, MenuItem} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ViewTicketInstance from "./ViewTicketInstance";
import GenericTemplate from "./GenericTemplate";





const drawerWidth = 210;


export default function MainDrawer (props) {

    const [ticketInstanceIDs, setTicketInstanceIDs] = useState([]);
    const [ticketTemplateIDs, setTicketTemplateIDs] = useState([]);
    const [ticketOrTemplateDisplay,setTicketOrTemplateDisplay] = useState(null)
    const [reRender,setRerender] = useState(0);


    useEffect(() => {
        const api = new API();

        async function getTickets() {
            console.log("userID: "+ props.user.userID );
            const routesJSONString = await  api.getAllTicketsForUser(props.user.userID);
            console.log(`routes from the DB ${JSON.stringify(routesJSONString)}`);
            setTicketInstanceIDs(routesJSONString.data);
        }
        getTickets();
    }, [reRender]);

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
    const [tabValue, setTabValue] = useState(2); //currently selected tab bar
    const [selectedValue,setSelectedValue] = useState(null) //current view to be displayed in window
    const [isButtonVisible, setIsButtonVisible] = useState(false) //current view to be displayed in window
    const [ticketStatus, setTicketStatus] = useState('active');

    const handleTabChange = (newValue) => {
        if (newValue === "Templates") {
            setTabValue(1);
        }
        else if (newValue === "Tickets") {
            setTabValue(2);
        }
        console.log( "tab value: " + newValue);
    };

    const handleValueSelection = (data,view) => {
        setSelectedValue(data)
        setTicketOrTemplateDisplay(view)
        setIsButtonVisible(true)
    }

    const handlePageClear = () => {
        setSelectedValue(null);
        setTicketOrTemplateDisplay(null);
        setIsButtonVisible(false);
    }

    return(
        <Fragment>
            <Drawer
                variant="permanent"
                PaperProps={{
                    sx: {
                        backgroundColor: "background.default",
                    }
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{  borderRight: "1px solid", }}>
                    <Tabs value={tabValue} centered  aria-label="basic tabs example" >
                        <Tab sx={{borderRight: "1px solid", width: drawerWidth/2,backgroundColor: "background.default" }} label="Tickets " value={1} onClick={() => handleTabChange("Tickets")} color = "secondary"/>
                        <Tab sx={{borderLeft: "1px solid",width: drawerWidth/2, backgroundColor: "background.default"}} label="Templates" value={2} onClick={() => handleTabChange("Templates")} color = "secondary" />
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
                           }}size="small" onChange={(s) => setSearchValue(s.target.value)} >

                </TextField>

                    {tabValue === 1 && //Templates
                        <div>

                        <Box sx={{ overflow: 'auto', border: '1px solid'}} >
                        <List>
                            <ListItem sx={{borderTop: "1px solid",borderBottom: "1px solid"}} key={0} disablePadding >
                                <ListItemButton onClick={() => handleValueSelection(null,"GenericTemplate")}>
                                    <ListItemText primary={"Generic Ticket"}  primaryTypographyProps={{ sx: { marginRight: '5px' }, align: 'center', fontSize: '18px'}}  ></ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </List>
                        </Box>

                        <Box sx={{ overflow: 'auto', border: '1px solid'}} >
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
                        </Box>
                            {props.admin &&
                            <IconButton onClick={() => handleValueSelection(null,"AddTemplate")}>
                                <AddIcon sx={{color: "secondary.main"}} />
                            </IconButton>}
                        </div>

                    }
                    {tabValue === 2 && //Tickets 
                        <div>
                        <Box>
                        <FormControl sx={{display: "flex",border: "1px solid", borderColor: `text.default`}} >
                            <InputLabel id="role-selector"></InputLabel>
                                <Select sx={{flexGrow: 1}}
                                    labelId="role-selector"
                                    id="role-select"
                                    onChange={(event) => setTicketStatus(event.target.value, "role")}
                                    value={ticketStatus}
                                    >
                                <MenuItem value={"all"}>All</MenuItem>
                                <MenuItem value={"active"}>Active</MenuItem>
                                <MenuItem value={"complete"}>Complete</MenuItem>
                            </Select>
                        </FormControl> 
                        </Box>
                        <Box sx={{ overflow: 'auto', border: '1px solid'}} >
                        <List>
                            {ticketInstanceIDs.filter((data) => {
                            
                                return (data.title.toLowerCase().includes(searchValue.toLowerCase()) || (`${data.fName} ${data.lName}`).toLowerCase().includes(searchValue.toLowerCase())) && (data.status === ticketStatus || ticketStatus === 'all')

                            }).map((instance, index) => (
                                <div>
                                    <ListItem sx={{borderBottom: "1px solid",borderTop: "1px solid" }} key={instance} multiline = "true" disablePadding >
                                        <ListItemButton onClick={() => handleValueSelection(instance,"Ticket")}>
                                            <ListItemText primaryTypographyProps={{fontSize: '18px'}} primary={instance.title} secondary ={`${instance.fName} ${instance.lName}`}/>
                                        </ListItemButton>
                                    </ListItem>
                                </div>
                            ))}
                        </List>
                        </Box>
                        </div>
                    }
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                    {ticketOrTemplateDisplay === "Template" &&
                <TicketInstance ticket = {selectedValue} userID = {props.user.userID} userRole={props.user.role} handlePageClear={handlePageClear}/>} 
                {ticketOrTemplateDisplay === "Ticket" &&
                <ViewTicketInstance handlePageClear={handlePageClear}
                                    reRender={reRender}
                                    setRerender={setRerender}
                                    ticket = {selectedValue}
                                    role={props.user.role}/>}
                {ticketOrTemplateDisplay === "AddTemplate" &&
                <TicketTemplate />}
                {ticketOrTemplateDisplay === "GenericTemplate" && <GenericTemplate handlePageClear={handlePageClear} />}
                <Button sx= {{display: isButtonVisible ? 'inline' : 'none', marginTop : '6px' }} variant="contained" color="secondary" onClick={() => handlePageClear()}>Discard</Button>



            </Box>
        </Fragment>
    )
}