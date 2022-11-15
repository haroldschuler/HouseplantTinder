import React from 'react'

const Sidebar = () => {

    const sidebar = {
        height: "100%",
        width: "100px",
        margin: "0px 100px",
        backgroundColor: "white"
    }

    return (
        <div onDragOver={ () => console.log("eyyyyy") } style={sidebar} onDropCapture={ () => console.log("this one")}>Sidebar</div>
    )
}

export default Sidebar