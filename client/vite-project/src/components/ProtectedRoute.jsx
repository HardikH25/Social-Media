import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const { user } = useAuth() // either useAuth or useContext(AuthContext) - both are same, but useAuth is a custom hook that we created in the AuthContext.jsx file, so we can use it here as well, but we can also use useContext(AuthContext) directly here, both are same.
    if (!user) {
        return <Navigate to='/login' />
    }
    return children
}
export default ProtectedRoute