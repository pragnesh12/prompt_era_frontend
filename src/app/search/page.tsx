"use client"

import { Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { PromptCard } from "@/components/PromptCard"
import { MOCK_PROMPTS } from "@/lib/mock-data"

const CATEGORIES = ["Writing", "Art", "Coding", "Marketing", "Business", "Productivity"]

function FilterList() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Price</h3>
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <Checkbox id="price-free" />
                <Label htmlFor="price-free">Free</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="price-paid" />
                <Label htmlFor="price-paid">Paid</Label>
            </div>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Category</h3>
        <div className="space-y-3">
            {CATEGORIES.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                    <Checkbox id={`cat-${cat}`} />
                    <Label htmlFor={`cat-${cat}`}>{cat}</Label>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
       {/* Sticky Search Bar */}
       <div className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
           <div className="container mx-auto px-4 flex gap-4 items-center">
               <div className="relative flex-1 max-w-2xl">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search prompts..." className="pl-9 bg-background" defaultValue="SEO" />
               </div>
               <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="md:hidden">
                            <Filter className="h-4 w-4 mr-2" /> Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetTitle>Filters</SheetTitle>
                        <div className="mt-6">
                             <FilterList />
                        </div>
                    </SheetContent>
               </Sheet>
           </div>
       </div>

       <div className="container mx-auto px-4 flex-1 py-8 flex gap-8">
           {/* Desktop Sidebar */}
           <aside className="hidden w-64 md:flex flex-col sticky top-40 h-[calc(100vh-10rem)] overflow-y-auto pr-4">
                <h2 className="text-xl font-bold mb-6">Filters</h2>
                <FilterList />
           </aside>

           {/* Results Grid */}
           <div className="flex-1">
                <p className="text-muted-foreground mb-6">Showing 12 results for "SEO"</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Mock Data Loop */}
                    {[...MOCK_PROMPTS, ...MOCK_PROMPTS].map((prompt, i) => (
                        <PromptCard key={i} {...prompt} />
                    ))}
                </div>
           </div>
       </div>
    </div>
  )
}
