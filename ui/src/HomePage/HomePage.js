//HomePage.js
//Component for the main overall homepage of the app
import MenuAppBar from "../AppBar/AppBar";
import Box from "@mui/material/Box";
import MainDrawer from "../MainDrawer/MainDrawer";
import TagEditor from "..//MainDrawer/TagEditor";
import Settings from "../MainDrawer/Settings/Settings"
import Profile from "../MainDrawer/Profile"
import React, {useState, useEffect} from "react";



export default function HomePage(props) {

    const [admin,setAdmin] = useState(props.user.role === "admin");
    const [page,setPage] = useState("MainDrawer");



    


    const adminSwitch = () => {
        console.log("admin is " + admin)
        setAdmin(!admin)
    }


    const handlePageChange = (page) => {
        console.log(`handling page change: ${page}`)
        setPage(page);
    }


    return (
        <div className="HomePage" >
            
            <Box sx={{ display: 'flex',}} >
                <MenuAppBar adminSwitch = {adminSwitch}
                    admin = {admin}
                        handlePageChange={handlePageChange}
                            user={props.user}
                        />
                {page === "MainDrawer" &&
                    <MainDrawer admin = {admin}
                          user = {props.user}
                            />}
                {page === "Settings" &&
                    <Settings admin = {admin}
                              user = {props.user}
                              handleThemeChange={props.handleThemeChange}/>}
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
            
        </div>
    );
}