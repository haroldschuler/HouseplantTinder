import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SwipeDialog = (props) => {

    const navigate = useNavigate();

    return (
        <Dialog open={props.open}>
            <DialogTitle>You matched with this {props.saying[0]} {props.saying[1]}!</DialogTitle>
            <DialogContent sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img src={props.plant.imageURL} alt="plant" width={"300px"}></img>
                <br></br>
                <Typography>{props.plant.name} has been added to your wishlist</Typography>
                <Typography>View your plants for more information</Typography>
            </DialogContent>
            <DialogActions sx={{display: "flex", justifyContent: "center"}}>
                <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => props.closeDialog() }>Keep Swiping</Button>
                <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => navigate('/myPlants') }>View My Plants</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SwipeDialog