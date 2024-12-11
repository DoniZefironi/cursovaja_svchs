import { $authHost,$host } from "./index";
import { jwtDecode } from "jwt-decode";

export const login = async (email, password) => {
    try {
        const { data } = await $host.post('api/user/login', { email, password }, { withCredentials: true });
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
        console.error("Failed to login:", error.message);
        console.error("Stack trace:", error.stack);
        throw error;
    }
}

export const registration = async (email, password, name, surname, patronymic, phone_number, position, roles) => {
    try {
        const { data } = await $host.post('api/user/registration', {
            email,
            password,
            name,
            surname,
            patronymic,
            phone_number,
            position,
            roles
        });
        console.log("Registration response data:", data);
        return data;
    } catch (error) {
        console.error("Failed to register:", error.message);
        console.error("Stack trace:", error.stack);
        throw error;
    }
};

export const logout = async () => {
    try {
        await $authHost.post('api/user/logout', {}, { withCredentials: true }); // Добавляем withCredentials: true
        localStorage.removeItem('token');
    } catch (error) {
        console.error("Failed to logout:", error);
    }
}
