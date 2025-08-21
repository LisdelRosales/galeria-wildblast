import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { getArtworkBySlug } from "@/lib/artworks"
import { ArtworkDetail } from "@/components/artwork/artwork-detail"

interface ArtworkPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ArtworkPageProps) {
  const artwork = await getArtworkBySlug(params.slug)
  
  if (!artwork) {
    return {
      title: "Artwork no encontrado",
    }
  }

  const preview = artwork.assets.find(asset => asset.type === "PREVIEW")

  return {
    title: artwork.title,
    description: artwork.description || `Descarga ${artwork.title} - Arte digital único`,
    openGraph: {
      title: artwork.title,
      description: artwork.description || `Descarga ${artwork.title} - Arte digital único`,
      images: preview ? [preview.path] : [],
    },
  }
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const artwork = await getArtworkBySlug(params.slug)

  if (!artwork) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <ArtworkDetail artwork={artwork} />
        </div>
      </div>
    </div>
  )
}
