

"use client"

import { useState, useEffect } from "react"

export default function Counter({ from = 0, to = 100, duration = 2000 }) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    const startTime = Date.now()
    const difference = to - from

    const updateCount = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.round(from + difference * easeOutQuart)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(updateCount)
    }, 500)

    return () => clearTimeout(timer)
  }, [from, to, duration])

  return <span>{count}</span>
}
