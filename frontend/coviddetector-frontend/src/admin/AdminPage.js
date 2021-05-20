import React from 'react';
import send_request from '../API/APIcalls'
import Dashboard from './pages/dashboard';
export default function AdminPage(){
    return (
        <div  style={{'margin-top':100}}>
            <Dashboard/>
        </div>
    )
}