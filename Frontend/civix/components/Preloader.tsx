"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and wait for page to be ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="preloader-wrapper">
      <div className="preloader-content">
        {/* Premium Animated Logo */}
        <div className="relative">
          <div className="logo-outer-ring"></div>
          <div className="logo-inner-ring"></div>
          <div className="logo-center">
            <Logo size="md" showText={false} />
          </div>
        </div>

        {/* Professional Loading Text */}
        <div className="preloader-text">
          <h2 className="loading-title">CIVIX</h2>
          <p className="loading-subtitle">Digital Civic Platform</p>
          <div className="loading-bar">
            <div className="loading-bar-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
