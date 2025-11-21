'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-neon-purple/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Loading Spinner */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 rounded-full border-4 border-gray-700"></div>

          {/* Spinning gradient ring */}
          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-neon-blue border-r-neon-purple animate-spin"></div>

          {/* Inner glow */}
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 blur-xl"></div>
        </div>

        {/* Loading Text */}
        <div className="mt-8 flex items-center gap-2">
          <span className="text-white font-semibold">Loading</span>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
