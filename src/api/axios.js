import axios from "axios";

// axios instace
const api = axios.create({
    baseURL: "https://api.ikkutusu.com.tr/api", //tüm isteklerin başlangıç adresi
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
})

export default api;