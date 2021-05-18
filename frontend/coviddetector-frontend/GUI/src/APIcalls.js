import React from 'react';

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/'

function send_request(API, REQUEST, body = {},) {

    const token = localStorage.getItem('token');

    if (token != null) {
        if (REQUEST == "POST") {
            return axios.post(BASE_URL + API, body, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    "access-control-allow-origin": "*"
                }
            })
        } else if (REQUEST == "GET") {
            return axios.get(BASE_URL + API, {
                headers: {"Authorization": `Bearer ${token}`},
                'Content-Type': 'application/json',
                "access-control-allow-origin": "*"
            })
        }
    } else {
        if (REQUEST == "POST") {
            return axios.post(BASE_URL + API, body, {
                headers: {
                    "access-control-allow-origin": "*",
                    'Content-Type': 'application/json'
                }
            })
        } else if (REQUEST == "GET") {
            return axios.get(BASE_URL + API, {
                headers: {
                    "access-control-allow-origin": "*",
                    'Content-Type': 'application/json'
                }
            })
        }
    }


}

export default send_request;
