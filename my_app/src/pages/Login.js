import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { Navigate, useNavigate } from 'react-router-dom';


import './style.css'

import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'

import { Cookies } from 'react-cookie'
import useLocalStorage from 'react-use-localstorage';

import Navbar from '../component/Navbar';

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

const GetDashboard = gql`
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

function Login() {
    const [visibility, setVisibility] = useState(false)
    const [iconVisibility, setIconVisibility] = useState(false)
    const [checked, setChecked] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [errorMsgPW, setErrorMsgPW] = useState('')

    const [usernameLS, setNameLS] = useLocalStorage('username', username)
    const [passwordLS, setPasswordLS] = useLocalStorage('password', password)

    const [getAuth, { data, loading, error }] = useLazyQuery(GetAuth)
    const [GetAuthDashboard, queryTodo] = useLazyQuery(GetDashboard)
    let Navigate = useNavigate()
    const cookies = new Cookies()

    useEffect(() => {
        setErrorMsg(errorMsg)
        if (data?.auth.length === 1) {
            console.log(data?.auth.length);
            cookies.set('auth', true, { path: '/' })
            setNameLS(usernameLS)
            setPasswordLS(passwordLS)
            return Navigate('/home')
        } else if (queryTodo.data?.auth.length === 1) {
            cookies.set('auth1', true, { path: '/' })
            return Navigate('/dashboard')
        }
    }, [data])

    const loginAuth = async () => {
        GetAuthDashboard({
            variables: {
                _eq: username,
                _eq1: password,
                _eq2: 'admin'
            },
        })
        getAuth({
            variables: {
                _eq: username,
                _eq1: password,
                _eq2: 'user'
            },
        })
        if (await data?.auth.username != username && data?.auth.username != password) {
            setErrorMsg('Username tidak sesuai!')
            setErrorMsgPW('Password Salah!')
            console.log(errorMsg)
        }
    }

    if (loading) {
        return (
            <h1>loading...</h1>
        )
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
        <Navbar />
            <div className='container-login'>
                <div className='loginn'>
                    <div className='boxx'>
                        <h1>Login</h1>
                        <input placeholder='Username' type='text' onChange={handleChangeUsername} />
                        <div>{errorMsg}</div>
                        <div>
                            <input placeholder='Password' type={visibility ? 'text' : 'password'} onChange={handleChangePassword} />
                            <span onClick={showPassword}><Icon icon={iconVisibility ? eye : eyeOff} /></span>
                        </div>
                        <div>{errorMsgPW}</div>
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