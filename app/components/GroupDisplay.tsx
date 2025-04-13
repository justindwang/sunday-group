"use client";

import React from 'react';
import { Group } from '../utils/types';

interface GroupDisplayProps {
  groups: Group[];
  highlightGroupId?: string;
}

export default function GroupDisplay({ groups, highlightGroupId }: GroupDisplayProps) {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-lg">No groups have been formed yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Groups</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div 
            key={group.id}
            className={`
              bg-white dark:bg-gray-800 
              rounded-lg shadow-md overflow-hidden
              border-t-4 border-blue-500
              ${highlightGroupId === group.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
            `}
          >
            <div className="p-4 bg-blue-50 dark:bg-blue-900">
              <h3 className="text-xl font-bold text-center">{group.name}</h3>
            </div>
            
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {group.participants.map((participant) => (
                <li 
                  key={participant.id}
                  className={`
                    p-4 flex items-center justify-between
                    ${participant.isWillingToLead ? 'bg-blue-50 dark:bg-blue-900/30' : ''}
                  `}
                >
                  <span className="font-medium">{participant.name}</span>
                  {participant.isWillingToLead && (
                    <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                      Leader
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
