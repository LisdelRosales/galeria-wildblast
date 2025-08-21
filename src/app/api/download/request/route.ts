import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { downloadRateLimiter } from "@/lib/rate-limit"
import { downloadRequestSchema } from "@/lib/validations"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const headersList = await headers()
    
    // Rate limiting
    const identifier = session?.user?.id || headersList.get("x-forwarded-for") || "anonymous"
    const { success } = await downloadRateLimiter.limit(identifier)
    
    if (!success) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes de descarga. Intenta más tarde." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validatedData = downloadRequestSchema.parse(body)

    const { artworkId, email, acceptLicense } = validatedData

    if (!acceptLicense) {
      return NextResponse.json(
        { error: "Debes aceptar la licencia para continuar" },
        { status: 400 }
      )
    }

    // Verificar que el artwork existe y es público
    const artwork = await prisma.artwork.findFirst({
      where: {
        id: artworkId,
        isPublic: true,
      },
      include: {
        assets: {
          where: {
            type: "ORIGINAL",
          },
        },
      },
    })

    if (!artwork) {
      return NextResponse.json(
        { error: "Artwork no encontrado" },
        { status: 404 }
      )
    }

    const originalAsset = artwork.assets[0]
    if (!originalAsset) {
      return NextResponse.json(
        { error: "Archivo original no disponible" },
        { status: 404 }
      )
    }

    // Log de descarga
    await prisma.downloadLog.create({
      data: {
        artworkId,
        userId: session?.user?.id,
        email: session?.user?.email || email,
        ipAddress: headersList.get("x-forwarded-for") || "unknown",
        userAgent: headersList.get("user-agent") || "unknown",
      },
    })

    // Si el usuario está autenticado, generar URL firmada para descarga directa
    if (session?.user) {
      // Aquí generarías una URL firmada con Supabase o similar
      // Por ahora, retornamos la URL directa (en producción usar URLs firmadas)
      const downloadUrl = `/api/download/sign?assetId=${originalAsset.id}&token=${generateDownloadToken(originalAsset.id)}`
      
      return NextResponse.json({
        success: true,
        downloadUrl,
        message: "Descarga iniciada",
      })
    } else {
      // Para usuarios no autenticados, enviar email con link
      // Aquí implementarías el envío de email
      // Por ahora, simulamos el envío
      
      return NextResponse.json({
        success: true,
        message: "Te hemos enviado un email con el link de descarga",
      })
    }
  } catch (error) {
    console.error("Download request error:", error)
    
    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { error: "Datos inválidos" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

function generateDownloadToken(assetId: string): string {
  // En producción, usar JWT o similar para firmar URLs
  const timestamp = Date.now()
  const expiry = timestamp + (parseInt(process.env.DOWNLOAD_EXPIRY_HOURS || "24") * 60 * 60 * 1000)
  
  return Buffer.from(`${assetId}:${expiry}`).toString("base64")
}
