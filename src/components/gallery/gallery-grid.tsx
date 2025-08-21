import { Suspense } from "react"
import { getArtworks } from "@/lib/artworks"
import { ArtworkCard } from "./artwork-card"
import { GallerySkeleton } from "./gallery-skeleton"

interface GalleryGridProps {
  searchParams?: {
    q?: string
    category?: string
    tags?: string
    page?: string
  }
}

async function GalleryGridContent({ searchParams }: GalleryGridProps) {
  const artworks = await getArtworks(searchParams)

  if (artworks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎨</div>
        <h3 className="text-xl font-semibold mb-2">No se encontraron artworks</h3>
        <p className="text-muted-foreground">
          Intenta ajustar tus filtros de búsqueda o explorar otras categorías.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  )
}

export function GalleryGrid(props: GalleryGridProps) {
  return (
    <Suspense fallback={<GallerySkeleton />}>
      <GalleryGridContent {...props} />
    </Suspense>
  )
}
