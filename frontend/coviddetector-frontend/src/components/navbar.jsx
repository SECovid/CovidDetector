import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logout from "../functions/logout";
import {Link, Redirect} from "react-router-dom";
import isLoggedIn from "../functions/isLoggedIn";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import AccountCircleIcon from '@material-ui/icons/AccountBox';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SignInAsAdminDialog from "./signInAsAdminDialog";


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
                    <Link className={classes.title} style={{textDecoration: 'none', color: 'white'}} to="/">
                        <Button edge="start" className={classes.title} aria-label="menu" color="inherit" startIcon={<KeyboardVoiceIcon color="inherit"/>}>
                            <Typography variant="h6" className={classes.title} color="inherit">
                                    COVID Detector
                            </Typography>
                        </Button>
                    </Link>
                    {redirect ? <Redirect push to="/"/> : null}
                    <Button color="primary"  endIcon={isLoggedIn() ? <ExitToAppIcon/>:<AccountCircleIcon/>}
                            onClick={isLoggedIn() ? initiateLogout : ''}>
                        {isLoggedIn() ?
                            "Logout" :
                            <Link to="/login" style={{textDecoration: 'none', color: 'white'}}>Login</Link>}</Button>
                    {isLoggedIn() ? (
                        <Link style={{textDecoration: 'none', color: 'white'}} to="/history"><Button
                            color="primary"
                            endIcon={<AccountCircleIcon />}>Profile</Button>
                        </Link>) : ''}
                    <SignInAsAdminDialog/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
