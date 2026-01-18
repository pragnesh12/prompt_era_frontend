import { MOCK_PROMPTS } from "@/lib/mock-data"
import { PromptDetailContent } from "@/components/prompt-detail-content"

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // Find prompt or use default for demo - ensure we have a fallback if id not found in mock
  const prompt = MOCK_PROMPTS.find(p => p.id === id) || MOCK_PROMPTS[1]

  return <PromptDetailContent prompt={prompt} />
}
