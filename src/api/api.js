import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_USER } from '../redux/reducers/userReducer';

const baseUrl = "https://jsonplaceholder.typicode.com/posts"; //'http://api.clxtech.com.br/galeria58/';

const request = async (method,endpoint, params, token = null) => {
    method = method.toLowerCase();

    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;

    switch(method){
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
        break;
        case 'post':
        case 'put':
        case 'delete':

            body = JSON.stringify(params);
        break;
    }

    let headers = {'Content-Type': 'application/json'};

    if(token) {
        headers.Authorization = `Bearer ${token}`;
    }
 
    let req = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: method,
        headers: headers,
        body: body
    });

    let json = await req.json();
   

    return json;
}

export const api = {
 
    getToken : async () => {
      //  return USER.token; 
    },
    validateToken : async (token) => {
        let req = await fetch("http://api.clxtech.com.br/galeria58/validar", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let json = await req.json();
        return json;
    }
   
}