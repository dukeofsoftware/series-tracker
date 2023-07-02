import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/api/(.*)", "/(api|trpc)(.*)"],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
