import React from 'react';
import loginImg from '../login.svg';
import './styles.scss'
import send_request from "../APIcalls";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

    }

    login(username, password, role) {
        send_request('/auth/login', 'POST', {
            'username': username,
            'password': password,
            'role': role
        }).then(r => console.log(r))

    }

    render() {
        const initialFormData = Object.freeze({
            username: "",
            password: ""
        });

        const LoginForm = () => {
            const [formData, updateFormData] = React.useState(initialFormData);

            const handleChange = (e) => {
                updateFormData({
                    ...formData,
                    // Trimming any whitespace
                    [e.target.name]: e.target.value.trim()
                });
            };

            const handleSubmit = (e) => {
                e.preventDefault()
                console.log(formData);
                // ... submit to API or something
            };

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
                                <input type="text" name='email' placeholder='email' onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' placeholder='password' onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" className="btn" onClick={handleSubmit}>Login</button>
                    </div>
                </div>
            );
        }
    }
}
