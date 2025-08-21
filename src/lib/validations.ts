import { z } from "zod"

export const artworkSchema = z.object({
  title: z.string().min(1, "El título es requerido").max(100, "El título es muy largo"),
  description: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().default(true),
})

export const downloadRequestSchema = z.object({
  email: z.string().email("Email inválido").optional(),
  acceptLicense: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la licencia para continuar",
  }),
})

export const subscriberEmailSchema = z.object({
  email: z.string().email("Email inválido"),
})

export const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12),
})

export const adminArtworkSchema = z.object({
  title: z.string().min(1, "El título es requerido").max(100, "El título es muy largo"),
  description: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().default(true),
  file: z.instanceof(File).refine((file) => file.size > 0, "El archivo es requerido"),
})

export type ArtworkFormData = z.infer<typeof artworkSchema>
export type DownloadRequestData = z.infer<typeof downloadRequestSchema>
export type SubscriberEmailData = z.infer<typeof subscriberEmailSchema>
export type SearchData = z.infer<typeof searchSchema>
export type AdminArtworkData = z.infer<typeof adminArtworkSchema>
