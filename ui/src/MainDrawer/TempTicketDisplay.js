import {Typography} from "@mui/material";


export default function TempTicketDisplay(props) {

    const text = props.selectedValue;
    return (
        <Typography variant = "h2">
            {text} Here
        </Typography>
    )

}