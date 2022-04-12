import React from 'react';

function Loading() {
    return (
        <div className="flex items-center mt-72 justify-center space-x-2 animate-pulse transform transition duration-75">
            <div className="w-8 h-8 bg-cyan-500 rounded-full"/>
            <div className="w-8 h-8 bg-cyan-500 rounded-full"/>
            <div className="w-8 h-8 bg-cyan-500 rounded-full"/>
        </div>
    );
}

export default Loading;