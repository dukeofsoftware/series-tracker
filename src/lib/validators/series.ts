import { z } from "zod"

export const episodeValidator = z.object({
  apiId: z.string().nonempty(),
  userId: z.string().nonempty(),

  status: z.enum(["NotWatched", "Watched"]).optional(),
})

export const seriesValidator = z.object({
  apiId: z.string().nonempty(),
  episodes: z.array(episodeValidator).optional(),
  status: z
    .enum(["PlanToWatch", "Watching", "Completed", "OnHold", "Dropped"])
    .optional(),
  is_favorite: z.boolean().optional(),
})

export type SeriesType = z.infer<typeof seriesValidator>
