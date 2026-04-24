import React from 'react';

export default function Loader() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-950 to-black flex items-center justify-center relative">
      <div className="relative z-10 flex flex-col items-center gap-12 px-6">
        <div className="relative w-32 h-32">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full"
            style={{
              animation: 'spin 2s linear infinite',
            }}
          >
            <rect
              x="20"
              y="20"
              width="80"
              height="80"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="2"
              rx="4"
            />
            
            <rect
              x="35"
              y="35"
              width="50"
              height="50"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="1.5"
              rx="2"
              opacity="0.6"
            />

            <circle
              cx="60"
              cy="60"
              r="12"
              fill="url(#gradient1)"
              style={{
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />

            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5a46c2" />
                <stop offset="100%" stopColor="#4838a3" />
              </linearGradient>
              <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4838a3" />
                <stop offset="100%" stopColor="#5a46c2" />
              </linearGradient>
            </defs>
          </svg>

          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(90, 70, 194, 0.2) 0%, transparent 70%)',
              animation: 'pulse 3s ease-in-out infinite',
            }}
          ></div>
        </div>

        <div className="flex flex-col items-center gap-3 max-w-md">
          <h1 className="text-2xl font-semibold text-white text-center">
            Preparing Model
          </h1>
          <p className="text-gray-400 text-sm text-center leading-relaxed">
            Your 3D model is being analyzed and optimized for manufacturing
          </p>

          <div className="mt-4 flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{
                  background: '#5a46c2',
                  animation: `scaleIn 1s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-[#5a46c2] to-transparent"></div>
      </div>

      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes scaleIn {
          0%, 100% {
            transform: scaleY(0.5);
            opacity: 0.4;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}