import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logout from "../functions/logout";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import {Link, Redirect} from "react-router-dom";
import isLoggedIn from "../functions/isLoggedIn";
import AccountCircleIcon from '@material-ui/icons/AccountBox';


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
    const [redirect, setRedirect] = React.useState(false)

    const initiateLogout = () => {
        logout();
        setRedirect(true)

    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Link style={{textDecoration: 'none', color: 'white'}} to="/">
                        <IconButton edge="start" className={classes.menuButton} aria-label="menu" color="inherit">
                            <KeyboardVoiceIcon/>
                        </IconButton>
                    </Link>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                            COVID Detector
                        </Link>
                    </Typography>
                    {redirect ? <Redirect push to="/"/>: null}
                    <Button color="inherit"
                            onClick={isLoggedIn ? initiateLogout: window.location.reload()}>
                        {isLoggedIn() ?
                            "Logout" :
                            <Link to="/login" style={{textDecoration: 'none', color: 'white'}}>Login</Link>}</Button>
                    {isLoggedIn() ? (
                        <Link style={{textDecoration: 'none', color: 'white'}} to="/history"><IconButton edge="end"
                                                                                                         className={classes.menuButton}
                                                                                                         aria-label="menu"
                                                                                                         color="inherit">
                            <AccountCircleIcon color="inherit"/>
                        </IconButton> </Link>) : ''}
                </Toolbar>
            </AppBar>
        </div>
    );
}
