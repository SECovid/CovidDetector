import React from 'react';

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/'

function send_request(API, REQUEST, body={}, ){
    
    const token = localStorage.getItem('token');

    if(token != null){
        if(REQUEST == "POST"){
            return axios.post(BASE_URL+API, body, { headers: {"Authorization" : `Bearer ${token}`} })
        }else if(REQUEST == "GET"){
            return axios.get(BASE_URL+API, { headers: {"Authorization" : `Bearer ${token}`} })
        }
    }else{
        if(REQUEST == "POST"){
            return axios.post(BASE_URL+API, body)
        }else if(REQUEST == "GET"){
            return axios.get(BASE_URL+API)
        }
    }

  
}

export default send_request;
