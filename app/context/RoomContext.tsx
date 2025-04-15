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
      // Add cache-busting timestamp to prevent browser caching
      const timestamp = Date.now();
      const response = await fetch(`/api/room?roomId=${roomId}&_t=${timestamp}`, {
        // Add cache-busting headers
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch room data');
      }
      
      const data = await response.json();
      
      // Check if data is valid
      if (data && Array.isArray(data.participants)) {
        setParticipants(data.participants);
        setGroups(data.groups);
        setIsGroupsFormed(data.isGroupsFormed);
        setError(null);
      } else {
        console.error('Invalid data format received:', data);
        setError('Received invalid data format from server');
      }
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

  // Polling for updates every 2 seconds (reduced from 3 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Only fetch if it's been more than 1 second since the last fetch (reduced from 2 seconds)
      // This prevents too many requests if we're already making API calls
      if (Date.now() - lastFetchTime > 1000) {
        fetchRoomData();
      }
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, [lastFetchTime]);

  // Add a participant who joined via the join page
  const addParticipant = async (name: string, isWillingToLead: boolean, isBigGroupLeader: boolean): Promise<Participant> => {
    try {
      // Set a loading state to indicate operation in progress
      setIsLoading(true);
      
      const participantId = generateUniqueId();
      
      // Add cache-busting timestamp
      const timestamp = Date.now();
      
      const response = await fetch(`/api/room?_t=${timestamp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
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
      
      // Only update client state after successful API call
      setParticipants(result.participants);
      
      // Force a fresh fetch after a small delay to ensure Firestore consistency
      setTimeout(() => {
        fetchRoomData();
      }, 200); // Increased delay for better consistency
      
      setLastFetchTime(Date.now());
      setError(null); // Clear any previous errors
      
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
      // Set a loading state to indicate operation in progress
      setIsLoading(true);
      
      // Add cache-busting timestamp
      const timestamp = Date.now();
      
      const response = await fetch(`/api/room?_t=${timestamp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
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
      
      // Only update client state after successful API call
      setParticipants(result.participants);
      
      // Force a fresh fetch after a small delay to ensure Firestore consistency
      setTimeout(() => {
        fetchRoomData();
      }, 200); // Increased delay for better consistency
      
      setLastFetchTime(Date.now());
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error removing participant:', err);
      setError('Failed to remove participant');
      throw err;
    }
  };

  // Form groups from participants
  const createGroups = async (): Promise<boolean> => {
    try {
      // Set a loading state to indicate operation in progress
      setIsLoading(true);
      
      // Add cache-busting timestamp
      const timestamp = Date.now();
      
      const response = await fetch(`/api/room?_t=${timestamp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
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
        throw new Error(result.error || 'Failed to form groups');
      }
      
      // Only update client state after successful API call
      setGroups(result.groups);
      setParticipants(result.participants);
      setIsGroupsFormed(result.isGroupsFormed);
      
      // Force a fresh fetch after a small delay to ensure Firestore consistency
      setTimeout(() => {
        fetchRoomData();
      }, 200); // Increased delay for better consistency
      
      setLastFetchTime(Date.now());
      setError(null); // Clear any previous errors
      
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
      // Add cache-busting timestamp
      const timestamp = Date.now();
      
      // Set a loading state to indicate operation in progress
      setIsLoading(true);
      
      const response = await fetch(`/api/room?_t=${timestamp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
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
      
      // Only update client state after successful API call
      setGroups(result.groups);
      setParticipants(result.participants);
      setIsGroupsFormed(result.isGroupsFormed);
      
      // Force a fresh fetch after a small delay to ensure Firestore consistency
      setTimeout(() => {
        fetchRoomData();
      }, 200); // Increased delay for better consistency
      
      setLastFetchTime(Date.now());
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error resetting groups:', err);
      setError('Failed to reset groups');
      throw err;
    }
  };

  // Reset the entire room
  const resetRoom = async () => {
    try {
      // Set a loading state to indicate operation in progress
      setIsLoading(true);
      
      // Add cache-busting timestamp
      const timestamp = Date.now();
      
      const response = await fetch(`/api/room?_t=${timestamp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
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
      
      // Only update client state after successful API call
      setParticipants([]);
      setGroups(null);
      setIsGroupsFormed(false);
      
      // Force a fresh fetch after a small delay to ensure Firestore consistency
      setTimeout(() => {
        fetchRoomData();
      }, 200); // Increased delay for better consistency
      
      setLastFetchTime(Date.now());
      setError(null); // Clear any previous errors
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
