"use client"

import Script from "next/script"

export function Analytics() {
  if (!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
    return null
  }

  return (
    <Script
      defer
      data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
      src={process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT || "https://plausible.io/js/script.js"}
    />
  )
}
