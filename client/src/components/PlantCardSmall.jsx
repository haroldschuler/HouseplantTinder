import { Button, Card, Hidden, Paper } from '@mui/material'
// import axios from 'axios'
import React from 'react'
// import { Draggable } from 'react-beautiful-dnd'

const PlantCardSmall = (props) => {
    
    const mouseOver = (e) => {
        e.target.style.cursor = "pointer"
    }

    return (
        <div onMouseOver={ (e) => mouseOver(e) }>
            <Paper elevation={6} style={{padding: "25px", backgroundColor: "saddleBrown", minWidth: "300px", maxWidth: "300px",margin: "15px"}}>
                <Card elevation={4}>
                    <img src={props.plant.imageURL} alt="plant" height={"200px"}/>
                </Card>
                <Card elevation={4} style={{padding: "10px", marginTop: "15px"}}>
                    <h3>{props.plant.name}</h3>
                    <p style={{fontStyle: "italic"}}>{props.plant.latinName}</p>
                    <div>
                        <Button variant='outlined' sx={{backgroundColor: "red", color: "black", borderColor:"black"}} onClick={ () => props.remove(props.plant._id)}>Remove</Button>
                        {props.list === "wishlist" ? 
                            <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => props.moveTo("owned","wishlist",props.plant._id)}>Move to Owned</Button>
                            :
                            <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => props.moveTo("wishlist","owned",props.plant._id)}>Move to Wishlist</Button>
                        }
                    </div>
                </Card>
            </Paper>
        </div>
    )
}

export default PlantCardSmall