import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { processImage, generateThumbnail, generatePreview, generateUniqueFilename } from "@/lib/image-processing"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const tags = formData.get("tags") as string
    const isPublic = formData.get("isPublic") === "true"

    if (!file || !title) {
      return NextResponse.json(
        { error: "Archivo y título son requeridos" },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Solo se permiten archivos de imagen" },
        { status: 400 }
      )
    }

    // Validar tamaño (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. Máximo 10MB" },
        { status: 400 }
      )
    }

    // Convertir archivo a buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Generar slug único
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      + "-" + Date.now()

    // Procesar imagen y generar versiones
    const [originalBuffer, thumbnailBuffer, previewBuffer] = await Promise.all([
      processImage(buffer, { watermark: false }), // Original sin watermark
      generateThumbnail(buffer),
      generatePreview(buffer),
    ])

    // Generar nombres únicos para los archivos
    const originalFilename = generateUniqueFilename(file.name)
    const thumbnailFilename = generateUniqueFilename(file.name).replace(/\.[^/.]+$/, ".webp")
    const previewFilename = generateUniqueFilename(file.name).replace(/\.[^/.]+$/, ".webp")

    // En producción, aquí subirías los archivos a Supabase Storage
    // Por ahora, simulamos las URLs
    const originalPath = `/uploads/original/${originalFilename}`
    const thumbnailPath = `/uploads/thumbnails/${thumbnailFilename}`
    const previewPath = `/uploads/previews/${previewFilename}`

    // Parsear tags
    const parsedTags = tags
      ? tags.split(",").map(tag => tag.trim()).filter(Boolean)
      : []

    // Crear artwork en la base de datos
    const artwork = await prisma.artwork.create({
      data: {
        title,
        slug,
        description: description || null,
        category: category || null,
        tags: parsedTags,
        isPublic,
        assets: {
          create: [
            {
              type: "ORIGINAL",
              filename: originalFilename,
              path: originalPath,
              size: originalBuffer.length,
              width: 1920, // Obtener de metadata real
              height: 1080, // Obtener de metadata real
            },
            {
              type: "THUMBNAIL",
              filename: thumbnailFilename,
              path: thumbnailPath,
              size: thumbnailBuffer.length,
              width: 300,
              height: 300,
            },
            {
              type: "PREVIEW",
              filename: previewFilename,
              path: previewPath,
              size: previewBuffer.length,
              width: 1200,
              height: 800,
            },
          ],
        },
      },
      include: {
        assets: true,
      },
    })

    return NextResponse.json({
      success: true,
      artwork: {
        id: artwork.id,
        slug: artwork.slug,
        title: artwork.title,
      },
      message: "Artwork subido exitosamente",
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
