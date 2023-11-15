import { getServerSession } from "next-auth"
import { z } from 'zod'
import { JwtSchema } from "@/schemas/global"

export type jwtType = z.infer<typeof JwtSchema>
export default async function Home() {
  const session = await getServerSession()
  return (
    <main>
      <p></p>
    </main>
  )
}
