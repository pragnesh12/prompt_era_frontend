import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromptCard } from "@/components/PromptCard"
import { MOCK_PROMPTS } from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard</h1>
      
      <Tabs defaultValue="saved" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="saved">Saved Prompts</TabsTrigger>
          <TabsTrigger value="purchased">Purchased Prompts</TabsTrigger>
        </TabsList>
        <TabsContent value="saved" className="space-y-4">
             <p className="text-muted-foreground">Prompts you have saved for later.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_PROMPTS.slice(0, 2).map((prompt, i) => (
                    <PromptCard key={`saved-${i}`} {...prompt} />
                ))}
            </div>
        </TabsContent>
        <TabsContent value="purchased" className="space-y-4">
             <p className="text-muted-foreground">Premium prompts you have purchased.</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_PROMPTS.slice(1, 3).map((prompt, i) => (
                    <PromptCard key={`purchased-${i}`} {...prompt} />
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
