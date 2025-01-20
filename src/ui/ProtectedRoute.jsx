import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

export default function ProtectedRoute({children}) {
    const navigate = useNavigate();

    // Check if user is auth (logged in)
    const {user, profile, isLoading} = useUser();
    
    useEffect(() => {
        if (!isLoading && !user && !profile) {
            navigate("/login");
        }
    }, [isLoading, user, profile, navigate]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (user && profile) {
        return children;
    }

}