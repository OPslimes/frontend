import React from 'react';
import {FaPersonBooth,  FaCodepen, FaIcons} from "react-icons/fa";

function Navbar() {
    return (
        <div className = "flex navbar justify-center">

            <div className= "align-top image-full">
                <img src= "/assests/God.png" alt = "Hello World"/>
            </div>

            <div>
            <FaCodepen className= "badge btn btn-sm m-3"/>
            <FaPersonBooth className= "badge btn btn-sm m-3"/>
            <FaIcons className= "badge btn btn-sm m-3"/>
            </div>

        </div>
    )
}

export default Navbar;