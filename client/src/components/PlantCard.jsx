import { Button, Card, Paper } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const PlantCard = (props) => {

    // console.log(props.plant._id)

    // const dragStart = (e) => {
    //     console.log(e)
    // }

    const hardCodedUserID = "6373f942193678dc952b79ff"

    const sayYes = () => {
        console.log("Adding plant to wishlist and swiped")
        // THIS PUT REQUEST WORKS
        // axios.put(`http://localhost:8000/api/user/edit/${hardCodedUserID}`,{$addToSet: {wishlist: props.plant._id,swiped: props.plant._id}})
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .catch(err => console.log(err))
    }

    const sayNo = () => {
        console.log("Adding plant to swiped")
        // THIS PUT REQUEST WORKS
        // axios.put(`http://localhost:8000/api/user/edit/${hardCodedUserID}`,{$addToSet: {swiped: props.plant._id}})
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .catch(err => console.log(err))
    }

    return (
        <div>
            {/* <Paper elevation={6} style={{padding: "25px", margin: "25px"}}>
                <Card elevation={4}>
                    <img src="https://www.plants.com/images/157646LDS_20220221-1645479897083.webp" alt="plant" width="400px"/>
                </Card>
                <Card elevation={4} style={{padding: "15px", marginTop: "15px"}}>
                    <h2>Some Text</h2>
                    <p>More text</p>
                    <p>Some info</p>
                </Card>
            </Paper> */}
            <Draggable key={1} draggableId={"divId"} index={1}>
                {(provided) => {
                    return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div>
                            <Paper elevation={6} style={{padding: "25px", maxWidth: "450px"}}>
                                <Card elevation={4}>
                                    <img src={props.plant.imageURL} alt="plant" width="400px"/>
                                </Card>
                                <Card elevation={4} style={{padding: "15px", marginTop: "15px"}}>
                                    <h2>{props.plant.name}</h2>
                                    <p style={{fontStyle: "italic"}}>{props.plant.latinName}</p>
                                    <h4>Water Requirements:</h4>
                                    <p>{props.plant.water}</p>
                                    <h4>Sunlight Requirements:</h4>
                                    <p>{props.plant.sunlight}</p>
                                    <h4>Size:</h4>
                                    <p>{props.plant.size}</p>
                                    {/* <h4>Care tip:</h4>
                                    <p>{props.plant.tip}</p> */}
                                    {props.buttons === "yes/no" ? 
                                    <div>
                                        <Button variant='outlined' sx={{backgroundColor: "red", color: "black", borderColor:"black"}} onClick={ () => sayNo()}>No</Button>
                                        <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => sayYes()}>Yes</Button>
                                    </div>
                                    : "no buttons - put a different button for view page"}
                                </Card>
                            </Paper>
                        </div>
                    </div>
                }}
            </Draggable>
        </div>
    )
}

export default PlantCard