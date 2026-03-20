import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 40, text: "text-xl" },
    lg: { icon: 56, text: "text-3xl" },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Premium Logo Icon */}
      <div className="relative" style={{ width: currentSize.icon, height: currentSize.icon }}>
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#6366f1", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#4f46e5", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#818cf8", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#6366f1", stopOpacity: 1 }} />
            </linearGradient>
            
            {/* Shadow */}
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="2" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Circle with Gradient */}
          <circle cx="100" cy="100" r="90" fill="url(#logoGradient)" filter="url(#shadow)" />
          
          {/* Decorative Ring */}
          <circle 
            cx="100" 
            cy="100" 
            r="85" 
            fill="none" 
            stroke="url(#accentGradient)" 
            strokeWidth="1.5" 
            opacity="0.3"
          />
          
          {/* Letter C - Modern geometric style */}
          <path
            d="M 130 70 
               A 40 40 0 1 1 130 130
               L 130 130
               A 40 40 0 0 0 130 70
               L 145 75
               A 50 50 0 0 1 145 125
               L 145 125
               A 50 50 0 1 0 145 75
               Z"
            fill="white"
            opacity="0.95"
          />
          
          {/* Inner accent line */}
          <path
            d="M 135 80 A 35 35 0 0 1 135 120"
            stroke="url(#accentGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />
          
          {/* Small civic icon elements - three dots representing citizens */}
          <circle cx="70" cy="100" r="4" fill="white" opacity="0.8" />
          <circle cx="70" cy="88" r="3" fill="white" opacity="0.6" />
          <circle cx="70" cy="112" r="3" fill="white" opacity="0.6" />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <span className={`${currentSize.text} font-bold bg-linear-to-r from-indigo-600 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent tracking-tight`}>
          civix
        </span>
      )}
    </div>
  );
}
