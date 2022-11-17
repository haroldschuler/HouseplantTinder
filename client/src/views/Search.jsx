import React, { useEffect, useState } from 'react'
// import {Card, Paper} from '@mui/material'
import Sidebar from '../components/Sidebar'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import axios from 'axios'
import PlantCard2 from '../components/PlantCard'

const Search = (props) => {

    const [plant,setPlant] = useState({})
    const [user,setUser] = useState({})

    const hardCodedUserID = "6373f942193678dc952b79ff"

    const wrapper = {
        display: "flex",
        padding: "50px"
    }

    const handleOnDragEnd = (e) => { 
        // console.log(e)
    }

    useEffect( () => {
        axios.get(`http://localhost:8000/api/user/${hardCodedUserID}`)
                .then(res => {
                    setUser(res.data)
                    let tempUser = res.data;
                    axios.post("http://localhost:8000/api/plant/find",{_id: {$nin: tempUser.swiped}})
                            .then(res => {
                                console.log(Math.floor(Math.random()*res.data.length))
                                setPlant(res.data[Math.floor(Math.random()*res.data.length)])
                            })
                            .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
    },[])

    return (
        <div style={wrapper}>
            <DragDropContext onDragEnd={ handleOnDragEnd }>
                <Sidebar/>
                <Droppable droppableId='dropZone'>
                    {(provided) => {
                        return <div {...provided.droppableProps} ref={provided.innerRef}>
                            {/* <Draggable key={1} draggableId={"divId"} index={1}>
                                {(provided) => {
                                    return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div>
                                            <Paper elevation={6} style={{padding: "25px"}}>
                                                <Card elevation={4}>
                                                    <img src="https://www.plants.com/images/157646LDS_20220221-1645479897083.webp" alt="plant" width="400px"/>
                                                </Card>
                                                <Card elevation={4} style={{padding: "15px", marginTop: "15px"}}>
                                                    <h2>Some Text</h2>
                                                    <p>More text</p>
                                                    <p>Some info</p>
                                                </Card>
                                            </Paper>
                                        </div>
                                    </div>
                                }}
                            </Draggable> */}
                            <PlantCard2 plant={plant} buttons={"yes/no"}/>
                            {provided.placeholder}
                        </div>
                    }}
                </Droppable>
                <Sidebar/>
            </DragDropContext>
        </div>
    )
}

export default Search