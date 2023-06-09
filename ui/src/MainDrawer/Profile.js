import {Button, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import {Fragment, useState} from "react";
import API from "../API_Interface/API_Interface";
import Snack from "../HomePage/SnackBar.js"
import Snackbar from "@mui/material/Snackbar";
export default function Profile(props) {
    const api = new API();

    const [userName,setUserName] = useState("");
    const [confirmUserName,setConfirmUsername] = useState("");

    const [passWord,setPassword] = useState("");
    const [confirmPassWord,setConfirmPassWord] = useState("");

    const [authFailed, setAuthFailed] = useState(false);

    const [openSnack,setOpenSnack] = useState(false);
    const [snackMessage,setSnackMessage] = useState("")

    async function changeCredentials() {
        console.log("hello")
        console.log(userName,passWord)
        if(passWord === '' || userName === ''){
            setSnackMessage("Username or password empty");
            setOpenSnack(true);
            setAuthFailed(true);
        }
        else if(passWord !== confirmPassWord || userName !== confirmUserName) {
            setSnackMessage("Fields Dont Match");
            setOpenSnack(true);
            setAuthFailed(true);
        }
        else{
            await api.editUserNamePassword({username: userName, password: passWord, userID: props.user.userID});
            setSnackMessage("Changed Credentials");
            setOpenSnack(true)
            setAuthFailed(false);
        }
    }

    const handleSubmit = () => {
        setOpenSnack(true);
    }
    const callTwoFunctions = (s,func) => {
        switch(func) {
            case 'username':
                setUserName(s);
                break;
            case 'setUsername':
                setConfirmUsername(s);
                break;
            case 'password':
                setPassword(s);
                break;
            case 'setPassword':
                setConfirmPassWord(s);
                break;
            default:
            // code block
        }
        setAuthFailed(false);

    }

    return(
        <Box sx ={{ flexGrow: 1, marginLeft: '60vh',marginRight: '60vh'}}>
            <Stack spacing={2}>
            <Toolbar/>
            <Typography variant = "h3">
                Change Credentials
            </Typography>
            <TextField  onChange={(s) => callTwoFunctions(s.target.value,'username')}            sx={{
            }} label = "Username" variant = "filled" error = {authFailed}/>
            <TextField  onChange={(s) => callTwoFunctions(s.target.value,'setUsername')}  label = "Confirm Username" variant = "filled" error = {authFailed}/>

            <TextField onChange={(s) => callTwoFunctions(s.target.value,'password')}                sx={{
            }} label = "Password" variant = "filled" error = {authFailed}/>
                <TextField    onChange={(s) => callTwoFunctions(s.target.value,'setPassword')}        sx={{
                }} label = "Confirm Password" variant = "filled" error = {authFailed}/>
            <Button variant="contained" onClick={() => changeCredentials()} >
                Change Credentials
            </Button>
                <Snack open={openSnack} setOpen={setOpenSnack} message={snackMessage}/>
            </Stack>
        </Box>
    )
}