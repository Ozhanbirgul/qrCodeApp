import api from "../api/axios";


// Tüm Qr kodlarını getirir
export const getQrCodes = () => {
    return api.get("/QrCode");
};


// Yeni Qr kodalrını oluşturur
export const createQrCode = (data) => {
    return api.post("/QrCode/generate", data);
} 