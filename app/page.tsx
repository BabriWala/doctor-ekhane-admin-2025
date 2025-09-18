// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { redirect } from "next/navigation"

export default function HomePage() {
  redirect("/admin")
}
