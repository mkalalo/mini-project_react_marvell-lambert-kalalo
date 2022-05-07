import React from "react";
import './style.css'

import { Link } from 'react-router-dom'

function SidebarDashboard() {

    return (
        <>
            <div id="sidebar">
                <nav>
                    <ul>
                        <Link to='#'><li>Dashboard</li></Link>
                        <Link to='/dashboard/account'><li>Account</li></Link>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default SidebarDashboard