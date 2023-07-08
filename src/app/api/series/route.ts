import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {  getSeries, postSeries } from "@/actions/series"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

import { seriesValidator } from "@/lib/validators/series"

export async function GET(req: Request) {
  try {
    const user = await currentUser()
    if (!user || !user.id) redirect("/auth/login")
    const series = await getSeries(user.id)

    return new Response(JSON.stringify(series), {
      headers: { "content-type": "application/json" },
      status: 200,
    })
  } catch (error) {
    return new Response("Error getting series", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    if (!user || !user.id) redirect("/auth/login")

    const body = await req.json()
    const {
      apiId,
      name,
      permalink,
      network,
      status,
      image_thumbnail_path,
    } = seriesValidator.parse(body)

    if (!apiId) return new Response("apiId is required", { status: 400 })
    const existingSeries = await getSeries(user.id)
    if (existingSeries.find((series: any) => series.apiId === apiId))
      return new Response("Series already exists", { status: 400 })
    await postSeries(
      {
        apiId,
        name,
        permalink,
        network,
        status,
        image_thumbnail_path,
      },
      user.id
    )

  
    revalidatePath(`/api/series/${permalink}`)

    return new Response("Series successfully added ", { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response("Error adding series to user", { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await currentUser()
    if (!user || !user.id) redirect("/auth/login")

    const body = await req.json()
    const { apiId } = seriesValidator.parse(body)
    if (!apiId) return new Response("apiId is required", { status: 400 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response("Error updating series", { status: 500 })
  }
}
