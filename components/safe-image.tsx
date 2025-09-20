"use client"
import Image, { type ImageProps } from "next/image"
import { useState } from "react"

type Props = ImageProps & { fallbackSrc?: string }

export default function SafeImage({ src, alt, className, fallbackSrc = "/placeholder.png", ...rest }: Props) {
  const [current, setCurrent] = useState(src)
  return (
    <Image
      src={current || "/placeholder.svg"}
      alt={alt}
      className={className}
      onError={() => setCurrent(fallbackSrc)}
      {...rest}
    />
  )
}
