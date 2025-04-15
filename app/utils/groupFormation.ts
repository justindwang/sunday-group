import { Participant, Group, generateUniqueId, getRandomBibleBook } from './types';

/**
 * Forms groups from a list of participants
 * - Groups should have 4-7 people
 * - Each group must have at least one willing leader
 * - Half of the groups will be Old Testament, half will be New Testament
 * - Big group leaders will be distributed evenly between Old and New Testament
 * - Returns null if not enough leaders are available
 */
export function formGroups(participants: Participant[]): Group[] | null {
  if (participants.length === 0) return [];
  
  // Count willing leaders
  const willingLeaders = participants.filter(p => p.isWillingToLead);
  
  // Calculate how many groups we need
  const minGroupSize = 4;
  const maxGroupSize = 7;
  const totalParticipants = participants.length;
  
  // Calculate min and max number of groups possible
  const maxGroups = Math.floor(totalParticipants / minGroupSize);
  const minGroups = Math.ceil(totalParticipants / maxGroupSize);
  
  // If we don't have enough leaders, return null
  if (willingLeaders.length < minGroups) {
    return null;
  }
  
  // Determine optimal number of groups, ensuring it's an even number
  let numGroups = Math.min(maxGroups, willingLeaders.length);
  numGroups = Math.max(numGroups, minGroups);
  // Make sure we have an even number of groups
  if (numGroups % 2 !== 0) {
    numGroups += 1;
  }
  
  // If increasing to an even number makes groups too small, return null
  if (totalParticipants / numGroups < minGroupSize) {
    return null;
  }
  
  // Shuffle participants
  const shuffledParticipants = [...participants].sort(() => Math.random() - 0.5);
  
  // Separate big group leaders, small group leaders, and regular participants
  const bigGroupLeaders = shuffledParticipants.filter(p => p.isBigGroupLeader);
  const smallGroupLeaders = shuffledParticipants.filter(p => p.isWillingToLead && !p.isBigGroupLeader);
  const regularParticipants = shuffledParticipants.filter(p => !p.isWillingToLead && !p.isBigGroupLeader);
  
  // Initialize groups with half Old Testament and half New Testament
  const groups: Group[] = [];
  const halfGroups = numGroups / 2;
  
  for (let i = 0; i < numGroups; i++) {
    const testament = i < halfGroups ? 'old' : 'new';
    groups.push({
      id: `group-${i + 1}`,
      name: getRandomBibleBook(testament),
      participants: [],
      hasLeader: false,
      testament: testament
    });
  }
  
  // Distribute big group leaders evenly between Old and New Testament
  for (let i = 0; i < bigGroupLeaders.length; i++) {
    const testament = i % 2 === 0 ? 'old' : 'new';
    const testamentGroups = groups.filter(g => g.testament === testament);
    
    // Find the group with the fewest participants in this testament
    const groupIndex = groups.findIndex(g => g === testamentGroups
      .sort((a, b) => a.participants.length - b.participants.length)[0]);
    
    if (groupIndex !== -1) {
      groups[groupIndex].participants.push(bigGroupLeaders[i]);
      bigGroupLeaders[i].testament = testament;
    }
  }
  
  // Distribute small group leaders, ensuring each group has at least one leader
  // First, assign one leader to each group that doesn't have a big group leader
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].participants.length === 0 && smallGroupLeaders.length > 0) {
      const leader = smallGroupLeaders.shift()!;
      groups[i].participants.push(leader);
      groups[i].hasLeader = true;
      leader.testament = groups[i].testament;
    }
  }
  
  // Then distribute remaining small group leaders
  for (let i = 0; i < smallGroupLeaders.length; i++) {
    // Find the group with the fewest participants in the appropriate testament
    // Alternate between old and new testament
    const testament = i % 2 === 0 ? 'old' : 'new';
    const testamentGroups = groups.filter(g => g.testament === testament);
    
    const groupIndex = groups.findIndex(g => g === testamentGroups
      .sort((a, b) => a.participants.length - b.participants.length)[0]);
    
    if (groupIndex !== -1) {
      groups[groupIndex].participants.push(smallGroupLeaders[i]);
      groups[groupIndex].hasLeader = true;
      smallGroupLeaders[i].testament = testament;
    }
  }
  
  // Mark groups with big group leaders as having a leader
  groups.forEach(group => {
    if (group.participants.some(p => p.isBigGroupLeader)) {
      group.hasLeader = true;
    }
  });
  
  // Distribute regular participants evenly between Old and New Testament
  for (let i = 0; i < regularParticipants.length; i++) {
    const testament = i % 2 === 0 ? 'old' : 'new';
    const testamentGroups = groups.filter(g => g.testament === testament);
    
    // Find the group with the fewest participants in this testament
    const groupIndex = groups.findIndex(g => g === testamentGroups
      .sort((a, b) => a.participants.length - b.participants.length)[0]);
    
    if (groupIndex !== -1) {
      groups[groupIndex].participants.push(regularParticipants[i]);
      regularParticipants[i].testament = testament;
    }
  }
  
  // Update participant groupIds
  groups.forEach(group => {
    group.participants.forEach(participant => {
      participant.groupId = group.id;
    });
  });
  
  return groups;
}
