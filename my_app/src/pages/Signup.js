import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import './style.css'

import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import Navbar from '../component/Navbar'

const listAuth = gql`
query MyQuery {
    trip {
        id
        name
        level
        username
        password
    }
}
`

const InsertAuth = gql`
mutation MyMutation($object: auth_insert_input!) {
    insert_auth_one(object: $object) {
        id
    }
}
`

function Signup() {
    const baseData = {
        nama: '',
        username: '',
        password: ''
    }

    const [insertAuth, { loading: loadingInsert }] = useMutation(InsertAuth, { refetchQueries: [listAuth] })

    const [visibility, setVisibility] = useState(false)
    const [iconVisibility, setIconVisibility] = useState(false)
    const [checked, setChecked] = useState(false)

    const [data, setData] = useState(baseData)

    const onChangeAuth = e => {
        const name = e.target.name
        const value = e.target.value

        setData({
            ...data,
            [name]: value
        })
    }

    const onSubmitAuth = e => {
        e.preventDefault();
        insertAuth({
            variables: {
                object: {
                    name: data.nama,
                    username: data.username,
                    password: data.password,
                    level: 'user'
                }
            }
        })
        resetData()
    }

    const resetData = () => {
        setData(baseData)
    }

    const rememberMe = () => {
        setChecked(!checked)
    }

    const showPassword = () => {
        setVisibility(!visibility)
        setIconVisibility(!iconVisibility)
    }

    return (
        <>
            <Navbar />
            <div className='container-daftar'>
                <div className='daftar'>
                    {/* <div className='boxx'> */}
                    <form onSubmit={onSubmitAuth} className='boxx'>
                        <h1>Sign Up</h1>
                        <input name='nama' value={data.nama} onChange={onChangeAuth} placeholder='Name' type='text' />
                        <input name='username' value={data.username} onChange={onChangeAuth} placeholder='Username' type='text' />
                        <div>
                            <input name='password' value={data.password} onChange={onChangeAuth} placeholder='Password' type={visibility ? 'text' : 'password'} />
                            <span onClick={showPassword}><Icon icon={iconVisibility ? eye : eyeOff} /></span>
                        </div>
                        <input id='button-submit' type='submit' value='Submit' />
                    </form>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default Signup