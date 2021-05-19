import React from 'react';
import send_request from "../APIcalls";

export default class Register extends React.Component{
    constructor(props){
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
        this.register =this.register.bind(this);

    }
    register(){
        send_request('/auth/register', 'POST', {
            'first_name': this.state.first_name,
            'last_name': this.state.last_name,
            'date_of_birth': this.state.date_of_birth,
            'gender': this.state.gender,
            'country': this.state.country,
            'address': this.state.address,
            'email': this.state.email,
            'password': this.state.password,
        }).then(r => console.log(r))
    }

    render() {
        return(
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Register</div>
                <div className="content">

                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name='firstName' placeholder='First Name' onChange={e => this.setState({first_name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name='lastName' placeholder='Last Name' onChange={e => this.setState({last_name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" name='dob' placeholder='Date of Birth' onChange={e => this.setState({date_of_birth: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <input type="text" name='gender' placeholder='Gender' onChange={e => this.setState({gender: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" name='country' placeholder='Country' onChange={e => this.setState({country: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Address">Address</label>
                            <input type="text" name='Address' placeholder='Address' onChange={e => this.setState({address: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' placeholder='email' onChange={e => this.setState({email: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' placeholder='password' onChange={e => this.setState({password: e.target.value})}/>
                        </div>

                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={this.register}>Register</button>
                </div>
            </div>
        );
    }

}
