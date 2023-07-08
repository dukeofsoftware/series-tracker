import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser()
    if (!user || !user.id) return new Response("Unauthorized", { status: 401 })

    if (!params.id) return new Response("id is required", { status: 400 })
    const series = await db.userSeries.findFirst({
      where: {
        apiId: params.id,
        userId: user.id,
      },
    })
    if (!series) {
      return new Response("Series not found", { status: 404 })
    }

    const updatedSeries = await db.userSeries.updateMany({
      where: {
        apiId: params.id,
        userId: user.id,
      },
      data: {
        is_favorite: series.is_favorite ? false : true,
      },
    })

    return new Response(JSON.stringify(updatedSeries), {
      headers: { "content-type": "application/json" },
      status: 200,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response("Error updating series", { status: 500 })
  }
}
