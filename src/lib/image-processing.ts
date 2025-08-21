import sharp from "sharp"
import { Buffer } from "buffer"

export interface ImageProcessingOptions {
  width?: number
  height?: number
  quality?: number
  format?: "webp" | "jpeg" | "png"
  watermark?: boolean
  watermarkText?: string
  watermarkOpacity?: number
  watermarkFontSize?: number
}

export async function processImage(
  buffer: Buffer,
  options: ImageProcessingOptions = {}
): Promise<Buffer> {
  const {
    width,
    height,
    quality = 80,
    format = "webp",
    watermark = false,
    watermarkText = process.env.WATERMARK_TEXT || "© Wild Blast",
    watermarkOpacity = parseFloat(process.env.WATERMARK_OPACITY || "0.3"),
    watermarkFontSize = parseInt(process.env.WATERMARK_FONT_SIZE || "24"),
  } = options

  let image = sharp(buffer)

  // Resize if dimensions provided
  if (width || height) {
    image = image.resize(width, height, {
      fit: "inside",
      withoutEnlargement: true,
    })
  }

  // Convert to specified format
  switch (format) {
    case "webp":
      image = image.webp({ quality })
      break
    case "jpeg":
      image = image.jpeg({ quality })
      break
    case "png":
      image = image.png({ quality })
      break
  }

  // Add watermark if requested
  if (watermark) {
    const metadata = await image.metadata()
    const imgWidth = metadata.width || 800
    const imgHeight = metadata.height || 600

    // Create watermark SVG
    const watermarkSvg = `
      <svg width="${imgWidth}" height="${imgHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="black" flood-opacity="0.5"/>
          </filter>
        </defs>
        <text 
          x="50%" 
          y="50%" 
          text-anchor="middle" 
          dominant-baseline="middle"
          font-family="Arial, sans-serif"
          font-size="${watermarkFontSize}"
          font-weight="bold"
          fill="white"
          opacity="${watermarkOpacity}"
          filter="url(#shadow)"
          transform="rotate(-45, ${imgWidth / 2}, ${imgHeight / 2)"
        >
          ${watermarkText}
        </text>
      </svg>
    `

    image = image.composite([
      {
        input: Buffer.from(watermarkSvg),
        top: 0,
        left: 0,
      },
    ])
  }

  return await image.toBuffer()
}

export async function generateThumbnail(
  buffer: Buffer,
  size: number = 300
): Promise<Buffer> {
  return processImage(buffer, {
    width: size,
    height: size,
    quality: 70,
    format: "webp",
    watermark: true,
  })
}

export async function generatePreview(
  buffer: Buffer,
  maxWidth: number = 1200
): Promise<Buffer> {
  return processImage(buffer, {
    width: maxWidth,
    quality: 85,
    format: "webp",
    watermark: true,
  })
}

export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split(".").pop()
  return `${timestamp}-${random}.${extension}`
}
