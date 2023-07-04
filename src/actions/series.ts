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
  const deletedSeries = await db.userSeries.delete({
    where: {
      apiId: apiId,
    },
  })
  return deletedSeries
}

export const postSeries = async (apiId: string, userId: string) => {
  const createdSeries = await db.userSeries.create({
    data: {
      apiId: apiId,
      userId: userId,
    },
  })
  return createdSeries
}

export const patchSeries = async (req: Request) => {}
