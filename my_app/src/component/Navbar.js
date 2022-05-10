import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './style.css'

import { gql, useQuery } from '@apollo/client';
import { Cookies } from 'react-cookie'

import { ic_shopping_cart } from 'react-icons-kit/md/ic_shopping_cart'
import { user } from 'react-icons-kit/typicons/user'
import { Icon } from 'react-icons-kit'

const getAuth = gql`
query MyQuery {
    auth {
        name
        username
        password
    }
}
`

function Navbar() {
    const getAuthQuery = useQuery(getAuth)

    const [navbarScrol, setNavbarScrol] = useState(false)
    const [buttonDaftar, setButtonDaftar] = useState(false)

    const cookies = new Cookies()

    const changeBackground = () => {
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

    // const [isLoggedin, setIsLoggedin] = useState(false)

    const isLoggedin = cookies.get('auth')

    const logout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        cookies.remove('auth')
        window.location.reload();
    }

    const handleClick = () => {
        setButtonDaftar(!buttonDaftar)
    }

    return (
        <>
            <div id="navbarr" className={navbarScrol ? 'navbar active' : 'navbar'}>
                <div id="nav">
                    <ul>
                        <Link to='/home'><li>Home</li></Link>
                        <Link to='/trip'><li>Trip</li></Link>
                        <Link to='/about'><li>About</li></Link>
                        <Link to='/contact'><li>Contact</li></Link>
                        <Link to='/keranjang'><Icon icon={ic_shopping_cart} /></Link>
                        { isLoggedin ? (                       
                            <span id="profile">
                                <Icon icon={user} />
                                {getAuthQuery.data?.auth.map((auth) => {
                                    if (auth.username === localStorage.getItem('username')) {
                                        return (
                                            <span>
                                                {auth.name}
                                                <div id="box">
                                                    <Icon icon={user} />
                                                    <div>
                                                        <p>{auth.name}</p>
                                                        <p>@{auth.username}</p>
                                                    </div>
                                                    <button onClick={logout}>Logout</button>
                                                </div>
                                            </span>
                                        )
                                    }
                                })}
                            </span>)
                            :
                            (
                            <Link to={buttonDaftar ? '/' : '/signup'}><button onClick={handleClick}>{buttonDaftar ? 'Login' : 'Daftar'}</button></Link>
                        )
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar