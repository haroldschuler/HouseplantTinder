import { Button, Card, Paper } from '@mui/material'
import React from 'react'

const PlantCardSmall = (props) => {
    
    const mouseOver = (e) => {
        e.target.style.cursor = "pointer"
    }

    return (
        <div onMouseOver={ (e) => mouseOver(e) }>
            <Paper elevation={6} style={{padding: "25px", backgroundColor: "saddleBrown", minWidth: "300px", maxWidth: "300px",margin: "15px"}}>
                <Card elevation={4}>
                    <img src={props.plant.imageURL} alt="plant" height={"200px"}  style={{pointerEvents: "none"}}/>
                </Card>
                <Card elevation={4} style={{padding: "10px", marginTop: "15px"}}>
                    <h3>{props.plant.name}</h3>
                    <p style={{fontStyle: "italic"}}>{props.plant.latinName}</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button variant='outlined' sx={{color: "red", borderColor:"red"}} onClick={ () => props.remove(props.plant._id)}>Unmatch</Button>
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