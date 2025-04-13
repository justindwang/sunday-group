"use client";

import React, { useState } from 'react';

interface AddParticipantFormProps {
  onAddParticipant: (name: string, isWillingToLead: boolean) => void;
}

export default function AddParticipantForm({ onAddParticipant }: AddParticipantFormProps) {
  const [name, setName] = useState('');
  const [isWillingToLead, setIsWillingToLead] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      onAddParticipant(name.trim(), isWillingToLead);
      setName('');
      setIsWillingToLead(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Participant Manually</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter participant name"
            required
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isLeader"
            checked={isWillingToLead}
            onChange={(e) => setIsWillingToLead(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isLeader" className="ml-2 block text-sm">
            Willing to lead a group
          </label>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Participant
        </button>
      </form>
    </div>
  );
}
