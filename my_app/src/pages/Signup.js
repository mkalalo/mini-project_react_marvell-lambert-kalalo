import React, { useState } from 'react'

import './style.css'

import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'

function Signup() {
    const [visibility, setVisibility] = useState(false)
    const [iconVisibility, setIconVisibility] = useState(false)
    const [checked, setChecked] = useState(false)

    const rememberMe = () => {
        setChecked(!checked)
    }

    const showPassword = () => {
        setVisibility(!visibility)
        setIconVisibility(!iconVisibility)
    }

    return (
        <>
            <div className='container-daftar'>
                <div className='daftar'>
                    <div className='boxx'>
                        <h1>Sign Up</h1>
                        <input  placeholder='Name' type='text' />
                        <input  placeholder='Username' type='text' />
                        <div>
                            <input placeholder='Password' type={visibility ? 'text' : 'password'} />
                            <span onClick={showPassword}><Icon icon={iconVisibility ? eye : eyeOff} /></span>
                        </div>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup