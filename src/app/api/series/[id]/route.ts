import { redirect } from "next/navigation"
import { deleteSeries } from "@/actions/series"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

import { db } from "@/lib/db"

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) {
  try {
    const user = await currentUser()
    if (!user || !user.id) redirect("/auth/login")
    
    const series = await db.userSeries.findFirst({
      where: {
        apiId: params.id,
        userId: user.id,
      },
    })

    if (!series) return new Response("Series not found", { status: 404 })

    await deleteSeries(params.id)

    return new Response("Series successfully deleted", { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response("Error deleting series", { status: 500 })
  }
}
