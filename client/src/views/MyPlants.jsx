import { Button, Paper } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
// import {ScrollMenu} from 'react-horizontal-scrolling-menu'
import PlantCardSmall from '../components/PlantCardSmall'
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from 'react-router-dom'

const MyPlants = () => {

    const [plants, setPlants] = useState([])
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const hardCodedUserID = "6373f942193678dc952b79ff"

    useEffect( () => {
        axios.get(`http://localhost:8000/api/user/${hardCodedUserID}`)
                .then(res => {
                    setUser(res.data)
                })
                .catch(err => console.log(err))
        axios.get(`http://localhost:8000/api/plants/all`)
            .then(res => {
                setPlants(res.data)
            })
            .catch(err => console.log(err))
    },[user])

    const plantCardSizing = {
        height: "200px",
        margin: "15px",
        maxWidth: "300px"
    }

    // const style = {
    //     width: "90vw",
    //     marginTop: "50px",
    //     height: "350px"
    // }

    const moveTo = (toList,fromList,id) => {
        if(toList === "wishlist") {
            axios.put(`http://localhost:8000/api/user/edit/${hardCodedUserID}`,{$pull: {owned: id}, $push: {wishlist: id}})
                .then(res => {
                    // console.log(res.data)
                })
                .catch(err => console.log(err))
        }
        else {
            axios.put(`http://localhost:8000/api/user/edit/${hardCodedUserID}`,{$pull: {wishlist: id}, $push: {owned: id}})
                .then(res => {
                    // console.log(res.data)
                })
                .catch(err => console.log(err))
        }
    }

    const remove = (id) => {
        console.log("remove")
        axios.put(`http://localhost:8000/api/user/edit/${hardCodedUserID}`,{$pull: {wishlist: id, owned: id}})
                .then(res => {
                    // console.log(res.data)
                })
                .catch(err => console.log(err))
    }

    return (
        <div  style={{overflow: "hidden", minWidth: "90%"}}>
            <DragDropContext>
                <Droppable droppableId='thisId'>
                    {(provided) => {
                        return <div {...provided.droppableProps} ref={provided.innerRef}>
                            <div>
                                <h2>Owned Plants</h2>
                            </div>
                            <Paper style={{margin: "25px"}}>
                                {user?.owned?.length === 0 ?
                                <div style={{padding: "25px"}}>
                                    <h2>No plants currently owned. Start swiping to find some more</h2>
                                    <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => navigate('/browse')}>Browse Plants</Button>
                                </div>
                                :
                                <div style={{display: "flex", flexWrap: "wrap"}}>
                                    {plants.filter( plant => user.owned.includes(plant._id)).map( (plant) => {
                                        return (
                                            <div key={plant._id}>
                                                <PlantCardSmall plant={plant} list={"owned"} moveTo={moveTo} remove={remove}></PlantCardSmall>
                                            </div>
                                    )})}
                                </div>
                                }
                            </Paper>
                            <div>
                                <h2>Wishlist</h2>
                            </div>
                            <Paper style={{margin: "25px"}}>
                                {user?.wishlist?.length === 0 ?
                                <div style={{padding: "25px"}}>
                                    <h2>No plants in wishlist. Start swiping to find some more</h2>
                                    <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => navigate('/browse')}>Browse Plants</Button>
                                </div>
                                :
                                <div style={{display: "flex", flexWrap: "wrap"}}>
                                    {plants.filter( (plant) => user.wishlist.includes(plant._id)).map( (plant) => {
                                        return (
                                            <div key={plant._id}>
                                                <PlantCardSmall plant={plant} list={"wishlist"} moveTo={moveTo} remove={remove}></PlantCardSmall>
                                            </div>
                                    )})}
                                </div>
                                }
                            </Paper>
                            <Paper style={{margin: "25px"}}>
                                <div>
                                    <h2>Wishlist</h2>
                                    <Carousel>
                                        {plants.map( (plant) => {
                                        return (
                                            <div key={plant._id}>
                                                <PlantCardSmall plant={plant} size={plantCardSizing}></PlantCardSmall>
                                            </div>
                                    )})}
                                    </Carousel>
                                </div>
                            </Paper>
                            {provided.placeholder}
                        </div>
                    }}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default MyPlants