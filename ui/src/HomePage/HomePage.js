//HomePage.js
//Component for the main overall homepage of the app
import MenuAppBar from "../AppBar/AppBar";
import Box from "@mui/material/Box";
import MainDrawer from "../MainDrawer/MainDrawer";
import TagEditor from "..//MainDrawer/TagEditor";
import Settings from "../MainDrawer/Settings/Settings"
import Profile from "../MainDrawer/Profile"
import AddTemplate from "../MainDrawer/AddTemplate";
import React, {useState, useEffect} from "react";
import API from "../API_Interface/API_Interface";
import {createTheme,ThemeProvider} from "@mui/material";

export default function HomePage(props) {

    const [admin,setAdmin] = useState(true);
    const [page,setPage] = useState("MainDrawer");
    const [theme,setTheme] = useState()

    useEffect(() => {
        const api = new API();
        async function getTheme() {
            await api.getTheme()
                .then(newTheme => {
                    console.log(`api gets theme: ${JSON.stringify(newTheme)}`);
                    //setTheme(theme.data);
                    const themeData = newTheme.data;
                    console.log("Primary: " + newTheme.data[0].primaryColor);
                    console.log("Secondary: " + newTheme.data[0].secondaryColor);
                    setTheme(createTheme({
                        palette: {
                            primary: {
                                main: '#'+themeData[0].primaryColor,
                            },
                            secondary: {
                                main: '#'+themeData[0].secondaryColor,
                            },
                            text: {
                                primary: '#'+themeData[0].textColor,
                                secondary: '#'+themeData[0].textColor,
                                disabled: '#'+themeData[0].textColor,
                            },
                        },
                    }))

                });
        }

        getTheme();
    }, []);





    const adminSwitch = () => {
        console.log("admin is " + admin)
        setAdmin(!admin)
    }


    const handlePageChange = (page) => {
        console.log(`handling page change: ${page}`)
        setPage(page);
    }

    const handleThemeChange = (primaryColor,secondaryColor,textColor) => {
        setTheme(createTheme({
            palette: {
                primary: {
                    main: '#'+primaryColor,
                },
                secondary: {
                    main: '#'+secondaryColor,
                },
                text: {
                    primary: '#' + textColor,
                    secondary: '#' + textColor,
                    disabled: '#' + textColor,
                },

            },
        }))
    }

    return (
        <div className="HomePage" >
            {theme != null &&
            <ThemeProvider theme={theme} >
            <Box sx={{ display: 'flex',}} >
                <MenuAppBar adminSwitch = {adminSwitch}
                            admin = {admin}
                            handlePageChange={handlePageChange}/>
                {page === "MainDrawer" &&
                    <MainDrawer admin = {admin}
                          user = {props.user}
                            />}
                {page === "Settings" &&
                    <Settings admin = {admin}
                              user = {props.user}
                              handleThemeChange={handleThemeChange}/>}
                {page === "Profile" &&
                    <Profile  admin = {admin}
                              user = {props.user}/>}
                {/* {page === "AddTemplate" &&
                    <AddTemplate  admin = {admin}
                              user = {props.user}/>} */}
                {page === "TagEditor" &&
                <TagEditor  admin = {admin}
                    user = {props.user}/>}

            </Box>
            </ThemeProvider>}
        </div>
    );
}