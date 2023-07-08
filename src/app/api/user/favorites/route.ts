import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

import { db } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = searchParams.get("page")
    const skip = page === "1" ? 0 : (parseInt(page || "0") - 1) * 20
    const user = await currentUser()
    const pages = await db.userSeries.count({
      where: {
        userId: user?.id,
      },
    })
    if (!user || !user.id) return new Response("Unauthorized", { status: 401 })
    const series = await db.userSeries.findMany({
      where: {
        userId: user.id,
        is_favorite: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 20,
      skip: skip,
    })


    if (!series) {
      return new Response("Series not found", { status: 404 })
    }
    return NextResponse.json(
      {
        series,
        page: page ? parseInt(page) : 0,
        pages: Math.ceil(pages / 20),
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response("Error updating series", { status: 500 })
  }
}
