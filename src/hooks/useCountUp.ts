import { useEffect, useState } from "react"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)

      // Easing function (easeOutQuart)
      const easedProgress = 1 - Math.pow(1 - progress, 4)
      
      setCount(Math.floor(startValue + (end - startValue) * easedProgress))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isInView])

  return { count, ref }
}
