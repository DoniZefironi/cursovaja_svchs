import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode"; 

export const login = async (email, password) => {
    try {
        const { data } = await $host.post('api/user/login', { email, password });
        console.log("Login response data:", data); 
        if (data.accessToken) {
            localStorage.setItem('token', data.accessToken); 
            const decodedToken = jwtDecode(data.accessToken); 
            console.log("Decoded token:", decodedToken);
            return decodedToken;
        } else {
            throw new Error("Token not found in the response");
        }
    } catch (error) {
        console.error("Failed to login:", error);
        throw error;
    }
}
