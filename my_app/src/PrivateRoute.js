import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Outlet } from 'react-router'

const cookies = new Cookies()

export default function PrivateRoute() {
    const auth = cookies.get('auth')

    return auth ? <Outlet /> : <Navigate to='/' />;
}