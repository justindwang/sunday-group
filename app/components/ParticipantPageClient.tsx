"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRoom } from '../context/RoomContext';
import GroupDisplay from './GroupDisplay';
import { Participant, Group } from '../utils/types';

interface ParticipantPageClientProps {
  roomId: string;
  participantId: string;
}

export default function ParticipantPageClient({ roomId, participantId }: ParticipantPageClientProps) {
  const { participants, groups, isGroupsFormed, isLoading, error } = useRoom();
  const [participant, setParticipant] = useState<Participant | undefined>(undefined);
  const [participantGroup, setParticipantGroup] = useState<Group | undefined>(undefined);
  
  const router = useRouter();
  const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Find the participant and their group
  useEffect(() => {
    const foundParticipant = participants.find(p => p.id === participantId);
    setParticipant(foundParticipant);
    
    if (foundParticipant && foundParticipant.groupId && groups) {
      const group = groups.find(g => g.id === foundParticipant.groupId);
      setParticipantGroup(group);
    } else {
      setParticipantGroup(undefined);
    }
  }, [participants, groups, participantId]);
  
  // Redirect to join page if participant not found for 1 second or if room is reset
  useEffect(() => {
    // Skip during initial loading
    if (isLoading) return;
    
    // Conditions to start redirection timer:
    // 1. Participant not found but participants exist (participant removed)
    // 2. Participants array is empty (room reset)
    // 3. Initial load complete but no participants yet
    const shouldRedirect = 
      (participants.length > 0 && !participant) || // Participant not found
      (!isLoading && participants.length === 0);   // Room reset or empty
    
    if (shouldRedirect) {
      // Start a timer if one isn't already running
      if (!redirectTimer && !isRedirecting) {
        console.log("Starting redirect timer due to:", 
          participants.length > 0 ? "Participant not found" : "Room reset or empty");
        
        const timer = setTimeout(() => {
          setIsRedirecting(true);
          router.push('/join/sunday-group');
        }, 1000); // Wait 1 second before redirecting
        
        setRedirectTimer(timer);
      }
    } else {
      // Clear the timer if conditions no longer met
      if (redirectTimer) {
        clearTimeout(redirectTimer);
        setRedirectTimer(null);
      }
    }
    
    // Cleanup function to clear the timer when component unmounts
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [isLoading, participants, participant, redirectTimer, router, isRedirecting]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
          <div className="animate-pulse flex space-x-4 justify-center">
            <div className="rounded-full bg-blue-400 h-3 w-3"></div>
            <div className="rounded-full bg-blue-400 h-3 w-3"></div>
            <div className="rounded-full bg-blue-400 h-3 w-3"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
          {error}
        </div>
      </div>
    );
  }
  
  if (!participant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
          Participant not found. Redirecting to join page...
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Sunday Group</h1>
        <p className="text-lg">Welcome, {participant.name}!</p>
      </header>
      
      <div className="max-w-4xl mx-auto">
        {!isGroupsFormed ? (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Waiting for groups to be formed</h2>
            <p className="mb-6">The host will form groups soon. Please wait...</p>
            <div className="animate-pulse flex space-x-4 justify-center">
              <div className="rounded-full bg-blue-400 h-3 w-3"></div>
              <div className="rounded-full bg-blue-400 h-3 w-3"></div>
              <div className="rounded-full bg-blue-400 h-3 w-3"></div>
            </div>
          </div>
        ) : participantGroup ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Your Group</h2>
              <p className="text-md mt-2">
                {participantGroup.testament === 'old' ? 'Old Testament' : 'New Testament'} Group
              </p>
            </div>
            
            <GroupDisplay 
              groups={[participantGroup]} 
              highlightGroupId={participantGroup.id}
              hideGroupsHeading={true}
            />
          </div>
        ) : (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Group Assignment Pending</h2>
            <p>You haven't been assigned to a group yet. Please wait...</p>
          </div>
        )}
      </div>
    </div>
  );
}
