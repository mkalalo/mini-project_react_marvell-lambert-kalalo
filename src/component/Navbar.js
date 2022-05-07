import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './style.css'

import { ic_shopping_cart } from 'react-icons-kit/md/ic_shopping_cart'
import { Icon } from 'react-icons-kit'

function Navbar() {
    const [navbarScrol, setNavbarScrol] = useState(false)
    const [buttonDaftar, setButtonDaftar] = useState(false)

    const changeBackground = () => {
        console.log(window.scrollY)
        if (window.scrollY >= 1) {
            setNavbarScrol(true)
        } else {
            setNavbarScrol(false)
        }
    }

    useEffect(() => {
        changeBackground()
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground)
    })

    const handleClick = () => {
        setButtonDaftar(!buttonDaftar)
    }

    return (
        <>
            <div id="navbarr" className={navbarScrol ? 'navbar active' : 'navbar'}>
                <div>
                    <ul>
                        <Link to='/home'><li>Home</li></Link>
                        <Link to='/trip'><li>Trip</li></Link>
                        <Link to='/about'><li>About</li></Link>
                        <Link to='/contact'><li>Contact</li></Link>
                        <Link to='/keranjang'><Icon icon={ic_shopping_cart} /></Link>
                        <Link to={buttonDaftar ? '/' : '/signup'}><button onClick={handleClick}>{buttonDaftar ? 'Login' : 'Daftar'}</button></Link>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar