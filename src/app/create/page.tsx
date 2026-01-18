"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Check, Save } from "lucide-react"

export default function CreatePromptPage() {
  const [isPaid, setIsPaid] = useState("free")
  const [saveState, setSaveState] = useState<"idle" | "loading" | "success">("idle")
  const [publishState, setPublishState] = useState<"idle" | "loading" | "success">("idle")
  const [isAutosaving, setIsAutosaving] = useState(false)
  const [contentFocused, setContentFocused] = useState(false)

  // Simulate autosave
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAutosaving(true)
      setTimeout(() => setIsAutosaving(false), 1500)
    }, 30000) // Every 30 seconds

    return () => clearInterval(timer)
  }, [])

  const handleSaveDraft = async () => {
    setSaveState("loading")
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSaveState("success")
    setTimeout(() => setSaveState("idle"), 2000)
  }

  const handlePublish = async () => {
    setPublishState("loading")
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setPublishState("success")
    setTimeout(() => setPublishState("idle"), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Autosave indicator */}
      <AnimatePresence>
        {isAutosaving && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Save className="h-4 w-4 text-primary" />
            </motion.div>
            Autosaving...
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold tracking-tight">Create New Prompt</h1>
        <div className="flex gap-2">
          {/* Save Draft Button */}
          <motion.div
            animate={saveState === "loading" ? { scale: 0.98 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={saveState !== "idle"}
              className="min-w-[120px]"
            >
              <AnimatePresence mode="wait">
                {saveState === "loading" ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </motion.div>
                ) : saveState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Saved!
                  </motion.div>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Save Draft
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* Publish Button */}
          <motion.div
            animate={publishState === "loading" ? { scale: 0.98 } : publishState === "success" ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={handlePublish}
              disabled={publishState !== "idle"}
              className="min-w-[120px]"
            >
              <AnimatePresence mode="wait">
                {publishState === "loading" ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </motion.div>
                ) : publishState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Published!
                  </motion.div>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Publish
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Main Content Area */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg">
              Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., SEO Friendly Blog Post Generator"
              className="text-lg h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Prompt Content</Label>
            <motion.div
              animate={{
                boxShadow: contentFocused
                  ? "0 0 0 3px hsl(var(--primary) / 0.1)"
                  : "0 0 0 0px hsl(var(--primary) / 0)"
              }}
              transition={{ duration: 0.2 }}
              className="rounded-lg"
            >
              <Textarea
                id="content"
                placeholder="Type your prompt here..."
                className="min-h-[400px] font-mono text-sm leading-relaxed p-4 transition-all duration-200"
                onFocus={() => setContentFocused(true)}
                onBlur={() => setContentFocused(false)}
              />
            </motion.div>
            <p className="text-sm text-muted-foreground">
              Use [Brackets] for variables users should fill in.
            </p>
          </div>
        </motion.div>

        {/* Sidebar Metadata */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-6 sticky top-24">
            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                placeholder="Briefly describe what this prompt does..."
                className="h-24 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="e.g., Writing, SEO, Marketing" />
              <p className="text-xs text-muted-foreground">Comma separated</p>
            </div>

            <div className="space-y-3">
              <Label>Pricing</Label>
              <RadioGroup defaultValue="free" onValueChange={setIsPaid}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free" id="r1" />
                  <Label htmlFor="r1">Free</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paid" id="r2" />
                  <Label htmlFor="r2">Paid</Label>
                </div>
              </RadioGroup>
            </div>

            <motion.div
              initial={false}
              animate={{
                opacity: isPaid === "paid" ? 1 : 0.5,
                scale: isPaid === "paid" ? 1 : 0.98
              }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="4.99"
                disabled={isPaid === "free"}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

