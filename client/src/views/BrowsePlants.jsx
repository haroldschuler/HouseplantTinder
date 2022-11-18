import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card'
import Navbar from '../components/Navbar';
import PlantCard from '../components/PlantCard';
import Sidebar from '../components/Sidebar';
import SwipeDialog from '../components/SwipeDialog';

const BrowsePlants = () => {

    const [plant,setPlant] = useState({})
    const [prevPlant, setPrevPlant] = useState({})
    const [user,setUser] = useState({})
    const [generateNew, setGenerateNew] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false)

    const navigate = useNavigate()

    const [saying,setSaying] = useState([])
    const sayings = [
        ["leafy","lad"],
        ["green","gal"],
        ["foliated","friend"],
        ["pollinated","pal"],
        // ["housewarming","homie"],
        ["lush","lady"],
        ["bulbed","boy"],
        ["chlorophyllic","confidante"],
        ["cellulosic","sister"],
        ["broadleafed","bro"],
        ["budding","buddy"]
    ]

    useEffect(() => {
        setSaying(sayings[Math.floor(Math.random()*sayings.length)]);
    },[generateNew])
    
    const wrapper = {
        display: "flex",
        padding: "50px 0px",
        width: "100vw",
        overflow: "hidden",
        justifyContent: "center"
    }
    
    const plantCardSizing = {
        width: "400px",
        height: "500px"
    }

    // THIS SECTION RUNS THE INITIAL STUFF USING A HARD CODED USER ID - USEFUL FOR TESTING
    // *************************************************************************************
    // const hardCodedUserID = "6373f942193678dc952b79ff"
    // useEffect( () => {
    //     axios.get(`http://localhost:8000/api/user/${hardCodedUserID}`)
    //             .then(res => {
    //                 setUser(res.data)
    //                 let tempUser = res.data;
    //                 axios.post("http://localhost:8000/api/plant/find",{_id: {$nin: tempUser.swiped}})
    //                         .then(res => {
    //                             setPlant(res.data[Math.floor(Math.random()*res.data.length)])
    //                         })
    //                         .catch(err => console.log(err))
    //             })
    //             .catch(err => console.log(err))
    // },[generateNew])
    // *************************************************************************************

    useEffect( () => {
        axios.get("http://localhost:8000/api/user/findUser", {withCredentials: true})
            .then(res => {
                setUser(res.data)
                let tempUser = res.data;
                axios.post("http://localhost:8000/api/plant/find",{_id: {$nin: tempUser.swiped}})
                        .then(res => {
                            setPlant(res.data[Math.floor(Math.random()*res.data.length)])
                        })
                        .catch(err => console.log(err))
            })
            .catch(err => {
                navigate('/login')
                console.log(err)
            })
    },[generateNew,navigate])

    const onSwipe = (direction) => {
        // console.log("You swiped " + direction);
        if(direction === "left") {
            sayNo();
        }
        else if(direction === "right") {
            sayYes();
        }
    }

    const onCardLeftScreen = (myIdentifier) => {
        // console.log(myIdentifier + ' left the screen')
    }

    const sayYes = () => {
        setPrevPlant(plant)
        setPlant({})
        let temp = generateNew + 1;
        setGenerateNew(temp)
        // THIS PUT REQUEST WORKS
        axios.put(`http://localhost:8000/api/user/edit/${user._id}`,{$addToSet: {wishlist: plant._id,swiped: plant._id}})
            .then(res => {
                    // console.log(res.data)
                })
                .catch(err => console.log(err))
        setDialogOpen(true)
    }

    const sayNo = () => {
        setPlant({})
        let temp = generateNew + 1;
        setGenerateNew(temp)
        // THIS PUT REQUEST WORKS
        axios.put(`http://localhost:8000/api/user/edit/${user._id}`,{$addToSet: {swiped: plant._id}})
            .then(res => {
                // console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    const closeDialog = () => {
        setDialogOpen(false)
    }

    return (
        <div>
            <Navbar page={"browse"} status={"loggedIn"}/>
            <div style={wrapper}>
                <Sidebar text={"no"}/>
                {plant._id ? 
                <TinderCard onSwipe={ onSwipe } onCardLeftScreen={ () => onCardLeftScreen('what')} preventSwipe={['up','down']} flickOnSwipe={"false"}>
                    <PlantCard plant={plant} buttons={"yes/no"} sayYes={sayYes} sayNo={sayNo} size={plantCardSizing}/>
                </TinderCard>
                :
                <p>Loading...</p>
                }
                <Sidebar text={"yes"}/>
                <SwipeDialog open={dialogOpen} closeDialog={closeDialog} plant={prevPlant} saying={saying}/>
            </div>
        </div>
    )
}

export default BrowsePlants