import React from 'react';
import send_request from "../../API/APIcalls";
import Button from "@material-ui/core/Button";
import {InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            date_of_birth: '',
            gender: '',
            country: '',
            address: '',
            email: '',
            password: '',
        }
        this.register = this.register.bind(this);

    }

    isFormValid() {
        const {first_name, last_name, date_of_birth, gender, country, address, email, password} = this.state;

        return first_name && last_name && date_of_birth && gender && country && address && email && password;
    }

    register() {
        send_request('/auth/register', 'POST', {
            'first_name': this.state.first_name,
            'last_name': this.state.last_name,
            'date_of_birth': this.state.date_of_birth,
            'gender': this.state.gender,
            'country': this.state.country,
            'address': this.state.address,
            'email': this.state.email.toLowerCase(),
            'password': this.state.password,
        }).then(r => console.log(r))
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Register</div>
                <div className="content">

                    <div className="form">
                        <div className="form-group">
                            <InputLabel>First Name</InputLabel>
                            <TextField type="text" name='firstName' placeholder='First Name'
                                       onChange={e => this.setState({first_name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <InputLabel>Last Name</InputLabel>
                            <TextField type="text" name='lastName' placeholder='Last Name'
                                       onChange={e => this.setState({last_name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <InputLabel>Date of Birth</InputLabel>
                            <TextField type="date" name='dob' placeholder='Date of Birth'
                                       onChange={e => this.setState({date_of_birth: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <InputLabel>Gender</InputLabel>
                            <Select
                                style={{minWidth: 300}}
                                value={this.state.gender}
                                onChange={e => this.setState({gender: e.target.value})}
                            >
                                <MenuItem value={'M'}>Male</MenuItem>
                                <MenuItem value={'F'}>Female</MenuItem>
                                <MenuItem value={'O'}>Other</MenuItem>
                            </Select>
                        </div>
                        <div className="form-group">
                            <InputLabel>Country</InputLabel>
                            <TextField type="text" name='country' placeholder='Country'
                                       onChange={e => this.setState({country: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <InputLabel>Address</InputLabel>
                            <TextField type="text" name='Address' placeholder='Address'
                                       onChange={e => this.setState({address: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <InputLabel>Email</InputLabel>
                            <TextField type="email" name='Email' placeholder='Email'
                                       onChange={e => this.setState({email: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <InputLabel>Password</InputLabel>
                            <TextField type="password" name='Password' placeholder='Password'
                                       onChange={e => this.setState({password: e.target.value})}/>
                        </div>

                    </div>
                </div>
                <div className="footer">
                    <Button type="button" variant="contained" className="btn" color="secondary"
                            disabled={!this.isFormValid()}
                            onClick={this.register}>Register</Button>
                </div>
            </div>
        );
    }

}
