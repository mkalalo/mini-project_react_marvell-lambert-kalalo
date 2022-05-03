import React, { useState } from 'react'

import './style.css'

import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'

function Login() {
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
            <div className='container-login'>
                <div className='loginn'>
                    <div className='boxx'>
                        <h1>Login</h1>
                        <input  placeholder='Username' type='text' />
                        <div>
                            <input placeholder='Password' type={visibility ? 'text' : 'password'} />
                            <span onClick={showPassword}><Icon icon={iconVisibility ? eye : eyeOff} /></span>
                        </div>
                        <label className='form-controll'>
                            <input onClick={rememberMe} checked={checked ? 'checked' : ''} type='checkbox' />
                            Remember Me
                        </label>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login