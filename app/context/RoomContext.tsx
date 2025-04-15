"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Participant, Group, generateUniqueId } from '../utils/types';

interface RoomContextType {
  roomId: string;
  participants: Participant[];
  groups: Group[] | null;
  isGroupsFormed: boolean;
  isLoading: boolean;
  error: string | null;
  addParticipant: (name: string, isWillingToLead: boolean, isBigGroupLeader: boolean) => Promise<Participant>;
  addParticipantManually: (name: string, isWillingToLead: boolean, isBigGroupLeader: boolean) => Promise<void>;
  removeParticipant: (id: string) => Promise<void>;
  formGroups: () => Promise<boolean>;
  resetGroups: () => Promise<void>;
  resetRoom: () => Promise<void>;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export function RoomProvider({ children }: { children: React.ReactNode }) {
  // Use a fixed roomId for all sessions
  const [roomId] = useState<string>("sunday-group");
  
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [isGroupsFormed, setIsGroupsFormed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  // Fetch room data from the server
  const fetchRoomData = async () => {
    try {
      const response = await fetch(`/api/room?roomId=${roomId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch room data');
      }
      
      const data = await response.json();
      
      setParticipants(data.participants);
      setGroups(data.groups);
      setIsGroupsFormed(data.isGroupsFormed);
      setError(null);
    } catch (err) {
      console.error('Error fetching room data:', err);
      setError('Failed to connect to the server');
    } finally {
      setIsLoading(false);
      setLastFetchTime(Date.now());
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchRoomData();
  }, []);

  // Polling for updates every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Only fetch if it's been more than 2 seconds since the last fetch
      // This prevents too many requests if we're already making API calls
      if (Date.now() - lastFetchTime > 2000) {
        fetchRoomData();
      }
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, [lastFetchTime]);

  // Add a participant who joined via the join page
  const addParticipant = async (name: string, isWillingToLead: boolean, isBigGroupLeader: boolean): Promise<Participant> => {
    try {
      const participantId = generateUniqueId();
      
      const response = await fetch('/api/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          action: 'addParticipant',
          data: {
            id: participantId,
            name,
            isWillingToLead,
            isBigGroupLeader
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add participant');
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to add participant');
      }
      
      setParticipants(result.participants);
      setLastFetchTime(Date.now());
      
      return result.participant;
    } catch (err) {
      console.error('Error adding participant:', err);
      setError('Failed to add participant');
      throw err;
    }
  };

  // Add a participant manually from the host page
  const addParticipantManually = async (name: string, isWillingToLead: boolean, isBigGroupLeader: boolean) => {
    await addParticipant(name, isWillingToLead, isBigGroupLeader);
  };

  // Remove a participant
  const removeParticipant = async (id: string) => {
    try {
      const response = await fetch('/api/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          action: 'removeParticipant',
          data: {
            participantId: id
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove participant');
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to remove participant');
      }
      
      setParticipants(result.participants);
      setLastFetchTime(Date.now());
    } catch (err) {
      console.error('Error removing participant:', err);
      setError('Failed to remove participant');
      throw err;
    }
  };

  // Form groups from participants
  const createGroups = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          action: 'formGroups'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to form groups');
      }
      
      const result = await response.json();
      
      if (!result.success) {
        return false; // Not enough leaders
      }
      
      setGroups(result.groups);
      setParticipants(result.participants);
      setIsGroupsFormed(result.isGroupsFormed);
      setLastFetchTime(Date.now());
      
      return true;
    } catch (err) {
      console.error('Error forming groups:', err);
      setError('Failed to form groups');
      return false;
    }
  };

  // Reset groups without clearing participants
  const resetGroups = async () => {
    try {
      const response = await fetch('/api/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          action: 'resetGroups'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to reset groups');
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to reset groups');
      }
      
      setGroups(result.groups);
      setParticipants(result.participants);
      setIsGroupsFormed(result.isGroupsFormed);
      setLastFetchTime(Date.now());
    } catch (err) {
      console.error('Error resetting groups:', err);
      setError('Failed to reset groups');
      throw err;
    }
  };

  // Reset the entire room
  const resetRoom = async () => {
    try {
      const response = await fetch('/api/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          action: 'resetRoom'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to reset room');
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to reset room');
      }
      
      setParticipants(result.participants);
      setGroups(result.groups);
      setIsGroupsFormed(result.isGroupsFormed);
      setLastFetchTime(Date.now());
    } catch (err) {
      console.error('Error resetting room:', err);
      setError('Failed to reset room');
      throw err;
    }
  };

  const value = {
    roomId,
    participants,
    groups,
    isGroupsFormed,
    isLoading,
    error,
    addParticipant,
    addParticipantManually,
    removeParticipant,
    formGroups: createGroups,
    resetGroups,
    resetRoom
  };

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
}
