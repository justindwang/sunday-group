"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRoom } from '../context/RoomContext';

interface JoinPageClientProps {
  roomId: string;
}

export default function JoinPageClient({ roomId }: JoinPageClientProps) {
  const router = useRouter();
  const { addParticipant } = useRoom();
  
  const [name, setName] = useState('');
  const [isWillingToLead, setIsWillingToLead] = useState(false);
  const [isBigGroupLeader, setIsBigGroupLeader] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add the participant and get their ID
      const participant = await addParticipant(name.trim(), isWillingToLead, isBigGroupLeader);
      
      // Redirect to the participant's group page with the fixed roomId
      router.push(`/participant/sunday-group/${participant.id}`);
    } catch (err) {
      setError('Failed to join the room. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Join Sunday Group</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isLeader"
                checked={isWillingToLead}
                onChange={(e) => setIsWillingToLead(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isSubmitting}
              />
              <label htmlFor="isLeader" className="ml-3 block text-sm">
                I am willing to be a small group lead today
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isBigGroupLeader"
                checked={isBigGroupLeader}
                onChange={(e) => setIsBigGroupLeader(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isSubmitting}
              />
              <label htmlFor="isBigGroupLeader" className="ml-3 block text-sm">
                I am leading a sermon discussion today
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Joining...' : 'Join Group'}
          </button>
        </form>
      </div>
    </div>
  );
}
