import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Snack(props) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );



    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={props.open}
                autoHideDuration={2000}
                onClose={handleClose}
                message= {props.message}
                action = {action}
            />
        </div>
    );
}