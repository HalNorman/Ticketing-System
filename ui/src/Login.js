//Login.js
//Displays the login screen
import React, {useState, useEffect, Fragment} from 'react';
import API from './API_Interface/API_Interface';
import TitleRenderer from './Logo/TitleRenderer';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';


export default function Login({setUser, title}) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);

    console.log(title);

    const handleInputChange = (label) => event => {
        console.log("handleInputChange called.");

        // event.stopPropagation();
        // event.preventDefault();

        if(label === 'Username')
            setUserName(event.target.value);
        
        else // label === 'Password'
            setPassword(event.target.value)

        setAuthFailed(false);
        setVerifyUser(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    useEffect(() => {
        console.log(password)
        if( ! verifyUser || userName.length === 0)
            return;


        // if(userName === 'admin' && password === 'sudo')
        //     setUser(userName);
        
        // return;
        //need to make call to api for veryfying password as well

        const api = new API();
        async function getUserInfo() {
            api.getUserInfo(userName, password)
                .then( userInfo => {
                console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                const user = userInfo.user;
                if( userInfo.status === "OK" ) {
                    setUser(user);
                    console.log(user);
                } else  {
                    setVerifyUser(false);
                    setAuthFailed(true);
                }
            });
        }
        getUserInfo();
    }, [verifyUser, setUser, userName, password]);


    return (
       <Fragment>
            <Typography variant="h1" display="flex" justifyContent="center" alignItems="center" mt={20}>
               <TitleRenderer/>
            </Typography>
           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={5}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Username"
                    placeholder=""
                    value={userName}
                    onChange={handleInputChange('Username')}
                />
                <Divider />
           </Box>

           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={1}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Password"
                    type="password"
                    placeholder=""
                    value={password}
                    onChange={handleInputChange('Password')}
                />
                <Divider />
           </Box>

           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
           <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {setVerifyUser(true)}}
                >Log in</Button>
           </Box>
       </Fragment>

    );
}
