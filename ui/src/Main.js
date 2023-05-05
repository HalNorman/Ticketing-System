//Main.js
//For displaying the initial login page which then routes to homepage
import React, { useState, Fragment, useEffect} from 'react';
import Login from './Login';
import App from './App';
import API from "./API_Interface/API_Interface";
import {createTheme,ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const logout = (setUser) => {
    return () => {
        setUser(undefined);
    }
};

export default function Main() {

    const [theme, setTheme] = useState();
    const [title, setTitle] = useState();

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
                    setTitle(themeData[0].name);

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
                            background: {
                                default: '#'+themeData[0].backgroundColor
                            }
                        },
                    }))

                });
        }

        getTheme();
    }, []);

    const handleThemeChange = (primaryColor,secondaryColor,textColor,backgroundColor) => {
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
                background: {
                    default: '#'+backgroundColor
                }

            },
        }))
    }



    const [user, setUser] = useState(undefined);

    return (
        <Fragment>
        {theme != null &&
            <ThemeProvider theme={theme} >
                <CssBaseline />
                <Fragment>
                    {
                        user !== undefined ? (
                            <App user={user} logoutAction={logout(setUser)} handleThemeChange={handleThemeChange}/>
                        ) : (
                        <Login user={user} setUser={setUser} title={title}/>
                        )
                    }
                </Fragment>
            </ThemeProvider>
        }
        </Fragment>
    )
}