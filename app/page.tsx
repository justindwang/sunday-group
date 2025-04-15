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
    isLoading,
    loadingStates,
    error,
    addParticipantManually, 
    formGroups, 
    resetGroups, 
    resetRoom 
  } = useRoom();
  
  const [showError, setShowError] = useState(false);
  const [joinUrl, setJoinUrl] = useState('');
  
  // Generate the join URL on the client side with the fixed roomId
  useEffect(() => {
    setJoinUrl(`${window.location.origin}/join/sunday-group`);
  }, []);
  
  const handleFormGroups = async () => {
    const success = await formGroups();
    if (!success) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  // Only show loading indicator on initial load
  if (isLoading && !participants.length && !groups) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
          <div className="animate-pulse flex space-x-4 justify-center">
            <div className="rounded-full bg-blue-400 h-3 w-3"></div>
            <div className="rounded-full bg-blue-400 h-3 w-3"></div>
            <div className="rounded-full bg-blue-400 h-3 w-3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <header className="mb-8 mt-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Sunday Group Formation</h1>
      </header>
      
      {error && (
        <div className="max-w-6xl mx-auto mb-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {error}
          </div>
        </div>
      )}
      
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
            disabled={
              participants.length < 3 || 
              (isGroupsFormed && groups && groups.length > 0) || 
              loadingStates.formingGroups || 
              loadingStates.resettingGroups || 
              loadingStates.resettingRoom
            }
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingStates.formingGroups ? 'Forming Groups...' : 'Form Groups'}
          </button>
          
          {/* {isGroupsFormed && groups && groups.length > 0 && (
            <button
              onClick={() => resetGroups()}
              disabled={
                loadingStates.formingGroups || 
                loadingStates.resettingGroups || 
                loadingStates.resettingRoom
              }
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingStates.resettingGroups ? 'Resetting Groups...' : 'Reset Groups'}
            </button>
          )} */}
          
          <button
            onClick={() => resetRoom()}
            disabled={
              loadingStates.formingGroups || 
              loadingStates.resettingGroups || 
              loadingStates.resettingRoom
            }
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingStates.resettingRoom ? 'Resetting Room...' : 'Reset Room'}
          </button>
        </div>
        
        {showError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            An error occurred while forming groups. Please try again.
          </div>
        )}
        
        {isGroupsFormed && groups && groups.length > 0 && (
          <div className="mb-8">
            <GroupDisplay groups={groups} />
          </div>
        )}
      </div>
    </div>
  );
}
