import React from 'react';

export default class Register extends React.Component{
    constructor(props){
        super(props);

    }

    render() {
        return(
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Register</div>
                <div className="content">

                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name='firstName' placeholder='First Name' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name='lastName' placeholder='Last Name' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" name='dob' placeholder='Date of Birth' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="geneder">Geneder</label>
                            <input type="text" name='gender' placeholder='Gender' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" name='country' placeholder='Country' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Address">Address</label>
                            <input type="text" name='Address' placeholder='Address' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' placeholder='email' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' placeholder='password' />
                        </div>

                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn">Register</button>
                </div>
            </div>
        );
    }

}
