import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { GalleryGrid } from "@/components/gallery/gallery-grid"
import { GallerySearch } from "@/components/gallery/gallery-search"
import { GallerySkeleton } from "@/components/gallery/gallery-skeleton"

export const metadata = {
  title: "Galería - Artworks Digitales",
  description: "Explora nuestra colección de artworks digitales únicos. Filtra por categoría, busca por tags y descarga tus favoritos.",
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Galería de Artworks
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra colección de artworks digitales únicos. 
              Filtra, busca y descarga tus favoritos.
            </p>
          </div>

          <GallerySearch />
          
          <Suspense fallback={<GallerySkeleton />}>
            <GalleryGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
