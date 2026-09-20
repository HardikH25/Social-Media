import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom'; // Must use Navigate component, not useNavigate hook

const ProtectedRoute = ({children}) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return null; // Wait for backend check
    }
    if(!user){
        return <Navigate to="/login"/> 
    }
    return children;
}
export default ProtectedRoute;