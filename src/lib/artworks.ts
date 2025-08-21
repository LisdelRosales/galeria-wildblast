import { prisma } from "@/lib/prisma"
import { searchSchema } from "@/lib/validations"

export async function getArtworks(searchParams?: {
  q?: string
  category?: string
  tags?: string
  page?: string
}) {
  try {
    const validatedParams = searchSchema.parse({
      q: searchParams?.q,
      category: searchParams?.category,
      tags: searchParams?.tags?.split(",").filter(Boolean),
      page: searchParams?.page ? parseInt(searchParams.page) : 1,
      limit: 12,
    })

    const where: any = {
      isPublic: true,
    }

    // Búsqueda por texto
    if (validatedParams.q) {
      where.OR = [
        { title: { contains: validatedParams.q, mode: "insensitive" } },
        { description: { contains: validatedParams.q, mode: "insensitive" } },
        { tags: { hasSome: [validatedParams.q] } },
      ]
    }

    // Filtro por categoría
    if (validatedParams.category) {
      where.category = validatedParams.category
    }

    // Filtro por tags
    if (validatedParams.tags && validatedParams.tags.length > 0) {
      where.tags = { hasSome: validatedParams.tags }
    }

    const artworks = await prisma.artwork.findMany({
      where,
      include: {
        assets: {
          select: {
            id: true,
            type: true,
            path: true,
            width: true,
            height: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (validatedParams.page - 1) * validatedParams.limit,
      take: validatedParams.limit,
    })

    return artworks
  } catch (error) {
    console.error("Error fetching artworks:", error)
    return []
  }
}

export async function getArtworkBySlug(slug: string) {
  try {
    const artwork = await prisma.artwork.findUnique({
      where: { slug },
      include: {
        assets: {
          select: {
            id: true,
            type: true,
            path: true,
            filename: true,
            size: true,
            width: true,
            height: true,
          },
        },
      },
    })

    return artwork
  } catch (error) {
    console.error("Error fetching artwork:", error)
    return null
  }
}

export async function getArtworkCategories() {
  try {
    const categories = await prisma.artwork.findMany({
      where: { isPublic: true },
      select: { category: true },
      distinct: ["category"],
    })

    return categories
      .map(c => c.category)
      .filter(Boolean)
      .sort()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getPopularTags(limit = 20) {
  try {
    const artworks = await prisma.artwork.findMany({
      where: { isPublic: true },
      select: { tags: true },
    })

    const tagCounts: Record<string, number> = {}
    
    artworks.forEach(artwork => {
      artwork.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([tag]) => tag)
  } catch (error) {
    console.error("Error fetching popular tags:", error)
    return []
  }
}
