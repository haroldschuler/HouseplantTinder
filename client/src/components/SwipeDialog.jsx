import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SwipeDialog = (props) => {

    const navigate = useNavigate();
    // This will have to be moved to the BrowsePlants view
    // const [saying,setSaying] = useState([])
    // const sayings = [
    //     ["leafy","lad"],
    //     ["green","gal"],
    //     ["foliated","friend"],
    //     ["budding","bud"],
    //     ["pollinated","pal"]
    // ]

    // useEffect(() => {
    //     console.log("this" + Math.floor(Math.random()*sayings.length))
    //     setSaying(sayings[Math.floor(Math.random()*sayings.length)]);
    // },[])

    return (
        <Dialog open={props.open}>
            <DialogTitle>You matched with this leafy lad!</DialogTitle>
            <DialogContent>
                <img src={props.plant.imageURL} alt="plant" width={"300px"}></img>
                <Typography>{props.plant.name} has been added to your wishlist</Typography>
                <Typography>View your plants for more information</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => props.closeDialog() }>Keep Swiping</Button>
                <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => navigate('/myPlants') }>View Your Plants</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SwipeDialog