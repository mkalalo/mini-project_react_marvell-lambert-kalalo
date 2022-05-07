import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { Navigate, useNavigate } from 'react-router-dom';

import './style.css'

import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { Cookies } from 'react-cookie'

const GetAuth = gql`
query MyQuery($_eq: String, $_eq1: String, $_eq2: String) {
    auth(where: { username: { _eq: $_eq }, password: { _eq: $_eq1 }, level: {_eq: $_eq2 } }) {
        id
        level
        name
        password
        username
    }
}
`

// const GetDashboard = gql`
// query MyQuery($_eq: String, $_eq1: String, $_eq2: String) {
//     auth(where: { username: { _eq: $_eq }, password: { _eq: $_eq1 }, level: {_eq: $_eq2 } }) {
//         id
//         level
//         name
//         password
//         username
//     }
// }
// `

function Login() {
    const [visibility, setVisibility] = useState(false)
    const [iconVisibility, setIconVisibility] = useState(false)
    const [checked, setChecked] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [getAuth, { data, loading, error }] = useLazyQuery(GetAuth)
    // const [GetAuthDashboard, queryTodo] = useLazyQuery(GetDashboard)
    let Navigate = useNavigate()
    const cookies = new Cookies()

    useEffect(() => {
        if (data?.auth.length === 1) {
            cookies.set('auth', true, { path: '/' })
            return Navigate('/home')
        }
    }, [data])

    const loginAuth = () => {
        getAuth({
            variables: {
                _eq: username,
                _eq1: password,
                _eq2: 'admin'
            },
        })
    }

    if (loading) {
        return <h1>loading...</h1>
    }

    const rememberMe = () => {
        setChecked(!checked)
    }

    const showPassword = () => {
        setVisibility(!visibility)
        setIconVisibility(!iconVisibility)
    }

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <>
            <div className='container-login'>
                <div className='loginn'>
                    <div className='boxx'>
                        <h1>Login</h1>
                        <input placeholder='Username' type='text' onChange={handleChangeUsername} />
                        <div>
                            <input placeholder='Password' type={visibility ? 'text' : 'password'} onChange={handleChangePassword} />
                            <span onClick={showPassword}><Icon icon={iconVisibility ? eye : eyeOff} /></span>
                        </div>
                        <label className='form-controll'>
                            <input onClick={rememberMe} checked={checked ? 'checked' : ''} type='checkbox' />
                            Remember Me
                        </label>
                        <button onClick={loginAuth}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login