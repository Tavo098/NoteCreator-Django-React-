import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants.js";
import {useState, useEffect} from "react";

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const response = await api.post('/api/token/refresh/', {refresh: refreshToken});
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)
            }else {
                setIsAuthorized(false)
            }
        }catch(e){
            console.log(e)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN)
        if (!accessToken) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(accessToken)
        const expiresAt = decoded.exp
        const now = Date.now() / 1000
        if (expiresAt < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }

    }


    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login"/>
}
export default ProtectedRoute