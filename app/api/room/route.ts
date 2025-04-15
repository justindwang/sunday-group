import { NextRequest, NextResponse } from 'next/server';
import { getRoomData, updateRoomData, resetRoom } from './data';
import { Participant, Group } from '../../utils/types';
import { formGroups } from '../../utils/groupFormation';

// Configure the API route to be dynamic
export const dynamic = 'force-dynamic';

// GET /api/room?roomId=sunday-group
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const roomId = searchParams.get('roomId') || 'sunday-group';
  
  const roomData = await getRoomData(roomId);
  
  return NextResponse.json(roomData);
}

// POST /api/room
// Actions: addParticipant, removeParticipant, formGroups, resetGroups, resetRoom
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomId = 'sunday-group', action, data } = body;
    
    const roomData = await getRoomData(roomId);
    
    switch (action) {
      case 'addParticipant': {
        const { name, isWillingToLead, isBigGroupLeader } = data;
        const newParticipant: Participant = {
          id: data.id || Math.random().toString(36).substring(2, 9),
          name,
          isWillingToLead,
          isBigGroupLeader
        };
        
        const updatedParticipants = [...roomData.participants, newParticipant];
        await updateRoomData(roomId, { participants: updatedParticipants });
        
        return NextResponse.json({ 
          success: true, 
          participant: newParticipant,
          participants: updatedParticipants
        });
      }
      
      case 'removeParticipant': {
        const { participantId } = data;
        const updatedParticipants = roomData.participants.filter(
          (p: Participant) => p.id !== participantId
        );
        
        await updateRoomData(roomId, { participants: updatedParticipants });
        
        return NextResponse.json({ 
          success: true,
          participants: updatedParticipants
        });
      }
      
      case 'formGroups': {
        const newGroups = formGroups(roomData.participants);
        
        // Update participants with their group assignments
        const updatedParticipants = roomData.participants.map((p: Participant) => {
          const group = newGroups.find(g => 
            g.participants.some(gp => gp.id === p.id)
          );
          
          if (group) {
            return { ...p, groupId: group.id };
          }
          
          return p;
        });
        
        await updateRoomData(roomId, { 
          groups: newGroups,
          participants: updatedParticipants,
          isGroupsFormed: true
        });
        
        return NextResponse.json({ 
          success: true,
          groups: newGroups,
          participants: updatedParticipants,
          isGroupsFormed: true
        });
      }
      
      case 'resetGroups': {
        // Clear group assignments from participants
        const updatedParticipants = roomData.participants.map((p: Participant) => ({
          ...p,
          groupId: undefined
        }));
        
        await updateRoomData(roomId, {
          groups: null,
          participants: updatedParticipants,
          isGroupsFormed: false
        });
        
        return NextResponse.json({ 
          success: true,
          groups: null,
          participants: updatedParticipants,
          isGroupsFormed: false
        });
      }
      
      case 'resetRoom': {
        await resetRoom(roomId);
        
        return NextResponse.json({ 
          success: true,
          participants: [],
          groups: null,
          isGroupsFormed: false
        });
      }
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
