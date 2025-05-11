"use client";

import React, { useEffect, useState } from 'react';
import { Participant } from '../utils/types';
import { useRoom } from '../context/RoomContext';

interface ParticipantListProps {
  participants: Participant[];
  isHost?: boolean;
}

export default function ParticipantList({ participants, isHost = false }: ParticipantListProps) {
  const { removeParticipant } = useRoom();
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
              relative
            `}
          >
            <span 
              className="font-medium truncate"
              title={isHost ? participant.name : undefined}
            >
              {participant.name}
            </span>
            <div className="flex items-center space-x-2">
              {participant.isWillingToLead && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full whitespace-nowrap">
                  Small Group Lead
                </span>
              )}
              {isHost && (
                <button 
                  onClick={() => removeParticipant(participant.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                  title="Remove participant"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
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
