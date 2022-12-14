import { Button, Paper } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PlantCardSmall from '../components/PlantCardSmall'
import { useNavigate } from 'react-router-dom'
import DetailDialog from '../components/DetailDialog'
import Navbar from '../components/Navbar'

const MyPlants = () => {

    const [plants, setPlants] = useState([])
    const [user, setUser] = useState({})
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogPlant, setDialogPlant] = useState({})

    const [wishlist,setWishlist] = useState([])
    const [owned,setOwned] = useState([])

    const navigate = useNavigate()

    
    useEffect( () => {
        axios.get("http://localhost:8000/api/user/findUser", {withCredentials: true})
            .then(res => {
                setUser(res.data)
                setWishlist([...res.data.wishlist])
                setOwned([...res.data.owned])
            })
            .catch(err => {
                navigate('/login')
                console.log(err)
            })
        axios.get(`http://localhost:8000/api/plants/all`)
        .then(res => {
            setPlants(res.data)
        })
        .catch(err => console.log(err))
    },[navigate])

    // THIS SECTION RUNS THE INITIAL STUFF USING A HARD CODED USER ID - USEFUL FOR TESTING
    // *************************************************************************************
    // const hardCodedUserID = "6373f942193678dc952b79ff"
    // useEffect( () => {
    //     axios.get(`http://localhost:8000/api/user/${hardCodedUserID}`)
    //             .then(res => {
    //                 setUser(res.data)
    //                 console.log(res.data)
    //                 setWishlist([...res.data.wishlist])
    //                 setOwned([...res.data.owned])
    //             })
    //             .catch(err => console.log(err))
    //     axios.get(`http://localhost:8000/api/plants/all`)
    //         .then(res => {
    //             setPlants(res.data)
    //         })
    //         .catch(err => console.log(err))
    // },[])
    //    ^previously had "user" inside the [] but it was rerendering constantly
    // *************************************************************************************

    const plantCardSizing = {
        height: "200px",
        margin: "15px",
        maxWidth: "300px"
    }

    const openDialog = (e,plant) => {
        if(e.target.type === "button") {
            return;
        }
        setDialogPlant(plant)
        setDialogOpen(true)
    }
    const closeDialog = () => {
        setDialogPlant({})
        setDialogOpen(false)
    }

    const moveTo = (toList,fromList,id) => {
        if(toList === "wishlist") {
            axios.put(`http://localhost:8000/api/user/edit/${user._id}`,{$pull: {owned: id}, $push: {wishlist: id}})
                .then(res => {
                    setWishlist([...wishlist,id])
                    setOwned([...owned].filter( plantId => plantId !== id))
                })
                .catch(err => console.log(err))
        }
        else {
            axios.put(`http://localhost:8000/api/user/edit/${user._id}`,{$pull: {wishlist: id}, $push: {owned: id}})
                .then(res => {
                    setWishlist([...wishlist].filter( plantId => plantId !== id))
                    setOwned([...owned,id])
                })
                .catch(err => console.log(err))
        }
    }

    const remove = (id) => {
        console.log("remove")
        axios.put(`http://localhost:8000/api/user/edit/${user._id}`,{$pull: {wishlist: id, owned: id}})
                .then(res => {
                    setWishlist([...wishlist].filter( plantId => plantId !== id))
                    setOwned([...owned].filter( plantId => plantId !== id))
                })
                .catch(err => console.log(err))
    }

    return (
        <div>
            <Navbar page={"myPlants"} status={"loggedIn"}/>
            <div  style={{overflow: "hidden", minWidth: "90%"}}>
                <div>
                    <h2>Owned Plants</h2>
                </div>
                <Paper style={{margin: "25px"}}>
                    {owned?.length === 0 ?
                    <div style={{padding: "25px"}}>
                        <h2>No plants currently owned. Start swiping to find some more</h2>
                        <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => navigate('/browse')}>Browse Plants</Button>
                    </div>
                    :
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {plants.filter( plant => owned.includes(plant._id)).map( (plant) => {
                            return (
                                <div key={plant._id} onClick={ (e) => openDialog(e,plant)}>
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
                    {wishlist?.length === 0 ?
                    <div style={{padding: "25px"}}>
                        <h2>No plants in wishlist. Start swiping to find some more</h2>
                        <Button variant='outlined' sx={{backgroundColor: "#50c756", color: "black", borderColor:"black"}} onClick={ () => navigate('/browse')}>Browse Plants</Button>
                    </div>
                    :
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {plants.filter( (plant) => wishlist.includes(plant._id)).map( (plant) => {
                            return (
                                <div key={plant._id} onClick={ (e) => openDialog(e,plant)}>
                                    <PlantCardSmall plant={plant} list={"wishlist"} moveTo={moveTo} remove={remove}></PlantCardSmall>
                                </div>
                        )})}
                    </div>
                    }
                </Paper>
                <DetailDialog plant={dialogPlant} dialogOpen={dialogOpen} closeDialog={closeDialog}/>
            </div>
        </div>
    )
}

export default MyPlants