import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logout from "../functions/logout";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu" color="inherit">
                        <KeyboardVoiceIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <Link to="/" style={{ textDecoration: 'none', color: 'white'}}>
                        COVID Detector
                        </Link>
                    </Typography>
                    <Button color="inherit"
                            onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
