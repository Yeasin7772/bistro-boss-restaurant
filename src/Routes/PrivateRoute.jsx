import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from 'react-router'


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return <div className="flex justify-center items-center"><span className="loading loading-bars loading-lg"></span></div>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRoute;