import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    
    const assetId = searchParams.get("assetId")
    const token = searchParams.get("token")

    if (!assetId || !token) {
      return NextResponse.json(
        { error: "Parámetros faltantes" },
        { status: 400 }
      )
    }

    // Verificar token (implementación básica)
    const decodedToken = Buffer.from(token, "base64").toString()
    const [tokenAssetId, expiry] = decodedToken.split(":")
    
    if (tokenAssetId !== assetId) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      )
    }

    const expiryTime = parseInt(expiry)
    if (Date.now() > expiryTime) {
      return NextResponse.json(
        { error: "Link de descarga expirado" },
        { status: 401 }
      )
    }

    // Verificar que el asset existe y pertenece a un artwork público
    const asset = await prisma.asset.findFirst({
      where: {
        id: assetId,
        type: "ORIGINAL",
        artwork: {
          isPublic: true,
        },
      },
      include: {
        artwork: true,
      },
    })

    if (!asset) {
      return NextResponse.json(
        { error: "Archivo no encontrado" },
        { status: 404 }
      )
    }

    // En producción, aquí generarías una URL firmada con Supabase
    // Por ahora, retornamos la URL directa del asset
    const downloadUrl = asset.path

    // Log de descarga exitosa
    await prisma.downloadLog.create({
      data: {
        artworkId: asset.artworkId,
        userId: session?.user?.id,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    })

    return NextResponse.json({
      success: true,
      downloadUrl,
      filename: asset.filename,
      size: asset.size,
    })
  } catch (error) {
    console.error("Download sign error:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
