import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ArrowRight, 
  Download, 
  Palette, 
  Youtube, 
  Sparkles,
  Eye,
  Heart
} from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Galería Wild Blast
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Descubre y descarga artworks digitales únicos. 
              <br />
              <span className="text-primary font-semibold">Arte que inspira, creatividad que transforma.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/gallery">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Eye className="mr-2 h-5 w-5" />
                  Explorar Galería
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <a 
                  href={process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Youtube className="mr-2 h-5 w-5 text-red-500" />
                  Suscribirse a YouTube
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué elegir Wild Blast?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre las ventajas de nuestra galería de arte digital
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Descargas Gratuitas</h3>
                  <p className="text-muted-foreground">
                    Accede a artworks de alta calidad sin costo. 
                    Solo necesitas aceptar nuestra licencia de uso no comercial.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Arte Único</h3>
                  <p className="text-muted-foreground">
                    Cada artwork es una pieza única creada con pasión y creatividad. 
                    Descubre estilos que no encontrarás en ningún otro lugar.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Calidad Premium</h3>
                  <p className="text-muted-foreground">
                    Todas las imágenes están optimizadas para diferentes usos. 
                    Desde thumbnails hasta versiones de alta resolución.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-sm">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  ¿Te gusta nuestro contenido?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Suscríbete a nuestro canal de YouTube para ver el proceso de creación 
                  y obtener contenido exclusivo. ¡Es completamente gratuito!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700" asChild>
                    <a 
                      href={process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Youtube className="mr-2 h-5 w-5" />
                      Suscribirse a YouTube
                    </a>
                  </Button>
                  
                  <Link href="/gallery">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                      <Heart className="mr-2 h-5 w-5" />
                      Ver Galería
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/40">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Wild Blast. Todos los derechos reservados. 
            <br />
            <Link href="/license" className="text-primary hover:underline">
              Licencia de uso
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
