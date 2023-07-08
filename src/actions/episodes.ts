import { db } from "@/lib/db"

export const getEpisodes = async (userId: string) => {
  const series = await db.userSeries.findMany({
    where: {
      userId: userId,
    },
  })
  return series
}

export const postEpisodes = async (data: any) => {
  const createdSeries = await db.episode.create({
    data: {
      seriesId: data.seriesId,
      userId: data.userId,
    },
  })
  return createdSeries
}

export const patchEpisodes = async (req: Request) => {}
