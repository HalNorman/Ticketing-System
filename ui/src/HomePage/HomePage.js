//HomePage.js
//Component for the main overall homepage of the app
import MenuAppBar from "../AppBar/AppBar";
import Box from "@mui/material/Box";
import MainDrawer from "../MainDrawer/MainDrawer";
import {useState} from "react";

export default function HomePage(props) {

    const [admin,setAdmin] = useState(true);

    const adminSwitch = () => {
        console.log("admin is " + admin)
        setAdmin(!admin)
    }
    return (
        <div className="HomePage">
            <Box sx={{ display: 'flex' }}>
                <MenuAppBar adminSwitch = {adminSwitch}
                            admin = {admin}/>
                <MainDrawer admin = {admin}
                            user = {props.user}/>
            </Box>
        </div>
    );
}