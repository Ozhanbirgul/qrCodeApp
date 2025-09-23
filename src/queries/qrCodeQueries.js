import { useQuery } from "@tanstack/react-query";
import { getQrCodes } from "../services/qrCodeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQrCode } from "../services/qrCodeService";
import { updateQrCode } from "../services/qrCodeService";
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
    },
  });
};

/*
 * Yeni oluşturma: useCreateQrCode
 */
export const useCreateQrCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createQrCode(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["qrCodes"]);
    },
  });
};



/*
 * Güncelleme: useUpdateQrCode
 * - qrToUpdate objesi veya id+payload içerebilir
*/

export const useUpdateQrCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (qrToUpdate) => updateQrCode(qrToUpdate),
        onSuccess: () => {
            // Listeyi güncelle
            queryClient.invalidateQueries(["qrCodes"]);
        },
        onError: (err) => {
            console.error("updateQrCode error:", err)
        }
    })
}