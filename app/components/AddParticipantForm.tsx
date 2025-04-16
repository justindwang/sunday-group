"use client";

import React, { useState } from 'react';

interface AddParticipantFormProps {
  onAddParticipant: (name: string, isWillingToLead: boolean, isBigGroupLeader: boolean) => Promise<void>;
}

export default function AddParticipantForm({ onAddParticipant }: AddParticipantFormProps) {
  const [name, setName] = useState('');
  const [isWillingToLead, setIsWillingToLead] = useState(false);
  const [isBigGroupLeader, setIsBigGroupLeader] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await onAddParticipant(name.trim(), isWillingToLead, isBigGroupLeader);
      setName('');
      setIsWillingToLead(false);
      setIsBigGroupLeader(false);
    } catch (err) {
      setError('Failed to add participant. Please try again.');
      console.error('Error adding participant:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Participant Manually</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center text-sm">
          {error}
        </div>
      )}
      
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
            disabled={isSubmitting}
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isLeader"
              checked={isWillingToLead}
              onChange={(e) => setIsWillingToLead(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={isSubmitting}
            />
            <label htmlFor="isLeader" className="ml-2 block text-sm">
              Willing to be a small group lead today
            </label>
          </div>
          
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              id="isBigGroupLeader"
              checked={isBigGroupLeader}
              onChange={(e) => setIsBigGroupLeader(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={isSubmitting}
            />
            <label htmlFor="isBigGroupLeader" className="ml-2 block text-sm">
              Leading sermon discussion today
            </label>
          </div> */}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Participant'}
        </button>
      </form>
    </div>
  );
}
