"use client";

import React from 'react';
import { Group } from '../utils/types';

interface GroupDisplayProps {
  groups: Group[];
  highlightGroupId?: string;
  hideGroupsHeading?: boolean;
  isHost?: boolean;
}

export default function GroupDisplay({ groups, highlightGroupId, hideGroupsHeading = false, isHost = false }: GroupDisplayProps) {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-lg">No groups have been formed yet.</p>
      </div>
    );
  }

  // Separate groups by testament
  const oldTestamentGroups = groups.filter(g => g.testament === 'old');
  const newTestamentGroups = groups.filter(g => g.testament === 'new');

  // If hideGroupsHeading is true, just show the group cards without the headings
  if (hideGroupsHeading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-4 mb-8">
          {groups.map((group) => (
            <GroupCard 
              key={group.id} 
              group={group} 
              highlightGroupId={highlightGroupId} 
              testamentColor={group.testament === 'old' ? 'amber' : 'blue'}
              isHost={isHost}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default view with all headings
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Groups</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Old Testament Groups */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Old Testament</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {oldTestamentGroups.map((group) => (
              <GroupCard 
                key={group.id} 
                group={group} 
                highlightGroupId={highlightGroupId} 
                testamentColor="amber"
                isHost={isHost}
              />
            ))}
          </div>
        </div>
        
        {/* New Testament Groups */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">New Testament</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newTestamentGroups.map((group) => (
              <GroupCard 
                key={group.id} 
                group={group} 
                highlightGroupId={highlightGroupId} 
                testamentColor="blue"
                isHost={isHost}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface GroupCardProps {
  group: Group;
  highlightGroupId?: string;
  testamentColor: 'amber' | 'blue';
  isHost?: boolean;
}

function GroupCard({ group, highlightGroupId, testamentColor, isHost = false }: GroupCardProps) {
  const borderColor = testamentColor === 'amber' ? 'border-amber-500' : 'border-blue-500';
  const headerBgColor = testamentColor === 'amber' ? 'bg-amber-50 dark:bg-amber-900' : 'bg-blue-50 dark:bg-blue-900';
  
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg shadow-md overflow-hidden
        border-t-4 ${borderColor}
        ${highlightGroupId === group.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
    >
      <div className={`p-4 ${headerBgColor}`}>
        <h3 className="text-xl font-bold text-center">{group.name}</h3>
      </div>
            
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {group.participants.map((participant) => {
          // Determine the appropriate background and badge for the participant
          const bgClass = participant.isBigGroupLeader 
            ? 'bg-green-50 dark:bg-green-900/30' 
            : participant.isWillingToLead 
              ? 'bg-blue-50 dark:bg-blue-900/30' 
              : '';
          
          return (
            <li 
              key={participant.id}
              className={`
                p-4 flex items-center justify-between
                ${bgClass}
              `}
            >
              <span 
                className="font-medium"
                title={isHost ? participant.name : undefined}
              >
                {participant.name}
              </span>
              <div className="flex space-x-2">
                {/* {participant.isBigGroupLeader && (
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                    Sermon Lead
                  </span>
                )} */}
                {participant.isWillingToLead && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                    Small Group Lead
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
