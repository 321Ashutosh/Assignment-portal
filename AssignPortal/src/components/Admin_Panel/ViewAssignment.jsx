import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ViewAssignment = () => {
  const AssignmentDetails = ({ assignment }) => {
    if (!assignment) {
      return <div>No assignment data available</div>;
    }

    const { _id, userId, task, adminId, status, timestamp } = assignment;

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Assignment Details</h1>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600 text-sm">Assignment ID:</p>
              <p className="text-gray-900 font-medium">{_id}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">User:</p>
              <p className="text-gray-900 font-medium">{userId?.username}</p>
              <p className="text-gray-600 text-xs">
                Created At: {new Date(userId?.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Task:</p>
              <p className="text-blue-500 font-medium">{task}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Admin ID:</p>
              <p className="text-gray-900 font-medium">{adminId}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Status:</p>
              <p
                className={`font-medium ${
                  status === 'Pending'
                    ? 'text-yellow-500'
                    : status === 'Accepted'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {status}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Timestamp:</p>
              <p className="text-gray-900 font-medium">
                {new Date(timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return null; 
};

export default ViewAssignment;
