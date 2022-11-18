import React from 'react'

const Sidebar = (props) => {

    const sidebar = {
        // height: "100%",
        width: "100px",
        margin: "0px 200px",
        alignItems: "center",
        display: "flex"


    }

    return (
        <div style={sidebar} onDropCapture={ () => console.log("this one")}>
            {props.text === "yes" ?
            <h1>Yes!</h1>
            :
            <h1>Nope</h1>
            }
        </div>
    )
}

export default Sidebar