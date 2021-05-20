import {Redirect} from "react-router-dom";
import React from "react";

export default function logout() {
    const token = localStorage.getItem('token')
    if (token != null)
    {
        localStorage.removeItem('token')
        console.log("successfully logged out")
    }
    else
    {
        console.log("not logged in")
    }

}
