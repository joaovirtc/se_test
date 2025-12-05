import React from 'react';

const GridCustomersSkeleton = () => {
    return (
        <div className="w-full h-[300px] flex flex-col justify-center items-center">
            <div style={{ animationDuration: '0.5s' }} className="animate-spin rounded-full border-2 border-gray-300 border-t-black h-8 w-8 mb-4" />
            <span className="text-gray-500 text-base font-medium plus-jakarta-sans">Loading customers</span>
        </div>
    );
};

export default GridCustomersSkeleton;