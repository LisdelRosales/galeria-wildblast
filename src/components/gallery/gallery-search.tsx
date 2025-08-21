"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const categories = [
  "Todos",
  "Abstracto",
  "Retrato",
  "Paisaje",
  "Conceptual",
  "Minimalista",
  "Colorido",
  "Monocromático"
]

const popularTags = [
  "arte digital",
  "ilustración",
  "diseño",
  "creativo",
  "moderno",
  "vintage",
  "futurista",
  "orgánico"
]

export function GallerySearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const [search, setSearch] = useState(searchParams.get("q") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "Todos")
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  )

  const updateSearch = (newSearch: string, newCategory: string, newTags: string[]) => {
    const params = new URLSearchParams()
    
    if (newSearch) params.set("q", newSearch)
    if (newCategory && newCategory !== "Todos") params.set("category", newCategory)
    if (newTags.length > 0) params.set("tags", newTags.join(","))
    
    startTransition(() => {
      router.push(`/gallery?${params.toString()}`)
    })
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    updateSearch(value, category, selectedTags)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    updateSearch(search, value, selectedTags)
  }

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    
    setSelectedTags(newTags)
    updateSearch(search, category, newTags)
  }

  const clearFilters = () => {
    setSearch("")
    setCategory("Todos")
    setSelectedTags([])
    startTransition(() => {
      router.push("/gallery")
    })
  }

  const hasFilters = search || category !== "Todos" || selectedTags.length > 0

  return (
    <div className="mb-8 space-y-6">
      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar artworks..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
            disabled={isPending}
          />
        </div>
        
        <Select value={category} onValueChange={handleCategoryChange} disabled={isPending}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            disabled={isPending}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Popular Tags */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Tags populares:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary/80 transition-colors"
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="default"
              className="cursor-pointer hover:bg-destructive transition-colors"
              onClick={() => handleTagToggle(tag)}
            >
              {tag} <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
