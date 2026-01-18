"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PromptCard } from "@/components/PromptCard"
import { useCountUp } from "@/hooks/useCountUp"

interface ProfileContentProps {
  username: string
  prompts: Array<{
    id: string
    title: string
    description: string
    tags: string[]
    creator: {
      name: string
      avatar?: string
    }
    price: "Free" | "Paid"
    priceAmount?: string
  }>
}

export function ProfileContent({ username, prompts }: ProfileContentProps) {
  // Stats count-up hooks
  const promptCount = useCountUp(12, 1500)
  const salesCount = useCountUp(1500, 2000)
  const ratingCount = useCountUp(48, 1500) // We'll divide by 10 to get 4.8

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Avatar with slide-in animation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar className="h-24 w-24 border-2 border-background shadow-md">
            <AvatarImage src="" />
            <AvatarFallback className="text-2xl">{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Profile info with slide-in */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-2 flex-1"
        >
          <h1 className="text-3xl font-bold">{username}</h1>
          <p className="text-muted-foreground max-w-lg">
            AI Artist & Prompt Engineer. Creating high-quality Midjourney and GPT-4 prompts.
          </p>

          {/* Stats with count-up animation */}
          <div ref={promptCount.ref} className="flex gap-4 text-sm font-medium">
            <div>
              <span className="font-bold">{promptCount.count}</span> Prompts
            </div>
            <div>
              <span className="font-bold">
                {salesCount.count >= 1000
                  ? `${(salesCount.count / 1000).toFixed(1)}k`
                  : salesCount.count}
              </span>{" "}
              Sales
            </div>
            <div>
              <span className="font-bold">{(ratingCount.count / 10).toFixed(1)}</span> ★ Rating
            </div>
          </div>
        </motion.div>

        {/* Action buttons with hover animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button>Follow</Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline">Share</Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Published Prompts Section */}
      <div className="space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl font-bold tracking-tight"
        >
          Published Prompts
        </motion.h2>

        {/* Prompt list with stagger animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {prompts.map((prompt, i) => (
            <motion.div key={i} variants={itemVariants} transition={{ duration: 0.4 }}>
              <PromptCard {...prompt} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
