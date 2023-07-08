import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"

import { SeriesType } from "@/lib/validators/series"

export const useCreateSeries = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post<SeriesType>("/api/series", data)

      return response
    },
    onSuccess: () => {
      toast.success(" Series Added Successfully")
      router.refresh()
    },
    onError: () => {
      toast.error("Error while adding series")
    },
  })
}
