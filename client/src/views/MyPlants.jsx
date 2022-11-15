import { Paper } from '@mui/material'
import React from 'react'

const MyPlants = () => {

    const style = {
        width: "90vw",
        marginTop: "50px",
        height: "350px"
    }

    return (
        <div>
            <Paper>
                <div style={style}>Hi</div>
            </Paper>
            <Paper>
                <div style={style}>Yes</div>
            </Paper>
        </div>
    )
}

export default MyPlants