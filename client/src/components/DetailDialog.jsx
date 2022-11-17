import { Button, Card, Dialog, DialogTitle, Modal, Paper, Typography } from '@mui/material'
import { width } from '@mui/system'
import React from 'react'

const DetailDialog = (props) => {

    // console.log(props.plant)

    const dialogStyle = {
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "800px"
    }

    const cardStyle = {
        padding: "10px"
    }

    const handleClose = () => {
        props.closeDialog();
    }

    return (
        <Dialog open={props.dialogOpen} maxWidth={"800px"}>
            <Paper style={dialogStyle}>
                <div style={{display: "flex",justifyContent: "space-between"}}>
                    <img src={props.plant.imageURL} alt={props.plant.name} width={"400px"}></img>
                    <div style={{display: "flex", flexDirection: "column", marginLeft: "25px", width: "375px"}}>
                        <Card elevation={4} style={cardStyle}>
                            <DialogTitle style={{fontWeight: "bold", padding: "0px"}}>{props.plant.name}</DialogTitle>
                            <Typography style={{fontStyle: "italic"}}>{props.plant.latinName}</Typography>
                        </Card>
                        <br></br>
                        <Card elevation={4} style={cardStyle}>
                            <Typography><span style={{fontWeight: "bold"}}>Water Requirements:</span> {props.plant.water}</Typography>
                            <br></br>
                            <Typography><span style={{fontWeight: "bold"}}>Sunlight Requirements:</span> {props.plant.sunlight}</Typography>
                            <br></br>
                            <Typography><span style={{fontWeight: "bold"}}>Size:</span> {props.plant.size}</Typography>
                            <br></br>
                            <Typography><span style={{fontWeight: "bold"}}>Caretaking Tip:</span> {props.plant.tip}</Typography>
                        </Card>
                    </div>
                </div>
                <br></br>
                <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={handleClose}>Close</Button>
            </Paper>
        </Dialog>
    )
}

export default DetailDialog