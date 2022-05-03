import React from 'react';
import "../styles/Home.css";


function Hero() {
    return (
        <div className= "grid" >
            <div className= "">
            <h1 className= 'text-7xl text-white font-bold mx-24 text-center'>
                Reviews in
            </h1>
            <h2 className= 'text-7xl text-yellow-400 font-bold mx-48 text-center'>
                Color
            </h2>

            <h2 className= 'text-center text-white font-bold mt-7'>
                Zeus is a peer-to-peer review website
                for developers to grade eachother's work.

                We provide collaboration tools for students and
                new developers to get accurate, peer-reviewed content

                We utilizes "Code-Spaces" to work and edit other people's
                work. Just send the link to your code space to another person
                and they can edit it whenever!
            </h2>
            </div>

        </div>
    );
}

export default Hero;