import React from 'react';
import Map from './Map';
import ModelNumbers from './ModelNumbers';
import Budget from './budget';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import Sales from './Sales';
import TrafficByDevice from './TrafficByDevice';
import Dashboard from './pages/dashboard';
export default function AdminPage(){
    return (
        <div  style={{'margin-top':100}}>
            <Dashboard/>
        </div>
    )
}