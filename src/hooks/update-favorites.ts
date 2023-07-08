import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"

export const useUpdateFavorites = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios
        .patch(`/api/series/${id}/favorites`)
        .then((res) => res.data)

      return response
    },

    onSuccess: () => {
      toast.success("Series added to favorites!")
      router.refresh()
    },
    onError: (err: any) => {
      toast.error("Something went wrong!", err)
    },
  })
}
