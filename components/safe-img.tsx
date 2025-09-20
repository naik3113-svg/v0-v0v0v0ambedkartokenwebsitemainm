"use client"
import { useState } from "react"
import type React from "react"

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string
}

export default function SafeImg({ src, alt, className, fallbackSrc = "/placeholder.svg", ...rest }: Props) {
  const [current, setCurrent] = useState(src)
  return (
    <img
      src={current || "/placeholder.svg"}
      alt={alt}
      className={className}
      onError={() => setCurrent(fallbackSrc)}
      {...rest}
    />
  )
}
