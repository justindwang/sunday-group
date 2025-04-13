"use client";

import { useState, useEffect } from 'react';
import { useRoom } from '../context/RoomContext';
import GroupDisplay from './GroupDisplay';
import { Participant, Group } from '../utils/types';

interface ParticipantPageClientProps {
  roomId: string;
  participantId: string;
}

export default function ParticipantPageClient({ roomId, participantId }: ParticipantPageClientProps) {
  const { participants, groups, isGroupsFormed } = useRoom();
  const [participant, setParticipant] = useState<Participant | undefined>(undefined);
  const [participantGroup, setParticipantGroup] = useState<Group | undefined>(undefined);
  
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
  
  if (!participant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
          Participant not found. Please try joining again.
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
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {participantGroup.name}
              </p>
            </div>
            
            <GroupDisplay 
              groups={[participantGroup]} 
              highlightGroupId={participantGroup.id} 
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
