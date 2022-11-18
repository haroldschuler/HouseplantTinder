import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SwipeDialog = (props) => {

    const navigate = useNavigate();

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
                <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => navigate('/myPlants') }>View My Plants</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SwipeDialog