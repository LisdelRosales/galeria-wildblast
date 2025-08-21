"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Artwork } from "@prisma/client"

interface ArtworkCardProps {
  artwork: Artwork & {
    assets: {
      id: string
      type: string
      path: string
      width: number
      height: number
    }[]
  }
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const thumbnail = artwork.assets.find(asset => asset.type === "THUMBNAIL")
  const preview = artwork.assets.find(asset => asset.type === "PREVIEW")

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    return false
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault()
    return false
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-all duration-300">
        <Link href={`/art/${artwork.slug}`}>
          <div className="relative aspect-square overflow-hidden">
            {/* Overlay transparente para protección básica */}
            <div className="absolute inset-0 bg-transparent z-10 pointer-events-none" />
            
            {thumbnail ? (
              <Image
                src={thumbnail.path}
                alt={artwork.title}
                width={thumbnail.width || 400}
                height={thumbnail.height || 400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                draggable={false}
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="text-muted-foreground text-center">
                  <div className="text-4xl mb-2">🎨</div>
                  <p className="text-sm">Sin preview</p>
                </div>
              </div>
            )}
            
            {/* Overlay con información */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <div className="bg-background/90 backdrop-blur-sm rounded-full p-2">
                  <Eye className="h-4 w-4 text-foreground" />
                </div>
                <div className="bg-background/90 backdrop-blur-sm rounded-full p-2">
                  <Download className="h-4 w-4 text-foreground" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {artwork.title}
            </h3>
            
            {artwork.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {artwork.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-1">
              {artwork.category && (
                <Badge variant="secondary" className="text-xs">
                  {artwork.category}
                </Badge>
              )}
              {artwork.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {artwork.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{artwork.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
