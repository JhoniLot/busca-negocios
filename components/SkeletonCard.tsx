import React from 'react';

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-soft animate-pulse flex flex-col h-full">
      <div className="w-full pt-[75%] bg-gray-200 rounded-xl mb-4" />
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full mb-1" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
        <div>
          <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-3" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-9 bg-gray-200 rounded-xl" />
            <div className="h-9 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
