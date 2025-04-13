import { Participant, Group } from '../../utils/types';

// In-memory storage for room data
// In a production app, you would use a database
interface RoomData {
  participants: Participant[];
  groups: Group[] | null;
  isGroupsFormed: boolean;
}

// Initialize with empty data
const roomsData: Record<string, RoomData> = {
  'sunday-group': {
    participants: [],
    groups: null,
    isGroupsFormed: false
  }
};

export function getRoomData(roomId: string): RoomData {
  // Return the room data or create it if it doesn't exist
  if (!roomsData[roomId]) {
    roomsData[roomId] = {
      participants: [],
      groups: null,
      isGroupsFormed: false
    };
  }
  return roomsData[roomId];
}

export function updateRoomData(roomId: string, data: Partial<RoomData>): RoomData {
  const room = getRoomData(roomId);
  
  // Update only the provided fields
  if (data.participants !== undefined) {
    room.participants = data.participants;
  }
  
  if (data.groups !== undefined) {
    room.groups = data.groups;
  }
  
  if (data.isGroupsFormed !== undefined) {
    room.isGroupsFormed = data.isGroupsFormed;
  }
  
  return room;
}

export function resetRoom(roomId: string): void {
  roomsData[roomId] = {
    participants: [],
    groups: null,
    isGroupsFormed: false
  };
}
