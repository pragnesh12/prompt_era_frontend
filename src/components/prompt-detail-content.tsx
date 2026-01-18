"use client"

import { useState } from "react"
import Link from "next/link"
import { Lock, Copy, ShoppingCart, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

interface PromptDetailContentProps {
  prompt: {
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
  }
}

// Static prompt content examples
const PROMPT_CONTENT: Record<string, string> = {
  "1": `# Role
You are an expert SEO Content Writer and Digital Marketing Strategist with 10+ years of experience in creating high-ranking, conversion-optimized content.

# Task
Write a comprehensive, engaging 1500-word blog post about "[TOPIC]".

# Structure
1. **Introduction** (150 words)
   - Hook the reader with a compelling statistic or question
   - Clearly state the problem this post addresses
   - Preview the value readers will gain

2. **Main Content** (1000 words)
   - Key Benefits (3-5 core advantages)
   - Implementation Steps (actionable, numbered guide)
   - Real-world examples and case studies
   - Common pitfalls to avoid

3. **Best Practices** (200 words)
   - Expert tips and insider knowledge
   - Tools and resources

4. **Conclusion** (150 words)
   - Summarize key takeaways
   - Strong call-to-action
   - Next steps for readers

# Style Guidelines
- Use a professional yet conversational tone
- Include relevant data and statistics
- Optimize for keywords: [PRIMARY_KEYWORD], [SECONDARY_KEYWORD]
- Use short paragraphs (3-4 sentences max)
- Include subheadings every 200-300 words
- Add bullet points for easy scanning

# SEO Requirements
- Target keyword density: 1-2%
- Include LSI keywords naturally
- Meta description ready excerpt in intro
- Internal linking suggestions`,
  
  "2": `# Role
You are a professional Photographer and Visual AI Specialist with expertise in Midjourney, guiding users to create stunning portrait photographs.

# Task
Create a high-quality portrait photograph with dramatic lighting and professional composition.

# Prompt Structure
portrait photograph of [SUBJECT], [LIGHTING_STYLE], [COMPOSITION], shot on [CAMERA], [LENS], [MOOD_AND_ATMOSPHERE] --ar 2:3 --style raw --stylize 300

# Variables to Customize
[SUBJECT]: Describe the person (age, gender, expression, clothing)
[LIGHTING_STYLE]: dramatic side lighting / soft window light / golden hour / rim lighting
[COMPOSITION]: centered / rule of thirds / close-up / environmental portrait
[CAMERA]: Canon EOS R5 / Hasselblad X2D / Sony A7R V
[LENS]: 85mm f/1.4 / 50mm f/1.2 / 70-200mm f/2.8
[MOOD_AND_ATMOSPHERE]: moody / bright and airy / cinematic / editorial

# Example Outputs
portrait photograph of a confident business woman in her 30s, dramatic side lighting, rule of thirds composition, shot on Canon EOS R5, 85mm f/1.4, moody and cinematic atmosphere --ar 2:3 --style raw --stylize 300

# Pro Tips
- Add "professional studio lighting" for commercial look
- Include "shallow depth of field" for bokeh effect
- Specify "sharp focus on eyes" for better results
- Try different --stylize values (50-1000) for variation`,

  "3": `# Role
You are a Senior Software Engineer and AI Coding Assistant specializing in clean, efficient, and production-ready code.

# Task
Generate a complete, production-ready [COMPONENT_TYPE] for [TECHNOLOGY_STACK] with best practices and error handling.

# Requirements
1. **Code Quality**
   - Follow SOLID principles
   - Implement proper error handling
   - Add comprehensive TypeScript types
   - Include JSDoc comments for public APIs

2. **Features**
   - [FEATURE_1]
   - [FEATURE_2]
   - [FEATURE_3]
   - Responsive design (mobile-first)
   - Accessibility (WCAG 2.1 AA)

3. **Implementation**
   - Use modern syntax (ES2022+)
   - Optimize for performance
   - Include loading and error states
   - Add proper validation

4. **Testing Considerations**
   - Write testable code
   - Separate concerns
   - Mock external dependencies

# Example Usage
\`\`\`typescript
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
\`\`\`

# Output Format
- Provide complete, runnable code
- Include imports and exports
- Add inline comments for complex logic
- Suggest related files/components needed

# Best Practices
✓ Use semantic HTML
✓ Implement proper loading states
✓ Handle edge cases
✓ Follow team's style guide
✓ Consider performance implications`
}

export function PromptDetailContent({ prompt }: PromptDetailContentProps) {
  const [copyState, setCopyState] = useState<"idle" | "copying" | "success">("idle")
  const [isPurchased, setIsPurchased] = useState(false) // Simulate purchase state
  const isPaid = prompt.price === "Paid"
  const isUnlocked = !isPaid || isPurchased

  // Get prompt content or use default
  const defaultPromptContent = PROMPT_CONTENT[prompt.id] || PROMPT_CONTENT["1"]
  const [editablePrompt, setEditablePrompt] = useState(defaultPromptContent)

  const handleCopy = async () => {
    setCopyState("copying")
    
    try {
      await navigator.clipboard.writeText(editablePrompt)
      setCopyState("success")
      setTimeout(() => setCopyState("idle"), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
      setCopyState("idle")
    }
  }

  const handlePurchase = () => {
    // Simulate purchase - in real app this would redirect to checkout
    setIsPurchased(true)
    setEditablePrompt(defaultPromptContent)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Badge variant={isPaid ? "default" : "secondary"}>{prompt.price}</Badge>
              {prompt.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{prompt.title}</h1>
            
            {/* Creator info with hover micro-interaction */}
            <motion.div
              className="flex items-center gap-2 text-muted-foreground cursor-pointer w-fit"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={prompt.creator.avatar} />
                  <AvatarFallback>{prompt.creator.name[0]}</AvatarFallback>
                </Avatar>
              </motion.div>
              <span>
                By <span className="font-semibold text-foreground">{prompt.creator.name}</span>
              </span>
              <span>•</span>
              <span>Last updated 2 days ago</span>
            </motion.div>
          </motion.div>

          {/* Prompt Content with reveal animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Prompt</h2>
              {isUnlocked && (
                <span className="text-sm text-muted-foreground">✏️ Edit before copying</span>
              )}
            </div>

            {isUnlocked ? (
              <div className="space-y-4">
                <Textarea
                  value={editablePrompt}
                  onChange={(e) => setEditablePrompt(e.target.value)}
                  className="min-h-[500px] font-mono text-sm leading-relaxed p-6 rounded-xl border-2 focus:border-primary resize-none"
                  placeholder="Edit your prompt here..."
                />
                <p className="text-xs text-muted-foreground">
                  💡 Tip: Customize the prompt above to fit your specific needs before copying
                </p>
              </div>
            ) : (
              <div className="relative rounded-xl border bg-muted/30 p-6 font-mono text-sm leading-relaxed overflow-hidden min-h-[400px]">
                <div className="filter blur-sm select-none">
                  <p># Role</p>
                  <p>You are an expert professional with deep knowledge in your field...</p>
                  <p className="mt-4"># Task</p>
                  <p>Create a comprehensive solution for [SPECIFIC_REQUIREMENT]...</p>
                  <p className="mt-4 opacity-70"># Structure</p>
                  <p className="opacity-70">1. Introduction and context...</p>
                  <p className="opacity-50">2. Main content sections...</p>
                  <p className="opacity-30">3. Best practices and guidelines...</p>
                  <p className="opacity-10">4. Examples and use cases...</p>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-card/95 p-8 rounded-2xl shadow-2xl text-center backdrop-blur-md border-2 border-primary/20 max-w-md"
                  >
                    <Lock className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-bold text-2xl mb-2">Premium Prompt</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Unlock this professional prompt to view, edit, and use the full content.
                    </p>
                    <Button onClick={handlePurchase} size="lg" className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" /> Buy for {prompt.priceAmount}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4">
                      One-time purchase • Lifetime access • Edit anytime
                    </p>
                  </motion.div>
                </div>
              </div>
            )}
            
            {/* Copy button with feedback animation */}
            {isUnlocked && (
              <motion.div
                variants={{
                  idle: { scale: 1 },
                  copying: { scale: 0.95 },
                  success: { scale: 1 }
                }}
                animate={copyState}
                transition={{ duration: 0.2 }}
              >
                <Button
                  className="w-full sm:w-auto"
                  size="lg"
                  onClick={handleCopy}
                  disabled={copyState !== "idle"}
                >
                  <AnimatePresence mode="wait">
                    {copyState === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Copied to Clipboard!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Edited Prompt
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Description with fade-in */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="space-y-4 pt-4 border-t"
          >
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{prompt.description}</p>
            <p className="text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="rounded-xl border bg-card text-card-foreground shadow p-6 space-y-4 sticky top-24">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="text-2xl font-bold">{isPaid ? prompt.priceAmount : "Free"}</span>
            </div>
            <Button className="w-full" size="lg" asChild>
              {isPaid ? (
                <Link href="/checkout">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
                </Link>
              ) : (
                <button onClick={handleCopy}>
                  <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                </button>
              )}
            </Button>
            <div className="text-xs text-center text-muted-foreground">
              {isPaid
                ? "One-time purchase. Lifetime access."
                : "Free for personal and commercial use."}
            </div>
          </div>

          {/* Similar Prompts */}
          <div className="rounded-xl border p-4 space-y-4">
            <h3 className="font-semibold">More from {prompt.creator.name}</h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Coming soon...</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile sticky action bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t p-4 shadow-lg z-50"
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Price</span>
            <p className="text-xl font-bold">{isPaid ? prompt.priceAmount : "Free"}</p>
          </div>
          <Button size="lg" className="flex-1 max-w-xs" asChild={isPaid} onClick={!isPaid ? handleCopy : undefined}>
            {isPaid ? (
              <Link href="/checkout">
                <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
              </Link>
            ) : (
              <>
                {copyState === "success" ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy Prompt
                  </>
                )}
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
