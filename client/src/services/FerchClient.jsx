import { useContext } from "react"
import { UserContext } from "../providers/UserProvider"


function clearUserData() {
    const {token,setToken,setIsAuth,setExpiresIn} = useContext(UserContext) 
    setToken(undefined)
    setIsAuth(false)
    setExpiresIn(undefined)
    
}
const FetchClient = {
    async handleResponse(response) {
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                clearUserData();
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response;
    },
   
    async get(url, token) {
        const response = await fetch(url, token && {
            headers: {
                Authorization: `${token}`
            }
        });
        return this.handleResponse(response);
    },

    async post(url, body, token) {
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
        });
        return this.handleResponse(response);
    },

    async delete(url, token) {
        const response = await fetch(url, {
            method: "delete",
            headers: {
                Authorization: `${token}`
            }
        });
        return this.handleResponse(response);
    }
}
export default FetchClient