"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, X, Zap, Crown, Rocket, ArrowRight, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)

  const plans = [
    {
      name: "Free",
      icon: Zap,
      price: { monthly: 0, annual: 0 },
      description: "Perfect for trying out PromptEra",
      features: [
        { text: "Access to free prompts", included: true },
        { text: "5 prompt copies per month", included: true },
        { text: "Basic search", included: true },
        { text: "Community support", included: true },
        { text: "Premium prompts", included: false },
        { text: "Unlimited copies", included: false },
        { text: "Priority support", included: false },
        { text: "Analytics dashboard", included: false },
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      icon: Crown,
      price: { monthly: 19, annual: 15 }, // $15/mo when billed annually ($180/year)
      description: "For power users and professionals",
      features: [
        { text: "Everything in Free", included: true },
        { text: "Unlimited prompt copies", included: true },
        { text: "Access to all premium prompts", included: true },
        { text: "Advanced search & filters", included: true },
        { text: "Priority email support", included: true },
        { text: "Personal prompt library", included: true },
        { text: "Export prompts (PDF, TXT)", included: true },
        { text: "Analytics dashboard", included: true },
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Creator",
      icon: Rocket,
      price: { monthly: 49, annual: 39 }, // $39/mo when billed annually ($468/year)
      description: "For creators who want to monetize",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Sell unlimited prompts", included: true },
        { text: "0% platform fee (first 6 months)", included: true },
        { text: "Advanced analytics & insights", included: true },
        { text: "Dedicated creator support", included: true },
        { text: "Custom creator profile", included: true },
        { text: "Early access to new features", included: true },
        { text: "Marketing & promotion tools", included: true },
      ],
      cta: "Start Selling",
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "Can I switch plans anytime?",
      answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the start of your next billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. Annual subscribers can also pay via bank transfer."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact us within 14 days for a full refund."
    },
    {
      question: "What happens to my prompts if I cancel?",
      answer: "Your purchased prompts remain in your library forever, even after canceling. However, you'll lose access to premium prompts and some advanced features."
    },
    {
      question: "How does the Creator platform fee work?",
      answer: "Creator plan members pay 0% platform fee for the first 6 months, then 10% thereafter. Free and Pro users cannot sell prompts."
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 dark:from-primary/10 dark:via-purple-500/10 dark:to-pink-500/10" />
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

      <div className="relative z-10">
        {/* Header */}
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4">Pricing</Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
                Simple, <span className="text-gradient">Transparent</span> Pricing
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime.
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <span className={`text-sm font-medium ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                  Monthly
                </span>
                <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
                <span className={`text-sm font-medium ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                  Annual
                  <Badge variant="secondary" className="ml-2">Save 20%</Badge>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-24 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => {
                const Icon = plan.icon
                const price = isAnnual ? plan.price.annual : plan.price.monthly
                const totalAnnual = plan.price.annual * 12

                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className={`relative rounded-2xl p-8 ${
                      plan.popular
                        ? "bg-primary/5 border-2 border-primary shadow-2xl shadow-primary/20"
                        : "bg-card border border-border"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="px-4 py-1 shadow-lg">Most Popular</Badge>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </div>

                    <div className="text-center mb-6 pb-6 border-b">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-black">${price}</span>
                        <span className="text-muted-foreground">
                          {price > 0 ? "/month" : ""}
                        </span>
                      </div>
                      {isAnnual && price > 0 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          ${totalAnnual} billed annually
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? "" : "text-muted-foreground"}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full h-12 ${
                        plan.popular
                          ? "shadow-lg shadow-primary/25"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href={plan.name === "Free" ? "/signup" : "/signup?plan=" + plan.name.toLowerCase()}>
                        {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="pb-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Compare Plans</h2>
              <p className="text-muted-foreground">
                See what's included in each plan
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/80 backdrop-blur-xl border rounded-2xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold">Free</th>
                      <th className="text-center p-4 font-semibold bg-primary/5">Pro</th>
                      <th className="text-center p-4 font-semibold">Creator</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="p-4">Prompt copies/month</td>
                      <td className="text-center p-4">5</td>
                      <td className="text-center p-4 bg-primary/5">Unlimited</td>
                      <td className="text-center p-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Premium prompts access</td>
                      <td className="text-center p-4"><X className="h-4 w-4 mx-auto text-muted-foreground" /></td>
                      <td className="text-center p-4 bg-primary/5"><Check className="h-4 w-4 mx-auto text-primary" /></td>
                      <td className="text-center p-4"><Check className="h-4 w-4 mx-auto text-primary" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Sell prompts</td>
                      <td className="text-center p-4"><X className="h-4 w-4 mx-auto text-muted-foreground" /></td>
                      <td className="text-center p-4 bg-primary/5"><X className="h-4 w-4 mx-auto text-muted-foreground" /></td>
                      <td className="text-center p-4"><Check className="h-4 w-4 mx-auto text-primary" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Platform fee</td>
                      <td className="text-center p-4">-</td>
                      <td className="text-center p-4 bg-primary/5">-</td>
                      <td className="text-center p-4">0% (6 mo) then 10%</td>
                    </tr>
                    <tr>
                      <td className="p-4">Support</td>
                      <td className="text-center p-4">Community</td>
                      <td className="text-center p-4 bg-primary/5">Priority</td>
                      <td className="text-center p-4">Dedicated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-24 px-4">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Everything you need to know about our pricing
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card/80 backdrop-blur-xl border rounded-xl px-6"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <span className="flex items-center gap-3 text-left">
                        <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pl-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-12 text-center border"
            >
              <h2 className="text-4xl font-bold mb-4">
                Still have questions?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our team is here to help you choose the right plan
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
