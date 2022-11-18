import { Button, Card, FormControl, Input, InputLabel } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = (props) => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const navigate = useNavigate();

    const changeInput = async(e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const logoutUser = () => {
        axios.get("http://localhost:8000/api/user/logout", {withCredentials: true})
            .then(res => {
                console.log("logged out")
                console.log(res)
                navigate('/browse')
            })
            .catch(err => console.log(err))
    }

    const testUser = () => {
        axios.get("http://localhost:8000/api/user/findUser", {withCredentials: true})
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    const registerUser = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/register", user, {withCredentials: true})
            .then(res => {
                console.log("registered")
                console.log(res)

            })
            .catch(err => console.log(err))
    }

    // Log the user out if they ever navigate to this route
    // logoutUser();

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card style={{margin: "50px", padding: "25px"}}>
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
    )
}

export default Register