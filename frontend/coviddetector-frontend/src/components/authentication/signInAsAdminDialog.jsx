import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import loginImg from "../../images/login.svg";
import {InputLabel, TextField} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import send_request from "../../API/APIcalls";
import isLoggedIn from "../../functions/isLoggedIn";

export default function SignInAsAdminDialog() {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [redirect, setRedirect] = React.useState(false);
    const [alreadyLoggedIn, setAlreadyLoggedIn] = React.useState(isLoggedIn());

    React.useEffect(() => {
        setAlreadyLoggedIn(isLoggedIn());
        setRedirect(false);
    }, [isLoggedIn()])

    const handleClickOpen = () => {
        setEmail('');
        setPassword('');
        setRedirect(false);
        setOpen(true);
    };
    const handleClose = () => {
        setEmail('');
        setPassword('');
        setRedirect(false);
        setOpen(false);
    };

    const login = () => {
        send_request('/auth/login', 'POST', {
            'username': email.toLowerCase(),
            'password': password,
            'role': "admin"
        }).then(r => {
                console.log(r);
                if (r.data.status === "success") {
                    const token = r.data.auth_token;
                    localStorage.setItem('token', token);
                    setOpen(false);
                    setRedirect(true);
                } else if (r.data.message === "Password mismatch") {
                    console.log("Incorrect Password")

                } else if (r.data.message === "Already logged in") {
                    console.log("Already logged in")
                }
            }
        )

    }
    const isFormValid = () => {
        return email && password;
    }

    return (
        <div>
            <Button
                onClick={handleClickOpen}
                color="primary"
                endIcon={<SupervisorAccountIcon/>}>Admin</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Login as admin"}</DialogTitle>
                <DialogContent>
                    <div className="base-container">
                        <div className="header">Credentials</div>
                        <div className="content">
                            <div className="image">
                                <img src={loginImg}/>
                            </div>
                            <div className="form">
                                <div className="form-group">
                                    <InputLabel>Username</InputLabel>
                                    <TextField type="text" name='name' placeholder='Username'
                                               onChange={e => setEmail(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <InputLabel>Password</InputLabel>
                                    <TextField type="password" name='password' placeholder='Password'
                                               error={alreadyLoggedIn}
                                               helperText={alreadyLoggedIn ? "Please logout before logging in as admin" : ""}
                                               onChange={e => setPassword(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            {redirect ? (<Redirect push to="/admin"/>) : null}
                            <Button type="button" variant="contained" color="secondary" disabled={!isFormValid()}
                                    onClick={login}>Login</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
