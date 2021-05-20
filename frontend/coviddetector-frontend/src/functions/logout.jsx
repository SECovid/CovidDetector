import {Redirect} from "react-router-dom";
import React from "react";

export default function logout() {
    const token = localStorage.getItem('token')
    let jwtData = token.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    let isAdmin = decodedJwtData.role
    console.log("JWT", decodedJwtData)
    console.log("HELLO")
    if (token != null)
    {
        if(isAdmin != "admin"){
            window.location.reload()
        }
        localStorage.removeItem('token')
        console.log("successfully logged out")
    }
    else
    {
        console.log("not logged in")
    }

}
