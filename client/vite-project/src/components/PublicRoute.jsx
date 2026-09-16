import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

function PublicRoute({ children }) {
    const { user } = useAuth()

    if (user) {
        //move user to homepage
        return <Navigate to='/home' />
    }

    return children
}
export default PublicRoute