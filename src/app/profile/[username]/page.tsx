import { MOCK_PROMPTS } from "@/lib/mock-data"
import { ProfileContent } from "@/components/profile-content"

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const decodedUsername = decodeURIComponent(username).replace("@", "") // Handle @username

  return <ProfileContent username={decodedUsername} prompts={MOCK_PROMPTS} />
}
