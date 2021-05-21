import React from 'react';
import loginImg from '../../images/login.svg';
import '../styles.scss'
import send_request from "../../API/APIcalls";
import Button from "@material-ui/core/Button";
import {InputLabel, TextField} from "@material-ui/core";
import {Redirect} from 'react-router-dom';
import isLoggedIn from "../../functions/isLoggedIn";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            incorrectPassword: false,
            redirect: false
        }
        this.login = this.login.bind(this);
    }

    isFormValid() {
        const {email, password} = this.state;

        return email && password;
    }

    login() {
        send_request('/auth/login', 'POST', {
            'username': this.state.email.toLowerCase(),
            'password': this.state.password,
            'role': "regular"
        }).then(r => {
                console.log(r);
                if (r.data.status === "success") {
                    const token = r.data.auth_token;
                    this.setState({incorrectPassword: false})
                    localStorage.setItem('token', token);
                    this.setState({ redirect: true })
                } else if (r.data.message === "Password mismatch") {
                    console.log("Incorrect Password")
                    this.setState({incorrectPassword: true})

                } else if (r.data.message === "Already logged in") {
                    console.log("Already logged in")
                }
            }
        )

    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <InputLabel>Email</InputLabel>
                            <TextField type="text" name='email' placeholder='Email'
                                       onChange={e => this.setState({email: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <InputLabel>Password</InputLabel>
                            <TextField type="password" name='password' placeholder='Password'
                                       error={this.state.incorrectPassword}
                                       helperText={this.state.incorrectPassword ? "Incorrect password" : ""}
                                       onChange={e => this.setState({password: e.target.value})}/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    { this.state.redirect ? (<Redirect push to="/"/>) : null }
                    <Button type="button" variant="contained" color="secondary" disabled={!this.isFormValid()}
                            onClick={this.login}>Login</Button>
                </div>
            </div>
        );
    }

}
