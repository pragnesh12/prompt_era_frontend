import { PromptCard } from "@/components/PromptCard"
import { MOCK_PROMPTS } from "@/lib/mock-data"

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{categoryName} Prompts</h1>
        <p className="text-xl text-muted-foreground">
          Explore the best {slug} prompts curated for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROMPTS.map((prompt, i) => (
            <PromptCard key={i} {...prompt} />
        ))}
      </div>
    </div>
  )
}
