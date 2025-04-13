import { Participant, Group, generateUniqueId, getRandomBibleBook } from './types';

/**
 * Forms groups from a list of participants
 * - Groups should have 4-6 people
 * - Each group must have at least one willing leader
 * - Returns null if not enough leaders are available
 */
export function formGroups(participants: Participant[]): Group[] | null {
  if (participants.length === 0) return [];
  
  // Count willing leaders
  const willingLeaders = participants.filter(p => p.isWillingToLead);
  
  // Calculate how many groups we need
  const minGroupSize = 4;
  const maxGroupSize = 6;
  const totalParticipants = participants.length;
  
  // Calculate min and max number of groups possible
  const maxGroups = Math.floor(totalParticipants / minGroupSize);
  const minGroups = Math.ceil(totalParticipants / maxGroupSize);
  
  // If we don't have enough leaders, return null
  if (willingLeaders.length < minGroups) {
    return null;
  }
  
  // Determine optimal number of groups
  let numGroups = Math.min(maxGroups, willingLeaders.length);
  numGroups = Math.max(numGroups, minGroups);
  
  // Shuffle participants
  const shuffledParticipants = [...participants].sort(() => Math.random() - 0.5);
  
  // Separate leaders and non-leaders
  const leaders = shuffledParticipants.filter(p => p.isWillingToLead);
  const nonLeaders = shuffledParticipants.filter(p => !p.isWillingToLead);
  
  // Initialize groups with one leader each
  const groups: Group[] = [];
  for (let i = 0; i < numGroups; i++) {
    if (i < leaders.length) {
      groups.push({
        id: generateUniqueId(),
        name: getRandomBibleBook(),
        participants: [leaders[i]],
        hasLeader: true
      });
    }
  }
  
  // Distribute remaining leaders
  for (let i = numGroups; i < leaders.length; i++) {
    const groupIndex = i % numGroups;
    groups[groupIndex].participants.push(leaders[i]);
  }
  
  // Distribute non-leaders evenly
  for (let i = 0; i < nonLeaders.length; i++) {
    // Find the group with the fewest participants
    const groupIndex = groups
      .map((group, index) => ({ index, count: group.participants.length }))
      .sort((a, b) => a.count - b.count)[0].index;
    
    groups[groupIndex].participants.push(nonLeaders[i]);
  }
  
  // Update participant groupIds
  groups.forEach(group => {
    group.participants.forEach(participant => {
      participant.groupId = group.id;
    });
  });
  
  return groups;
}
