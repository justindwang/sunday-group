"use client";

import { useState, useEffect } from 'react';
import QRCode from './components/QRCode';
import ParticipantList from './components/ParticipantList';
import AddParticipantForm from './components/AddParticipantForm';
import GroupDisplay from './components/GroupDisplay';
import { useRoom } from './context/RoomContext';

export default function Home() {
  const { 
    roomId, 
    participants, 
    groups, 
    isGroupsFormed,
    addParticipantManually, 
    formGroups, 
    resetGroups, 
    resetRoom 
  } = useRoom();
  
  const [showError, setShowError] = useState(false);
  const [joinUrl, setJoinUrl] = useState('');
  
  // Generate the join URL on the client side
  useEffect(() => {
    setJoinUrl(`${window.location.origin}/join/${roomId}`);
  }, [roomId]);
  
  const handleFormGroups = () => {
    const success = formGroups();
    if (!success) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Sunday Group Formation</h1>
        <p className="text-lg">Host Page</p>
      </header>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold mb-2">Join this Room</h2>
              <p className="mb-4">
                Scan the QR code or share this link:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md mb-4">
                <code className="text-sm break-all">{joinUrl}</code>
              </div>
            </div>
            
            <QRCode value={joinUrl} />
          </div>
          
          <div>
            <AddParticipantForm onAddParticipant={addParticipantManually} />
          </div>
        </div>
        
        <div className="mb-8">
          <ParticipantList participants={participants} />
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleFormGroups}
            disabled={participants.length < 4 || isGroupsFormed}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Form Groups
          </button>
          
          {isGroupsFormed && (
            <button
              onClick={resetGroups}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-6 rounded-md"
            >
              Reset Groups
            </button>
          )}
          
          <button
            onClick={resetRoom}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md"
          >
            Reset Room
          </button>
        </div>
        
        {showError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            Not enough willing leaders to form groups. Each group needs at least one leader.
          </div>
        )}
        
        {isGroupsFormed && groups && (
          <div className="mb-8">
            <GroupDisplay groups={groups} />
          </div>
        )}
      </div>
    </div>
  );
}
