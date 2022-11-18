import { Button, Card, Paper } from '@mui/material'
import React from 'react'

const PlantCard2 = (props) => {
    
    const mouseOver = (e) => {
        e.target.style.cursor = "pointer"
    }

    return (
        <div onMouseOver={ (e) => mouseOver(e) }>
            <Paper elevation={6} style={{padding: "25px", maxWidth: "450px"}}>
                <Card elevation={4}>
                    <img src={props.plant.imageURL} alt="plant" width={"400px"} style={{pointerEvents: "none"}}/>
                </Card>
                <Card elevation={4} style={{padding: "15px", marginTop: "15px"}}>
                    <h2>{props.plant.name}</h2>
                    <p style={{fontStyle: "italic"}}>{props.plant.latinName}</p>
                    {props.buttons === "yes/no" ? 
                    <div>
                        <Button variant='outlined' sx={{backgroundColor: "red", color: "black", borderColor:"black"}} onClick={ () => props.sayNo()}>No</Button>
                        <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => props.sayYes()}>Yes</Button>
                    </div>
                    : "no buttons - put a different button for view page"}
                </Card>
            </Paper>
        </div>
    )
}

export default PlantCard2