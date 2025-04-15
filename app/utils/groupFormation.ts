import { Participant, Group, generateUniqueId, getRandomBibleBook } from './types';

/**
 * Forms groups from a list of participants with the following priorities:
 * 1. Even group count (2, 4, 6) for balanced testament distribution
 * 2. Leaders in every sub group
 * 3. Sizes within 3-8
 * 
 * Constraints will be broken in reverse order if necessary.
 */
export function formGroups(participants: Participant[]): Group[] {
  if (participants.length === 0) return [];
  
  // Count willing leaders (both big group and small group)
  const willingLeaders = participants.filter(p => p.isWillingToLead || p.isBigGroupLeader);
  
  // Calculate how many groups we need
  const minGroupSize = 3;
  const maxGroupSize = 8;
  const totalParticipants = participants.length;
  
  // Calculate min and max number of groups possible based on size constraints
  const maxGroups = Math.floor(totalParticipants / minGroupSize);
  const minGroups = Math.ceil(totalParticipants / maxGroupSize);
  
  // PRIORITY #1: Even group count
  // Start by finding the closest even number within our min/max range
  let numGroups;
  
  // Find all possible even numbers within our range
  const possibleEvenGroups = [];
  for (let i = minGroups; i <= maxGroups; i++) {
    if (i % 2 === 0) {
      possibleEvenGroups.push(i);
    }
  }
  
  // If we have possible even group counts, use one of them
  if (possibleEvenGroups.length > 0) {
    // PRIORITY #2: Leaders in every group
    // Choose the largest even number that doesn't exceed our leader count
    const evenGroupsWithLeaders = possibleEvenGroups.filter(count => count <= willingLeaders.length);
    
    if (evenGroupsWithLeaders.length > 0) {
      // We can satisfy both priority #1 and #2
      numGroups = Math.max(...evenGroupsWithLeaders);
    } else {
      // We can't satisfy priority #2 with an even count
      // Choose the smallest even count to minimize groups without leaders
      numGroups = Math.min(...possibleEvenGroups);
    }
  } else {
    // No even numbers within our range, we have to break priority #1
    // PRIORITY #2: Leaders in every group
    if (willingLeaders.length >= minGroups && willingLeaders.length <= maxGroups) {
      // We can satisfy priority #2
      numGroups = willingLeaders.length;
    } else if (willingLeaders.length < minGroups) {
      // Not enough leaders, use minimum groups
      numGroups = minGroups;
    } else {
      // Too many leaders, use maximum groups
      numGroups = maxGroups;
    }
  }
  
  // If we have no participants, return empty array
  if (totalParticipants === 0) {
    return [];
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
  
  // First, identify groups that don't have a big group leader
  const groupsWithoutBigLeader = groups.filter(g => 
    !g.participants.some(p => p.isBigGroupLeader)
  );
  
  // Distribute small group leaders to ensure each group has a leader if possible
  // First, try to assign one leader to each group that doesn't have a big group leader
  for (let i = 0; i < groupsWithoutBigLeader.length; i++) {
    if (smallGroupLeaders.length > 0) {
      const group = groupsWithoutBigLeader[i];
      const leader = smallGroupLeaders.shift()!;
      group.participants.push(leader);
      group.hasLeader = true;
      leader.testament = group.testament;
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
  
  // Distribute regular participants evenly
  // Always add to the smallest group first to keep sizes balanced
  for (let i = 0; i < regularParticipants.length; i++) {
    // Find the group with the fewest participants overall
    const smallestGroup = groups
      .sort((a, b) => a.participants.length - b.participants.length)[0];
    
    smallestGroup.participants.push(regularParticipants[i]);
    regularParticipants[i].testament = smallestGroup.testament;
  }
  
  // Update participant groupIds
  groups.forEach(group => {
    group.participants.forEach(participant => {
      participant.groupId = group.id;
    });
  });
  
  return groups;
}
