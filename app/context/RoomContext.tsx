"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Participant, Group, generateUniqueId } from '../utils/types';
import { formGroups } from '../utils/groupFormation';

interface RoomContextType {
  roomId: string;
  participants: Participant[];
  groups: Group[] | null;
  isGroupsFormed: boolean;
  addParticipant: (name: string, isWillingToLead: boolean) => Participant;
  addParticipantManually: (name: string, isWillingToLead: boolean) => void;
  removeParticipant: (id: string) => void;
  formGroups: () => boolean;
  resetGroups: () => void;
  resetRoom: () => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

// Helper function to safely parse JSON from localStorage
const safelyParseJSON = (json: string | null, fallback: any = null) => {
  if (!json) return fallback;
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error('Failed to parse JSON from localStorage:', e);
    return fallback;
  }
};

export function RoomProvider({ children }: { children: React.ReactNode }) {
  // Use a fixed roomId for all sessions instead of generating a random one
  const [roomId] = useState<string>("sunday-group");
  
  const [participants, setParticipants] = useState<Participant[]>(() => {
    if (typeof window === 'undefined') return [];
    return safelyParseJSON(localStorage.getItem('participants'), []);
  });
  
  const [groups, setGroups] = useState<Group[] | null>(() => {
    if (typeof window === 'undefined') return null;
    return safelyParseJSON(localStorage.getItem('groups'), null);
  });
  
  const [isGroupsFormed, setIsGroupsFormed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('isGroupsFormed') === 'true';
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('roomId', roomId);
      localStorage.setItem('participants', JSON.stringify(participants));
      localStorage.setItem('groups', groups ? JSON.stringify(groups) : '');
      localStorage.setItem('isGroupsFormed', isGroupsFormed.toString());
    }
  }, [roomId, participants, groups, isGroupsFormed]);

  // Add a participant who joined via the join page
  const addParticipant = (name: string, isWillingToLead: boolean): Participant => {
    const newParticipant: Participant = {
      id: generateUniqueId(),
      name,
      isWillingToLead
    };
    
    setParticipants(prev => [...prev, newParticipant]);
    return newParticipant;
  };

  // Add a participant manually from the host page
  const addParticipantManually = (name: string, isWillingToLead: boolean) => {
    addParticipant(name, isWillingToLead);
  };

  // Remove a participant
  const removeParticipant = (id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  };

  // Form groups from participants
  const createGroups = (): boolean => {
    const newGroups = formGroups(participants);
    
    if (newGroups === null) {
      return false; // Not enough leaders
    }
    
    setGroups(newGroups);
    setIsGroupsFormed(true);
    return true;
  };

  // Reset groups without clearing participants
  const resetGroups = () => {
    setGroups(null);
    setIsGroupsFormed(false);
    
    // Clear group assignments from participants
    setParticipants(prev => 
      prev.map(p => ({ ...p, groupId: undefined }))
    );
  };

  // Reset the entire room
  const resetRoom = () => {
    // No longer changing roomId since we're using a fixed value
    setParticipants([]);
    setGroups(null);
    setIsGroupsFormed(false);
  };

  const value = {
    roomId,
    participants,
    groups,
    isGroupsFormed,
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
