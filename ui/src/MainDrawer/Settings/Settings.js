import {Button, FormControl, InputLabel, MenuItem, Typography, Box, TextField, styled, Paper} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
/*
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
*/
import React, {useState, useEffect, Fragment} from 'react';
import API from "../../API_Interface/API_Interface";
/*
const userTable = [
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
*/
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



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
    const [userTable, setUserTable] = React.useState([]);
    
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
        }
    ]
    /* 
    useEffect(() => {
        async function getUsers() {
            const userJSON = await api.viewUsers();
        }
    });*/

    function editUser(str, value){
        let newUser = user;
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
    
    async function setNewTheme(primary,secondary,text) {
        console.log("hello")
        await api.setTheme(primary,secondary,text);
        props.handleThemeChange(primary,secondary,text);
    }
    async function addUser(){
        if(user.fName !== '' && user.lName !== '' && user.role !== '' && user.username !== '' && user.pass !== '' ){
            await api.addUser(user);
        }
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
            <Fragment>
            <Item sx={{my:8, flexDirection: "up",marginLeft: "5px"}}>
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
                </Item>
                <Item sx={{my:8, flexDirection: "up", marginLeft: "5px"}}>
                    Add a new user
                <Box
                    component="form"
                    sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off">
                <TextField id="fName" label="First Name" variant="outlined" onChange={(event) => editUser(event.target.value, "fName")}/>
                <TextField id="lName" label="Last Name" variant="outlined" onChange={(event) => editUser(event.target.value, "lName")}/>
                <FormControl fullWidth>
                <InputLabel id="role-selector">Role</InputLabel>
                    <Select
                        labelId="role-selector"
                        id="role-select"
                        value={user.role}
                        label="role"
                        onChange={(event) => editUser(event.target.value, "role")}
                        >
                            <MenuItem value={"employee"}>Employee</MenuItem>
                            <MenuItem value={"user"}>User</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="username" label="Username" variant="outlined" onChange={(event) => editUser(event.target.value, "username")}/>
                <TextField id="password" label="Password" variant="outlined" onChange={(event) => editUser(event.target.value, "password")}/>
                <Button onClick={() => addUser()}variant="contained">Select</Button>
                </Box>
                </Item>
                <Item>

                </Item>
            </Fragment>

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