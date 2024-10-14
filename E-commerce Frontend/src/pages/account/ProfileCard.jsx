import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ProfileCard({ isAdmin = false }) {
    return (
        <div>
            <Outlet context={isAdmin} />
        </div>
    )
}
