"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Globe, Zap, Shield, PlayCircle, BarChart3, Users, Star, Code, PenTool, Image as ImageIcon, Check } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { PromptCard } from "@/components/PromptCard"
import { MOCK_PROMPTS } from "@/lib/mock-data"
import { GridBackground } from "@/components/ui/grid-background"
import { useTour } from "@/components/tour/tour-provider"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  const { startTour } = useTour();

  const handleStartTour = () => {
    startTour([
      {
        targetId: "tour-hero-text",
        title: "Welcome to PromptEra",
        description: "The premium marketplace for high-quality AI prompts.",
      },
      {
         targetId: "tour-stats-section",
         title: "Trusted Platform",
         description: "Join our rapidly growing community of creators.",
      },
      {
         targetId: "tour-bento-features",
         title: "All-in-One Platform",
         description: "Tools for every type of creator: Writers, Artists, Developers.",
      },
      {
         targetId: "tour-testimonials",
         title: "Community Loved",
         description: "See what thousands of happy users are saying.",
      },
      {
         targetId: "tour-trending",
         title: "Trending Now",
         description: "Start exploring the best prompts available today.",
      }
    ]);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section - Premium Redesign */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-mesh">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 dark:from-primary/10 dark:via-purple-500/10 dark:to-pink-500/10" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

        {/* Content Container */}
        <div className="container px-4 text-center relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            id="tour-hero-text"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/20 bg-primary/5 dark:bg-primary/10 backdrop-blur-sm shadow-lg shadow-primary/10"
            >
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">The Gold Standard of AI Prompts</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter">
              <span className="block mb-4 text-foreground">Where Vision</span>
              <span className="block text-gradient">Meets Precision</span>
            </h1>

            {/* Subheading */}
            <p className="max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium">
              Stop guessing. Start creating.<br className="hidden sm:block" />
              Access thousands of expert-verified prompts for{" "}
              <span className="font-bold text-foreground border-b-2 border-primary/40">ChatGPT</span>,{" "}
              <span className="font-bold text-foreground border-b-2 border-primary/40">Midjourney</span>, and{" "}
              <span className="font-bold text-foreground border-b-2 border-primary/40">Claude</span>.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  asChild
                  className="h-14 px-8 rounded-full text-lg font-semibold shadow-xl shadow-primary/25 bg-primary hover:bg-primary/90 text-primary-foreground"
                  id="tour-search-btn"
                >
                  <Link href="/feed" className="flex items-center gap-2">
                    Explore Market <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-full text-lg font-semibold border-2 backdrop-blur-sm bg-background/50 hover:bg-background/80"
                  onClick={handleStartTour}
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Tour
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold text-foreground">4.9</span> / 5.0 rating
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">50K+</span> creators
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">$2M+</span> earned
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section - Modern Glass Design */}
      <section className="relative z-20 -mt-20 pb-24" id="tour-stats-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50 bg-card/80 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl" />
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <StatItem number="10K+" label="Active Prompts" delay={0.1} />
              <StatItem number="50K+" label="Happy Creators" delay={0.2} />
              <StatItem number="$2M+" label="Total Earnings" delay={0.3} />
              <StatItem number="4.9" label="Star Rating" delay={0.4} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Modern Card Grid */}
      <section className="py-24 bg-muted/30" id="tour-bento-features">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              Crafted for <span className="text-gradient">Excellence</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Whether you are a wordsmith, an artist, or a coder, we have the tools to supercharge your workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* For Writers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <PenTool className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">For Writers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  SEO articles, copywriting, creative writing. Unlock the power of words with AI-driven prompts.
                </p>
              </div>
            </motion.div>

            {/* For Artists */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                  <ImageIcon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">For Artists</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Midjourney, Stable Diffusion, DALL-E 3. Create stunning visual masterpieces.
                </p>
              </div>
            </motion.div>

            {/* For Developers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                  <Code className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">For Developers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Code generation, debugging, architecture planning. Ship faster with precision.
                </p>
              </div>
            </motion.div>

            {/* Verified Quality - Spans 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -8 }}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 md:col-span-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Verified Quality</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  Every prompt is tested and verified by our expert team. Quality guaranteed, every time.
                </p>
              </div>
            </motion.div>

            {/* Global Community */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Global Community</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join thousands of creators sharing their best work worldwide.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infinite Testimonials */}
      <section className="py-24 bg-background relative border-y" id="tour-testimonials">
          <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05] pointer-events-none" />
           <div className="text-center mb-16 relative z-10">
               <h2 className="text-4xl font-bold tracking-tight">Loved by the Community</h2>
           </div>
           <InfiniteMovingCards items={TESTIMONIALS} direction="right" speed="slow" />
      </section>

      {/* Featured Prompts */}
      <GridBackground>
      <section className="py-32" id="tour-trending">
        <div className="container mx-auto px-4 space-y-16">
            <div className="flex items-end justify-between">
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight">Trending Now</h2>
                    <p className="text-xl text-muted-foreground">Curated picks for you this week.</p>
                </div>
                <Button variant="outline" className="text-lg rounded-full px-8 hidden md:inline-flex" asChild>
                    <Link href="/feed">View all collection</Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {MOCK_PROMPTS.map((prompt, i) => (
                    <motion.div
                       key={prompt.id}
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: "-100px" }}
                       transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <PromptCard {...prompt} />
                    </motion.div>
                ))}
            </div>
             <div className="text-center md:hidden pt-8">
                <Button variant="outline" className="text-lg rounded-full px-8 w-full" asChild>
                    <Link href="/feed">View all collection</Link>
                </Button>
            </div>
        </div>
      </section>
      </GridBackground>
      
      {/* FAQ Section with Visuals */}
      <section className="py-32 container mx-auto px-4">
           <div className="flex flex-col lg:flex-row gap-16 items-center">
               <div className="flex-1 w-full relative">
                   {/* FAQ Illustration */}
                   <div className="relative aspect-square max-w-[500px] mx-auto">
                        <Image 
                            src="/assets/faq-illustration.png" 
                            alt="FAQ Illustration" 
                            fill 
                            className="object-contain drop-shadow-2xl animate-float"
                        />
                   </div>
               </div>
               <div className="flex-1 w-full space-y-8">
                   <div className="space-y-4">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Support</span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Got Questions?</h2>
                        <p className="text-xl text-muted-foreground">Everything you need to know about the platform.</p>
                   </div>
                   <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-b-0 mb-4 rounded-xl border px-4">
                            <AccordionTrigger className="text-lg hover:no-underline font-semibold">How does PromptEra work?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                            PromptEra is a marketplace where you can buy and sell AI prompts. Creators list their tested prompts, and users can purchase them to save time and get better results from AI models.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-b-0 mb-4 rounded-xl border px-4">
                            <AccordionTrigger className="text-lg hover:no-underline font-semibold">Is it free to join?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                            Yes, browsing and creating an account is completely free. You only pay when you purchase a premium prompt.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-b-0 mb-4 rounded-xl border px-4">
                            <AccordionTrigger className="text-lg hover:no-underline font-semibold">Can I sell my own prompts?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                            Absolutely! You can sign up as a creator and list your prompts. We take a small commission on each sale to maintain the platform.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="border-b-0 mb-4 rounded-xl border px-4">
                            <AccordionTrigger className="text-lg hover:no-underline font-semibold">What AI models do you support?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                            We support prompts for all major AI models including ChatGPT (GPT-4), Midjourney, Stable Diffusion, Claude, and Bard.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
               </div>
           </div>
       </section>

       {/* Pricing Section */}
       <section className="py-32 container mx-auto px-4">
           <div className="text-center mb-16 space-y-4">
               <span className="text-primary font-bold tracking-wider uppercase text-sm">Pricing</span>
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
               <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                   Choose the plan that fits your needs. Upgrade or downgrade anytime.
               </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {/* Free Plan */}
               <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.1 }}
                   whileHover={{ scale: 1.03, y: -8 }}
                   className="rounded-2xl border bg-card p-8 space-y-6 hover:shadow-xl transition-shadow"
               >
                   <div>
                       <h3 className="text-2xl font-bold mb-2">Free</h3>
                       <div className="flex items-baseline gap-1">
                           <span className="text-4xl font-black">$0</span>
                           <span className="text-muted-foreground">/month</span>
                       </div>
                   </div>
                   <motion.div
                       variants={{
                           hidden: { opacity: 0 },
                           visible: {
                               opacity: 1,
                               transition: { staggerChildren: 0.05 }
                           }
                       }}
                       initial="hidden"
                       whileInView="visible"
                       viewport={{ once: true }}
                       className="space-y-3"
                   >
                       {["Access to free prompts", "Community support", "Basic search", "5 prompts/month"].map((feature, i) => (
                           <motion.div
                               key={i}
                               variants={{
                                   hidden: { opacity: 0, x: -10 },
                                   visible: { opacity: 1, x: 0 }
                               }}
                               className="flex items-center gap-2"
                           >
                               <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                                   <Check className="h-3 w-3 text-primary" />
                               </div>
                               <span className="text-sm">{feature}</span>
                           </motion.div>
                       ))}
                   </motion.div>
                   <Button variant="outline" className="w-full" size="lg">Get Started</Button>
               </motion.div>

               {/* Pro Plan - Most Popular */}
               <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5 }}
                   whileHover={{ scale: 1.03, y: -8 }}
                   className="rounded-2xl border-2 border-primary bg-card p-8 space-y-6 relative hover:shadow-2xl transition-shadow"
               >
                   <motion.div
                       animate={{
                           boxShadow: [
                               "0 0 0 0 rgba(59,130,246,0.4)",
                               "0 0 0 8px rgba(59,130,246,0)",
                           ]
                       }}
                       transition={{ repeat: Infinity, duration: 2 }}
                       className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold"
                   >
                       Most Popular
                   </motion.div>
                   <div>
                       <h3 className="text-2xl font-bold mb-2">Pro</h3>
                       <div className="flex items-baseline gap-1">
                           <span className="text-4xl font-black">$19</span>
                           <span className="text-muted-foreground">/month</span>
                       </div>
                   </div>
                   <motion.div
                       variants={{
                           hidden: { opacity: 0 },
                           visible: {
                               opacity: 1,
                               transition: { staggerChildren: 0.05 }
                           }
                       }}
                       initial="hidden"
                       whileInView="visible"
                       viewport={{ once: true }}
                       className="space-y-3"
                   >
                       {["Unlimited prompt access", "Priority support", "Advanced search & filters", "Unlimited downloads", "Analytics dashboard"].map((feature, i) => (
                           <motion.div
                               key={i}
                               variants={{
                                   hidden: { opacity: 0, x: -10 },
                                   visible: { opacity: 1, x: 0 }
                               }}
                               className="flex items-center gap-2"
                           >
                               <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                                   <Check className="h-3 w-3 text-primary" />
                               </div>
                               <span className="text-sm">{feature}</span>
                           </motion.div>
                       ))}
                   </motion.div>
                   <motion.div
                       animate={{
                           boxShadow: [
                               "0 0 15px -3px rgba(59,130,246,0.3)",
                               "0 0 20px -3px rgba(59,130,246,0.5)",
                               "0 0 15px -3px rgba(59,130,246,0.3)",
                           ]
                       }}
                       transition={{ repeat: Infinity, duration: 2 }}
                   >
                       <Button className="w-full" size="lg">Start Pro Trial</Button>
                   </motion.div>
               </motion.div>

               {/* Enterprise Plan */}
               <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                   whileHover={{ scale: 1.03, y: -8 }}
                   className="rounded-2xl border bg-card p-8 space-y-6 hover:shadow-xl transition-shadow"
               >
                   <div>
                       <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                       <div className="flex items-baseline gap-1">
                           <span className="text-4xl font-black">$99</span>
                           <span className="text-muted-foreground">/month</span>
                       </div>
                   </div>
                   <motion.div
                       variants={{
                           hidden: { opacity: 0 },
                           visible: {
                               opacity: 1,
                               transition: { staggerChildren: 0.05 }
                           }
                       }}
                       initial="hidden"
                       whileInView="visible"
                       viewport={{ once: true }}
                       className="space-y-3"
                   >
                       {["Everything in Pro", "Dedicated support", "Team collaboration", "API access", "Custom integrations"].map((feature, i) => (
                           <motion.div
                               key={i}
                               variants={{
                                   hidden: { opacity: 0, x: -10 },
                                   visible: { opacity: 1, x: 0 }
                               }}
                               className="flex items-center gap-2"
                           >
                               <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                                   <Check className="h-3 w-3 text-primary" />
                               </div>
                               <span className="text-sm">{feature}</span>
                           </motion.div>
                       ))}
                   </motion.div>
                   <Button variant="outline" className="w-full" size="lg">Contact Sales</Button>
               </motion.div>
           </div>
       </section>

       {/* CTA Section - Premium Redesign */}
       <section className="relative py-32 overflow-hidden">
         {/* Gradient Background */}
         <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 dark:from-primary/20 dark:via-purple-500/20 dark:to-pink-500/20" />
         <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
         
         <div className="container mx-auto px-4 relative z-10">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="max-w-4xl mx-auto text-center space-y-8"
           >
             <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
               <span className="block mb-2">Start Your</span>
               <span className="block text-gradient">Creative Journey</span>
             </h2>
             <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
               Join the world's fastest-growing community of AI creators and builders today.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95}}>
                 <Button size="lg" asChild className="h-14 px-10 rounded-full text-lg font-semibold shadow-xl shadow-primary/25">
                   <Link href="/feed">Get Started Now</Link>
                 </Button>
               </motion.div>
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                 <Button  size="lg" variant="outline" asChild className="h-14 px-10 rounded-full text-lg font-semibold border-2">
                   <Link href="/create">Become a Creator</Link>
                 </Button>
               </motion.div>
             </div>
           </motion.div>
         </div>
       </section>

    </div>
  )
}

function StatItem({ number, label, delay }: { number: string, label: string, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="flex flex-col items-center"
        >
            <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-violet-500 mb-2">{number}</span>
            <span className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{label}</span>
        </motion.div>
    )
}

const TESTIMONIALS = [
  {
    quote: "PromptEra has completely transformed how we work with Midjourney. The consistency of results is unmatched.",
    name: "Alex Rivera",
    title: "Art Director, CreativeStudio",
  },
  {
    quote: "I've made over $2,000 selling my coding prompts here. The platform is super easy to use and the community is great.",
    name: "Sarah Chen",
    title: "Senior Developer",
  },
  {
    quote: "The quality of writing prompts I found here saved me hours of brainstorming. Highly recommended for bloggers.",
    name: "Michael Ross",
    title: "Content Strategist",
  },
  {
     quote: "Finally, a marketplace that actually vets their prompts. I haven't had a single bad purchase.",
     name: "Emily Davis",
     title: "Marketing Manager",
  },
  {
     quote: "The 'Create' tools are intuitive and the analytics help me understand what buyers want.",
     name: "David Kim",
     title: "Prompt Engineer",
  }
];
