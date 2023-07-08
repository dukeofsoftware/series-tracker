import { db } from "@/lib/db"
import { SeriesType } from "@/lib/validators/series"

export const getSeries = async (userId: string) => {
  const series = await db.userSeries.findMany({
    where: {
      userId: userId,
    },
  })
  return series
}

export const deleteSeries = async (apiId: string) => {
  const deletedSeries = await db.userSeries.deleteMany({
    where: {
      apiId: apiId,
    },
  })
  return deletedSeries
}

export const postSeries = async (data: SeriesType, userId: string) => {
  const createdSeries = await db.userSeries.create({
    data: {
      apiId: data.apiId.toString(),
      userId: userId,
      name: data.name,
      permalink: data.permalink,
      network: data.network,
      status: data.status,
      image_thumbnail_path: data.image_thumbnail_path,
    },
  })
  return createdSeries
}

export const patchSeries = async (req: Request) => {}
