import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Outlet } from 'react-router'

const cookies = new Cookies()

export default function PrivateRouteDashboard() {
    const auth2 = cookies.get('auth1')

    return auth2 ? <Outlet /> : <Navigate to='/' />;
}