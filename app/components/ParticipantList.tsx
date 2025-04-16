"use client";

import React, { useEffect, useState } from 'react';
import { Participant } from '../utils/types';

interface ParticipantListProps {
  participants: Participant[];
}

export default function ParticipantList({ participants }: ParticipantListProps) {
  const [animatedParticipants, setAnimatedParticipants] = useState<string[]>([]);
  
  // Track new participants for animation
  useEffect(() => {
    const currentIds = participants.map(p => p.id);
    const newParticipants = participants.filter(p => !animatedParticipants.includes(p.id));
    
    if (newParticipants.length > 0) {
      // Add new participants to the animated list
      setAnimatedParticipants(prev => [...prev, ...newParticipants.map(p => p.id)]);
    } else if (currentIds.length < animatedParticipants.length) {
      // Remove participants that are no longer in the list
      setAnimatedParticipants(prev => prev.filter(id => currentIds.includes(id)));
    }
  }, [participants, animatedParticipants]);

  if (participants.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-lg">Waiting for participants to join...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[75%] mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Participants ({participants.length})</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {participants.map((participant) => (
          <li 
            key={participant.id}
            className={`
              bg-white dark:bg-gray-800 
              p-3 rounded-lg shadow-sm 
              flex items-center justify-between
              border-l-4 ${
                participant.isBigGroupLeader 
                  ? 'border-green-500' 
                  : participant.isWillingToLead 
                    ? 'border-blue-500' 
                    : 'border-gray-300'
              }
              ${animatedParticipants.includes(participant.id) && !participant.groupId ? 'animate-fadeIn' : ''}
              ${participant.groupId ? 'opacity-70' : 'opacity-100'}
            `}
          >
            <span className="font-medium truncate">{participant.name}</span>
            <div className="flex flex-col space-y-1">
              {/* {participant.isBigGroupLeader && (
                <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full whitespace-nowrap">
                  Sermon Lead
                </span>
              )} */}
              {participant.isWillingToLead && (
                <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full whitespace-nowrap">
                  Small Group Lead
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Add this to your globals.css or create a new CSS file
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// 
// .animate-fadeIn {
//   animation: fadeIn 0.5s ease-out forwards;
// }
