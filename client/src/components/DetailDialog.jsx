import { Button, Dialog, DialogTitle, Modal, Typography } from '@mui/material'
import React from 'react'

const DetailDialog = (props) => {

    // console.log(props.plant)

    const handleClose = () => {
        props.closeDialog();
    }

    return (
        <Dialog open={props.dialogOpen}>
            <DialogTitle>Hello</DialogTitle>
            <Typography>{props.plant.name}</Typography>
            <Button onClick={handleClose}>Close</Button>
        </Dialog>
    )
}

export default DetailDialog