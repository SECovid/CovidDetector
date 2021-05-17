import React from 'react';
import send_request from '../API/APIcalls'
import Dashboard from './pages/dashboard';
export default function AdminPage(){
    console.log("IN ADMIN PAGE")
    send_request("hello","GET").then(
        res=>{
            console.log(res)
        }
    )
    return (
        <div  style={{'margin-top':100}}>
            <Dashboard/>
        </div>
    )
}