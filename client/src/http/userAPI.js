import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode"; // Импортируем jwtDecode как именованный экспорт

export const login = async (email, password) => {
    try {
        const { data } = await $host.post('api/user/login', { email, password });
        console.log("Login response data:", data); // Логирование данных ответа
        if (data.accessToken) {
            localStorage.setItem('token', data.accessToken); // Используем accessToken вместо token
            const decodedToken = jwtDecode(data.accessToken); // Используем jwtDecode для декодирования accessToken
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
