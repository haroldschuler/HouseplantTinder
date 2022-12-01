import { Button, Card, FormControl, Input, InputLabel } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Register = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    
    const [errMsgs, setErrMsgs] = useState([]);

    const navigate = useNavigate();

    const changeInput = async(e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }
    
    const registerUser = (e) => {
        setErrMsgs([])
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/register", user, {withCredentials: true})
        .then(res => {
            navigate('/browse')
        })
        .catch(err => {
            if(err.response.data.error.msg) {
                setErrMsgs([err.response.data.error.msg])
            }
            if(err.response.data.error.errors) {
                let errors = err.response.data.error.errors;
                const tempErrors = []
                for(let key in errors) {
                    tempErrors.push(errors[key]["message"])
                }
                setErrMsgs([...errMsgs, tempErrors]);
            }
        })
    }
    
    const logoutUser = () => {
        axios.get("http://localhost:8000/api/user/logout", {withCredentials: true})
            .then(res => {
                navigate('/register')
            })
            .catch(err => console.log(err))
    }
    
    useEffect( () => {
        logoutUser();
        setErrMsgs([])
    },[])

    return (
        <div>
            <Navbar page={"register"}/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh"}}>
                <Card style={{padding: "25px"}}>
                    {errMsgs.map( (msg,idx) => {
                        return (
                            <div key={idx}>
                                <p style={{color: "red"}}>{msg}</p>
                            </div>
                    )})}
                    <FormControl>
                        <InputLabel htmlFor='username'>Username: </InputLabel>
                        <Input id='username' name="username" onChange={ (e) => changeInput(e) } value={user.username}/>
                    </FormControl>
                    <br></br><br></br>
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
                    <FormControl>
                        <InputLabel htmlFor='confirmPassword'>Confirm Password: </InputLabel>
                        <Input type='password' id='confirmPassword' name="confirmPassword" onChange={ (e) => changeInput(e) } value={user.confirmPassword}/>
                    </FormControl>
                    <br></br><br></br>
                    <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ registerUser }>Register</Button>
                    <br></br><br></br>
                    <Link to={'/login'}>Already a member? Login here</Link>
                </Card>
            </div>
        </div>
    )
}

export default Register