import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, AlertTriangle, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Licencia de Uso - Galería Wild Blast",
  description: "Términos y condiciones de uso para los artworks de la Galería Wild Blast. Uso personal no comercial.",
}

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Licencia de Uso
            </h1>
            <p className="text-lg text-muted-foreground">
              Términos y condiciones para el uso de nuestros artworks digitales
            </p>
          </div>

          <div className="space-y-8">
            {/* Resumen */}
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Resumen de la Licencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-green-600 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Permite
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Uso personal y privado</li>
                      <li>• Fondos de pantalla y avatares</li>
                      <li>• Impresión para uso personal</li>
                      <li>• Compartir en redes sociales (con atribución)</li>
                      <li>• Uso educativo no comercial</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-red-600 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      No Permite
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Uso comercial o monetización</li>
                      <li>• Redistribución o venta</li>
                      <li>• Modificación sin autorización</li>
                      <li>• Uso en productos comerciales</li>
                      <li>• Eliminación de marca de agua</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Términos Detallados */}
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Términos Detallados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">1. Definiciones</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>"Artwork"</strong> se refiere a cualquier imagen digital disponible en la Galería Wild Blast.
                    <strong>"Uso Personal"</strong> significa uso no comercial, privado y doméstico.
                    <strong>"Uso Comercial"</strong> incluye cualquier uso con fines de lucro, publicidad o promoción comercial.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Licencia de Uso Personal</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Se te otorga una licencia limitada, no exclusiva, no transferible y revocable para usar los artworks únicamente para uso personal no comercial.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Ejemplos de uso permitido:</strong>
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Fondos de pantalla en dispositivos personales</li>
                      <li>• Avatares en redes sociales</li>
                      <li>• Impresión para decoración personal</li>
                      <li>• Compartir en redes sociales con atribución</li>
                      <li>• Uso en proyectos educativos sin fines de lucro</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Restricciones</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Está estrictamente prohibido cualquier uso comercial o monetización de los artworks.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Ejemplos de uso prohibido:</strong>
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Vender o redistribuir los artworks</li>
                      <li>• Usar en productos comerciales</li>
                      <li>• Usar en publicidad o marketing</li>
                      <li>• Modificar sin autorización explícita</li>
                      <li>• Eliminar marcas de agua o atribuciones</li>
                      <li>• Usar en sitios web comerciales</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">4. Atribución</h3>
                  <p className="text-sm text-muted-foreground">
                    Cuando compartas artworks en redes sociales o en línea, debes incluir atribución a "Wild Blast" y un enlace a nuestra galería cuando sea posible.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">5. Propiedad Intelectual</h3>
                  <p className="text-sm text-muted-foreground">
                    Todos los derechos de propiedad intelectual sobre los artworks permanecen con Wild Blast. Esta licencia no transfiere ningún derecho de propiedad.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">6. Terminación</h3>
                  <p className="text-sm text-muted-foreground">
                    Esta licencia se termina automáticamente si incumples cualquiera de estos términos. Al terminar, debes cesar todo uso de los artworks.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">7. Limitación de Responsabilidad</h3>
                  <p className="text-sm text-muted-foreground">
                    Los artworks se proporcionan "tal como están" sin garantías. Wild Blast no será responsable por cualquier daño derivado del uso de los artworks.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>¿Tienes preguntas?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Si tienes dudas sobre el uso permitido de nuestros artworks o necesitas una licencia comercial, contáctanos.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Uso Personal</Badge>
                  <Badge variant="outline">No Comercial</Badge>
                  <Badge variant="outline">Atribución Requerida</Badge>
                  <Badge variant="outline">Sin Modificación</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
