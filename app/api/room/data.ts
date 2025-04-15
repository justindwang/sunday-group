import { Participant, Group } from '../../utils/types';
import { db } from '../../utils/firebase';

// Interface for room data
interface RoomData {
  participants: Participant[];
  groups: Group[] | null;
  isGroupsFormed: boolean;
  lastUpdated?: number; // Timestamp for cache validation
}

// Cache to minimize reads from Firestore
const cache: Record<string, { data: RoomData, timestamp: number }> = {};
const CACHE_TTL = 1000; // 1 second cache TTL (reduced from 5 seconds)

// Default empty room data
const defaultRoomData: RoomData = {
  participants: [],
  groups: null,
  isGroupsFormed: false,
  lastUpdated: Date.now()
};

// Collection name for rooms
const ROOMS_COLLECTION = 'rooms';

/**
 * Get room data from Firestore or cache
 */
export async function getRoomData(roomId: string): Promise<RoomData> {
  const now = Date.now();
  
  // Check cache first
  if (cache[roomId] && now - cache[roomId].timestamp < CACHE_TTL) {
    return cache[roomId].data;
  }
  
  try {
    // Try to get from Firestore
    const roomDoc = await db.collection(ROOMS_COLLECTION).doc(roomId).get();
    
    if (roomDoc.exists) {
      const data = roomDoc.data() as RoomData;
      
      // Update cache
      cache[roomId] = { data, timestamp: now };
      return data;
    }
    
    // If not found, initialize with default data
    await db.collection(ROOMS_COLLECTION).doc(roomId).set({
      ...defaultRoomData,
      lastUpdated: now
    });
    
    cache[roomId] = { data: defaultRoomData, timestamp: now };
    return defaultRoomData;
  } catch (error) {
    console.error('Error getting room data:', error);
    
    // Fallback to default data on error
    cache[roomId] = { data: defaultRoomData, timestamp: now };
    return defaultRoomData;
  }
}

/**
 * Update room data in Firestore
 */
export async function updateRoomData(roomId: string, data: Partial<RoomData>): Promise<RoomData> {
  try {
    const currentData = await getRoomData(roomId);
    
    // Update only the provided fields
    const updatedData = { ...currentData };
    
    if (data.participants !== undefined) {
      updatedData.participants = data.participants;
    }
    
    if (data.groups !== undefined) {
      updatedData.groups = data.groups;
    }
    
    if (data.isGroupsFormed !== undefined) {
      updatedData.isGroupsFormed = data.isGroupsFormed;
    }
    
    // Add timestamp
    updatedData.lastUpdated = Date.now();
    
    // Update Firestore
    await db.collection(ROOMS_COLLECTION).doc(roomId).set(updatedData);
    
    // For group reset operations, clear the cache completely to ensure fresh data
    if (data.groups === null && data.isGroupsFormed === false) {
      delete cache[roomId];
    } else {
      // Update cache for other operations
      cache[roomId] = { data: updatedData, timestamp: Date.now() };
    }
    
    return updatedData;
  } catch (error) {
    console.error('Error updating room data:', error);
    throw error;
  }
}

/**
 * Reset room data
 */
export async function resetRoom(roomId: string): Promise<void> {
  try {
    const resetData = {
      ...defaultRoomData,
      lastUpdated: Date.now()
    };
    
    // Reset in Firestore
    await db.collection(ROOMS_COLLECTION).doc(roomId).set(resetData);
    
    // Clear the cache completely to ensure fresh data is fetched
    delete cache[roomId];
    
    // Force a small delay to ensure Firestore consistency
    await new Promise(resolve => setTimeout(resolve, 100));
  } catch (error) {
    console.error('Error resetting room:', error);
    throw error;
  }
}
