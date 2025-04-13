import ParticipantPageClient from '../../../components/ParticipantPageClient';

// This function is used to generate static paths at build time
export async function generateStaticParams() {
  return [
    { roomId: '[roomId]', participantId: '[participantId]' }, // Placeholder for any roomId and participantId
  ];
}

// Make the page component async to handle params as a Promise
export default async function ParticipantPage({ params }: { params: Promise<{ roomId: string; participantId: string }> }) {
  // Await the params Promise to get the actual values
  const resolvedParams = await params;
  return <ParticipantPageClient roomId={resolvedParams.roomId} participantId={resolvedParams.participantId} />;
}
