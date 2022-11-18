import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {

    const navigate = useNavigate()

    const navbarStyle = {
        backgroundColor: "saddlebrown",
        height: "5vh",
        width: "95%",
        padding: "15px 2.5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    }

    const navbarText = {
        color: "#50c756"
    }

    const buttonStyle = {
        backgroundColor: "#50c756",
        color: "black",
        borderColor:"black",
        marginLeft: "25px" 
    }

    const logoutUser = () => {
        axios.get("http://localhost:8000/api/user/logout", {withCredentials: true})
            .then(res => {
                navigate('/login')
            })
            .catch(err => console.log(err))
    }

    return (
        <div style={navbarStyle}>
            <h1 style={navbarText}>Houseplant Tinder</h1>
            <div>
                {props.page === "myPlants" ?
                    <Button variant='outlined' sx={buttonStyle} onClick={ () => navigate('/browse')}>Browse Plants</Button>
                :
                props.page === "browse" ?
                    <Button variant='outlined' sx={buttonStyle} onClick={ () => navigate('/myPlants')}>View My Plants</Button>
                :
                props.page === "register" ?
                    <Button variant='outlined' sx={buttonStyle} onClick={ () => navigate('/login')}>Login</Button>
                :
                props.page === "login" ?
                    <Button variant='outlined' sx={buttonStyle} onClick={ () => navigate('/register')}>Register</Button>
                :
                <div></div>
                }
                {props.status === "loggedIn" ?
                    <Button variant='outlined' sx={buttonStyle} onClick={ () => logoutUser()}>Logout</Button>
                :
                <div></div>
                }
            </div>
        </div>
    )
}

export default Navbar