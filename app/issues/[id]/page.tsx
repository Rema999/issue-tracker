// Disable static generation — this page fetches live data from Supabase.
export const dynamic = 'force-dynamic'

import { IssueDetailPage } from '@/components/issues/IssueDetail'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  return { title: `Issue ${id.slice(0, 8)}… — Issue Tracker` }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  return <IssueDetailPage id={id} />
}
