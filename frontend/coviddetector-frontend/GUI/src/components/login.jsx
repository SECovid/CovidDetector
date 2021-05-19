import React from 'react';
import loginImg from '../login.svg';
import './styles.scss'
import send_request from "../APIcalls";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.login = this.login.bind(this);
    }

    login() {
        send_request('/auth/login', 'POST', {
            'username': this.state.email,
            'password': this.state.password,
            'role': "regular"
        }).then(r => {
                console.log(r);
                const {token} = r.data.getItem('auth_token');
                localStorage.setItem('token', token);
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
                            <label htmlFor="email">Email</label>
                            <input type="text" name='email' placeholder='email'
                                   onChange={e => this.setState({email: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' placeholder='password'
                                   onChange={e => this.setState({password: e.target.value})}/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={this.login}>Login</button>
                </div>
            </div>
        );
    }

}
