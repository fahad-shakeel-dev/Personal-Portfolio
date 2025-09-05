

"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Loading from "@/app/loading"

export default function GlobalLoaderWrapper({ children }) {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Detect clicks on any Next.js Link
    const handleClick = (e) => {
      const link = e.target.closest("a")
      if (link?.href && link.origin === window.location.origin) {
        setLoading(true)
      }
    }
    document.addEventListener("click", handleClick)

    // When pathname actually changes → stop loader
    setLoading(false)

    return () => document.removeEventListener("click", handleClick)
  }, [pathname])

  return (
    <>
      {loading && <Loading />}
      {children}
    </>
  )
}
