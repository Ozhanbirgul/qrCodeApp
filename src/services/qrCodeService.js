import api from "../api/axios";

// Tüm Qr kodlarını getirir
export const getQrCodes = () => {
    return api.get("/QrCode"); // axios ile /QrCode endpointine GET isteği gönderiliyor.
};

// Yeni Qr kodalrını oluşturur
export const createQrCode = (data) => {
    return api.post("/QrCode/generate", data);
} 