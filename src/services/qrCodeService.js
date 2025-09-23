import api from "../api/axios";

// Tüm Qr kodlarını getirir
export const getQrCodes = async () => {
    try {
        const res = await api.get("/QrCode");
        return res.data; // response.data'yı döndürür
    } catch (error) {
        console.error("Qr kodları çekme hatası:", error);
        throw error; // useQuery içinde yakalanacak
    }
}

// Yeni Qr kodalrını oluşturur
export const createQrCode = async (data) => {
    try {
        const res = await api.post("/QrCode/generate", data);
        return res.data;
    } catch (error) {
        console.error("Qr kod oluşturma hatası:", error);
        throw error; // useMutation içinde yakalnacak
    }
}

// Qr kodunu günceller
export const updateQrCode = async (id, data) => {
    try {
        const res = await api.put(`/QrCode/${id}`, data);
        return res.data;
    } catch (error) {
        console.error("Qr kod güncelleme hatası:", error);
        throw error;
    }
}