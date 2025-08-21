"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Download, Eye, Calendar, Tag, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Artwork } from "@prisma/client"

interface ArtworkDetailProps {
  artwork: Artwork & {
    assets: {
      id: string
      type: string
      path: string
      filename: string
      size: number
      width: number
      height: number
    }[]
  }
}

export function ArtworkDetail({ artwork }: ArtworkDetailProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [acceptLicense, setAcceptLicense] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const preview = artwork.assets.find(asset => asset.type === "PREVIEW")
  const original = artwork.assets.find(asset => asset.type === "ORIGINAL")

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    return false
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault()
    return false
  }

  const handleDownload = async () => {
    if (!acceptLicense) {
      toast.error("Debes aceptar la licencia para continuar")
      return
    }

    if (!session?.user && !email) {
      toast.error("Debes proporcionar un email o iniciar sesión")
      return
    }

    setIsDownloading(true)

    try {
      const response = await fetch("/api/download/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artworkId: artwork.id,
          email: session?.user?.email || email,
          acceptLicense,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al solicitar descarga")
      }

      const data = await response.json()
      
      if (data.downloadUrl) {
        // Descarga directa si el usuario está autenticado
        window.open(data.downloadUrl, "_blank")
        toast.success("Descarga iniciada")
      } else {
        // Enviar email con link de descarga
        toast.success("Te hemos enviado un email con el link de descarga")
      }

      setIsDownloadModalOpen(false)
      setEmail("")
      setAcceptLicense(false)
    } catch (error) {
      console.error("Download error:", error)
      toast.error("Error al procesar la descarga")
    } finally {
      setIsDownloading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="overflow-hidden border-0 bg-background/50 backdrop-blur-sm">
            <div className="relative aspect-square">
              {/* Overlay transparente para protección básica */}
              <div className="absolute inset-0 bg-transparent z-10 pointer-events-none" />
              
              {preview ? (
                <Image
                  src={preview.path}
                  alt={artwork.title}
                  width={preview.width || 800}
                  height={preview.height || 800}
                  className="object-cover w-full h-full"
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  draggable={false}
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <div className="text-muted-foreground text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <p>Sin preview disponible</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              {artwork.title}
            </h1>
            
            {artwork.description && (
              <p className="text-lg text-muted-foreground mb-6">
                {artwork.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {artwork.category && (
                <Badge variant="secondary">
                  {artwork.category}
                </Badge>
              )}
              {artwork.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(artwork.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              
              {original && (
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{original.width} × {original.height}</span>
                </div>
              )}
            </div>
          </div>

          {/* Download Section */}
          <Card className="border-0 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Descargar Artwork</h3>
                </div>
                
                {original && (
                  <div className="text-sm text-muted-foreground">
                    <p>Tamaño del archivo: {formatFileSize(original.size)}</p>
                    <p>Resolución: {original.width} × {original.height}</p>
                  </div>
                )}

                <Dialog open={isDownloadModalOpen} onOpenChange={setIsDownloadModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Descargar {artwork.title}</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      {!session?.user && (
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Te enviaremos un link de descarga a este email
                          </p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="license"
                            checked={acceptLicense}
                            onCheckedChange={(checked) => setAcceptLicense(checked as boolean)}
                          />
                          <Label htmlFor="license" className="text-sm">
                            Acepto la licencia de uso no comercial
                          </Label>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Este artwork es para uso personal no comercial únicamente
                        </p>
                      </div>

                      <Button
                        onClick={handleDownload}
                        disabled={isDownloading || (!session?.user && !email) || !acceptLicense}
                        className="w-full"
                      >
                        {isDownloading ? "Procesando..." : "Descargar"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
