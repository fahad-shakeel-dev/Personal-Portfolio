

// "use client"

// import { useEffect, useState } from "react"
// import { usePathname } from "next/navigation"
// import Loading from "@/app/loading"

// export default function GlobalLoaderWrapper({ children }) {
//   const [loading, setLoading] = useState(false)
//   const pathname = usePathname()

//   useEffect(() => {
//     // Detect clicks on any Next.js Link
//     const handleClick = (e) => {
//       const link = e.target.closest("a")
//       if (link?.href && link.origin === window.location.origin) {
//         setLoading(true)
//       }
//     }
//     document.addEventListener("click", handleClick)

//     // When pathname actually changes → stop loader
//     setLoading(false)

//     return () => document.removeEventListener("click", handleClick)
//   }, [pathname])

//   return (
//     <>
//       {loading && <Loading />}
//       {children}
//     </>
//   )
// }


// app/global-loader.js
"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Loading from "@/app/loading"

export default function GlobalLoaderWrapper({ children }) {
  const [loading, setLoading] = useState(false)
  const [navigationTarget, setNavigationTarget] = useState(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Set a timeout to automatically stop loading after 8 seconds
    let timeoutId
    if (loading) {
      timeoutId = setTimeout(() => {
        console.warn("Navigation timeout - stopping loader")
        setLoading(false)
        // If we have a navigation target that failed, redirect to it
        if (navigationTarget) {
          router.push(navigationTarget)
        }
      }, 10000) // 8 second timeout
    }

    return () => clearTimeout(timeoutId)
  }, [loading, navigationTarget, router])

  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest("a")
      
      // Check if it's a same-origin navigation link
      if (link && link.href && link.origin === window.location.origin) {
        // Don't intercept if it's a download link, has target="_blank", or is a hash link
        if (link.target === "_blank" || link.hasAttribute("download") || link.href.includes("#")) {
          return
        }

        e.preventDefault()
        setNavigationTarget(link.href)
        setLoading(true)
        
        // Use Next.js router for navigation
        router.push(link.href)
      }
    }

    // Handle route changes and errors
    const handleRouteChangeComplete = () => {
      setLoading(false)
      setNavigationTarget(null)
    }

    const handleRouteChangeError = () => {
      setLoading(false)
      setNavigationTarget(null)
    }

    document.addEventListener("click", handleClick)
    
    // Listen for Next.js navigation events
    if (window.__NEXT_DATA__) {
      window.addEventListener('routeChangeComplete', handleRouteChangeComplete)
      window.addEventListener('routeChangeError', handleRouteChangeError)
    }

    return () => {
      document.removeEventListener("click", handleClick)
      if (window.__NEXT_DATA__) {
        window.removeEventListener('routeChangeComplete', handleRouteChangeComplete)
        window.removeEventListener('routeChangeError', handleRouteChangeError)
      }
    }
  }, [pathname, router])

  // Additional safety: always stop loading when pathname changes
  useEffect(() => {
    setLoading(false)
    setNavigationTarget(null)
  }, [pathname])

  return (
    <>
      {loading && <Loading />}
      {children}
    </>
  )
}