import {Button, FormControl, InputLabel, MenuItem, Typography, Box, TextField, Paper} from "@mui/material";
import Select from '@mui/material/Select';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/joy/Stack';

import React, {useEffect, Fragment} from 'react';
import API from "../../API_Interface/API_Interface";



const userTableCols = [
    {
        title: 'UserID',
        attributeDBName: 'userID',
        align: 'left'
    },{
        title: 'First Name',
        attributeDBName: 'fName',
        align: 'left'
    },
    {
        title: 'Last Name',
        attributeDBName: 'lName',
        align: 'left'
    },
    {
        title: 'Role',
        attributeDBName: 'role',
        align: 'left'
    },
    {
        title: 'Username',
        attributeDBName: 'username',
        align: 'left'
    },
    {
        title: 'Password',
        attributeDBName: 'password',
        align: 'left'
    }
];

export default function Settings(props) {
    
    const api = new API();
    const [user, setUser] = React.useState(() => 
    {
        return {
        fName: '',
        lName: '',
        role: '',
        username: '',
        password: ''
    }});
    const [updateView, setUpdateView] = React.useState(1);
    const [userTable, setUserTable] = React.useState([]);
    
    const themes =[
        
        {


            primary: "242f40",
            secondary: "cca43b",
            text: "363636",
            background:"F6F1F1"
        },
        {

            primary: "F1F6F9",
            secondary: "394867",
            text: "212A3E",
            background:"9BA4B5"
        },
        {
            primary: "393646",
            secondary: "4F4557",
            text: "6D5D6E",
            background:"F4EEE0"
        },
        {
            primary: "2C3333",
            secondary: "2E4F4F",
            text: "0E8388",
            background:"CBE4DE"
        },
        {
            primary: "301E67",
            secondary: "5B8FB9",
            text: "B6EADA",
            background:"03001C"
        },
        {
            primary: "3C2A21",
            secondary: "D5CEA3",
            text: "E5E5CB",
            background:"1A120B"
        },

    ]
    
    
    


    useEffect(() => {
        async function getUsers() {
            const userJSON = await api.viewUsers();
            console.log(`usertable from the json ${JSON.stringify(userJSON.data)}`);
            setUserTable(userJSON.data);
        }
        getUsers();
    }, [updateView]);

    function editUser(str, value){
        let newUser = {
            fName: user.fName,
            lName: user.lName,
            role: user.role,
            username: user.username,
            password: user.password
        };
        console.log(`setting ${value} to ${str}`);
        if(value === 'fName'){
            newUser.fName = str;                
        }
        else if(value === 'lName'){
            newUser.lName = str;
        }
        else if(value === 'role'){
            newUser.role = str;
        }
        else if(value === 'username'){
            newUser.username = str;
        }
        else if(value === 'password'){
            newUser.password = str;
        }
        setUser(newUser);
    }
    
    const TRow = ({userObject}) => {
        return <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            {userTableCols.map((attr, idx) =>
                <TableCell key={idx}
                    align="left">
                    {
                        userObject[attr.attributeDBName]
                    }
                    </TableCell>)
                }
                {displayDeleteButton(userObject)}
        </TableRow>
    }


    function makeTable(){
        console.log(userTable.length)
        return <Fragment>
                    {
                    userTable.length > 0 &&
                    <TableContainer component={Paper} >
                        <Table sx={{midWidth: 650,   '&:nth-of-type(odd)': {
                                backgroundColor: "background.default",
                            },}} aria-label="User Table" >
                            <TableHead>
                                <TableRow>
                                    {
                                        userTableCols.map((attr, idx) => 
                                        <TableCell key={idx} align="left" sx={{paddingRight: 5}}>
                                            {attr.title}
                                        </TableCell>)
                                    }
                                    <TableCell align="left" sx={{paddingRight: 5}} >
                                        Remove User
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    userTable.map((userObject, idx) => (

                                        <TRow userObject={userObject} key={idx}/>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Fragment>
    }
    
    function displayDeleteButton(userObject){
        if(userObject.role !== 'admin'){
            return <TableCell align="left">
                    <Button   onClick={() => deleteUser(userObject.userID)}variant="contained">Delete User</Button>
                   </TableCell>
        }
        else{
            return  <TableCell>
                    Cannot Delete Admin
                    </TableCell>
        }
    }

    async function setNewTheme(primary,secondary,text,background) {
        console.log("hello")
        await api.setTheme(primary,secondary,text,background);
        props.handleThemeChange(primary,secondary,text,background);
    }


    async function addUser(){
        if(user.fName !== '' && user.lName !== '' && user.role !== '' && user.username !== '' && user.password !== '' ){
            await api.addUser(user);
            setUpdateView(updateView + 1);
        }
    }

    async function deleteUser(user_id){
        await api.deleteUser(user_id);
        setUpdateView(updateView + 1);
    }

        return(
            <Box sx= {{flexGrow:1,p: 3 }} >
                <Box sx={{my:8, flexDirection: "up",marginLeft: "5px"}}>
                    <Typography variant = "h5">
                        Theme Select
                    </Typography>
                {themes.map((theme,idx) => (
                    <Box key={theme.primary}
                         sx={{
                             alignItems: "center",
                             my: 1,
                             p: 1,
                             border: "1px solid",
                             backgroundColor: `#${theme.background}`
                                 }}
                    >
                        <Stack direction = "row" justifyContent="space-between">
                        <Typography sx={{color: `#${theme.primary}`}}>
                            Primary:
                        </Typography>
                        <Box sx={{
                            my: 1,
                            p: 1,
                            border: "1px solid",
                            width: "25vh"
                        }} bgcolor={'#' + theme.primary} />
                        <Typography  sx={{color: `#${theme.primary}`}}>
                            Secondary:
                        </Typography>
                        <Box sx={{
                            my: 1,
                            p: 1,
                            border: "1px solid ",
                            width: "25vh"
                        }} bgcolor={'#' + theme.secondary}/>
                        <Typography  sx={{color: `#${theme.primary}`}}>
                            Text:
                        </Typography>
                        <Box sx={{
                            my: 1,
                            p: 1,
                            border: "1px solid",
                            width: "25vh"
                        }} bgcolor={'#' + theme.text}/>
                        <Button sx={{backgroundColor: `#${theme.secondary}`}} onClick={() => setNewTheme(theme.primary,theme.secondary,theme.text,theme.background)}variant="contained">Select</Button>
                        </Stack>
                    </Box>
                ))}
                </Box>
                <Box   sx={{my:8, marginLeft: "5px",border: "1px solid"}} >
                    <Typography variant = "h5">
                        Add User
                    </Typography>
                <Box

                    component="form"
                    noValidate
                    autoComplete="off"
                justifyContent="space-between"
                sx={{marginTop: "5px", }} padding="20px">
                    <Stack direction="row" justifyContent="space-between">
                <TextField id="fName" label="First Name" variant="outlined" onChange={(event) => editUser(event.target.value, "fName")}/>
                <TextField id="lName" label="Last Name" variant="outlined" onChange={(event) => editUser(event.target.value, "lName")}/>
                <FormControl  sx={{width: "20vh"}} >
                <InputLabel id="role-selector">Role</InputLabel>
                    <Select
                        labelId="role-selector"
                        id="role-select"
                        label="role"
                        onChange={(event) => editUser(event.target.value, "role")}
                        value={user.role}
                        >
                            <MenuItem value={"employee"}>Employee</MenuItem>
                            <MenuItem value={"user"}>User</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="username" label="Username" variant="outlined" onChange={(event) => editUser(event.target.value, "username")}/>
                <TextField id="password" label="Password" variant="outlined" onChange={(event) => editUser(event.target.value, "password")}/>
                <Button onClick={() => addUser()}variant="contained">Add User</Button>
                    </Stack>
                </Box>
                </Box>
                <Box sx={{border: "1px solid"}}>
                    {makeTable()}
                </Box>
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