import JoinPageClient from '../../components/JoinPageClient';

// This function is used to generate static paths at build time
export async function generateStaticParams() {
  return [
    { roomId: '[roomId]' }, // Placeholder for any roomId
  ];
}

// Make the page component async to handle params as a Promise
export default async function JoinPage({ params }: { params: Promise<{ roomId: string }> }) {
  // Always use the fixed roomId "sunday-group" regardless of URL parameter
  return <JoinPageClient roomId="sunday-group" />;
}
