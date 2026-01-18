"use client";

import { useState } from "react"
import { Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PromptCard } from "@/components/PromptCard"
import { PromptCardSkeleton } from "@/components/ui/prompt-card-skeleton"
import { MOCK_PROMPTS } from "@/lib/mock-data"

const CATEGORIES = ["All", "Writing", "Art", "Coding", "Marketing", "Business", "Productivity", "SEO", "Midjourney"]

export default function FeedPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isFocused, setIsFocused] = useState(false)

  // Simulate loading (in real app, this would be based on actual data fetching)
  const prompts = [...MOCK_PROMPTS, ...MOCK_PROMPTS, ...MOCK_PROMPTS]
  
  // Filter prompts based on search
  const filteredPrompts = prompts.filter(prompt => 
    searchQuery ? prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  )

  const showEmptyState = !isLoading && filteredPrompts.length === 0

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header & Search */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center max-w-2xl mx-auto"
      >
        <h1 className="text-3xl font-bold tracking-tight">Discover Prompts</h1>
        <motion.div 
          className="relative"
          animate={{ 
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Search className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
          <Input 
            placeholder="Search for prompts..." 
            className="pl-10 h-11 transition-all duration-200" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </motion.div>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
      >
        {CATEGORIES.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant={category === selectedCategory ? "default" : "secondary"} 
              className="rounded-full whitespace-nowrap transition-all duration-200"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <PromptCardSkeleton key={i} />
            ))}
          </motion.div>
        ) : showEmptyState ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-20 space-y-6"
          >
            <div className="relative w-64 h-64">
              <Image 
                src="/assets/empty-state.png" 
                alt="No results found" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="text-center space-y-2 max-w-md">
              <h3 className="text-2xl font-bold">No prompts found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or browse our categories to discover amazing prompts.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPrompts.map((prompt, index) => (
              <motion.div
                key={`${prompt.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.4,
                  ease: "easeOut"
                }}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <PromptCard {...prompt} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
