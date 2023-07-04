import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { deleteSeries, getSeries, postSeries } from "@/actions/series"
import { currentUser } from "@clerk/nextjs"
import { z } from "zod"

import { seriesValidator } from "@/lib/validators/series"

export async function GET(req: Request) {
try {
  const user = await currentUser()
  if (!user || !user.id) return new Response("Unauthorized", { status: 401 })
  const series = await getSeries(user.id)

  return new Response(JSON.stringify(series), {
    headers: { "content-type": "application/json" },
    status: 200,
  })
} catch (error) {

  return new Response("Error getting series", { status: 500 })
}
}

export async function DELETE(req: Request) {
try {
  const user = await currentUser()
  if (!user || !user.id) return new Response("Unauthorized", { status: 401 })

  const body = await req.json()
  const { apiId } = seriesValidator.parse(body)

  if (!apiId) return new Response("apiId is required", { status: 400 })

  await deleteSeries(apiId)


  return new Response("Series successfully deleted", { status: 200 })
} catch (error) {
  if (error instanceof z.ZodError) {
    return new Response(error.message, { status: 400 })
  }
  return new Response("Error deleting series", { status: 500 })
}
}

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    if (!user || !user.id) return new Response("Unauthorized", { status: 401 })

    const body = await req.json()
    const { apiId } = seriesValidator.parse(body)

    if (!apiId) return new Response("apiId is required", { status: 400 })

    await postSeries(apiId, user.id)

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
    if (!user || !user.id) return new Response("Unauthorized", { status: 401 })

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
