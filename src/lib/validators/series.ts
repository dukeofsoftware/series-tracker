import { z } from "zod"

export const seriesValidator = z.object({
  apiId: z.string().nonempty(),
  name: z.string().nonempty(),
  permalink: z.string().nonempty(),
  network: z.string().nonempty(),
  image_thumbnail_path: z.string().nonempty(),
  episodes: z.any(),
  status: z.string().optional(),
  user_status: z
    .enum(["PlanToWatch", "Watching", "Completed", "Dropped"])
    .optional(),
  is_favorite: z.boolean().optional(),
})

export type SeriesType = z.infer<typeof seriesValidator>
