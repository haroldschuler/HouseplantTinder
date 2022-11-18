import { Button, Card, FormControl, Input, InputLabel } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Login = (props) => {

    const [user,setUser] = useState({
        email: "",
        password: ""
    })
    const [errMsgs,setErrMsgs] = useState([]);


    const navigate = useNavigate();

    const changeInput = async(e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const loginUser = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/login", user, {withCredentials: true})
            .then(res => {
                navigate('/browse')
            })
            .catch(err => {
                // console.log(err.response.data.msg)
                setErrMsgs([...errMsgs, err.response.data.msg])
            })
    }

    const logoutUser = () => {
        axios.get("http://localhost:8000/api/user/logout", {withCredentials: true})
            .then(res => {
                navigate('/login')
            })
            .catch(err => console.log(err))
    }

    useEffect( () => {
        logoutUser();
    },[])

    return (
        <div>
            <Navbar page={"login"}/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh"}}>
                <Card style={{padding: "25px"}}>
                    {errMsgs.map( (msg,idx) => {
                        return <p key={idx} style={{color: "red"}}>{msg}</p>
                    })}
                    <FormControl>
                        <InputLabel htmlFor='email'>Email: </InputLabel>
                        <Input id='email' name="email" onChange={ (e) => changeInput(e) } value={user.email}/>
                    </FormControl>
                    <br></br><br></br>
                    <FormControl>
                        <InputLabel htmlFor='password'>Password: </InputLabel>
                        <Input type='password' id='password' name="password" onChange={ (e) => changeInput(e) } value={user.password}/>
                    </FormControl>
                    <br></br><br></br>
                    <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ loginUser }>Login</Button>
                    <br></br><br></br>
                    <Link to={'/register'}>Not a member? Register here</Link>
                </Card>
            </div>
        </div>
    )
}

export default Login