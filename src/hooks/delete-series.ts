import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export const useDeleteSeries = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (id: string) => {
     
      
      const response = await axios.delete(`/api/series/${id}`)
      return response.data
    },

    onSuccess: () => {
      toast.success("Series deleted successfully!")
      router.refresh()
    },
    onError: (err: any) => {
      toast.error("Something went wrong!", err)
    },
  })
}
