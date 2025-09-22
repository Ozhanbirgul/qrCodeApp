import { useQuery } from "@tanstack/react-query";
import {
  getQrCodes,
} from "../services/qrCodeService";


/*
 * Listeleme: useQrCodes
 * - return: { data, isLoading, isError, refetch, ... }
 * - data => burada response.data (ör. { result: [...] }) 
 */


export const useQrCodes = () => {
    return useQuery({
        queryKey: ["qrCodes"],
        queryFn: async () => {
            const res = await getQrCodes();
            // Eğer servis fonksiyonun "axios response" (response) döndürüyor ise:
            // return res.data
            // Eğer servis fonksiyonun zaten response.data döndürüyor ise:
            // return res
            // Aşağıdaki ifade her iki durumu da güvenli şekilde kapsar:
            return res?.data ?? res;
        }
    })
}
