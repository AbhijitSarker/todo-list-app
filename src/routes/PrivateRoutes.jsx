import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="loader"></div>

    }
    if (user) {
        return children;

    }
    return <Navigate to='/signin'></Navigate>
};

export default PrivateRoutes;