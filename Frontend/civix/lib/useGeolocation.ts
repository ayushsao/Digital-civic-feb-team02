"use client";

import { useState, useCallback } from "react";

export interface GeolocationState {
  detectedLocation: string | null;
  isDetecting: boolean;
  error: string | null;
  detectLocation: () => void;
  clearLocation: () => void;
}

/**
 * Reverse-geocodes a lat/lon pair using the OpenStreetMap Nominatim API.
 * Returns the most specific locality name available (city > town > village > county).
 */
async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  const response = await fetch(url, {
    headers: {
      // Nominatim requires a descriptive User-Agent
      "User-Agent": "Civix-App/1.0",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }

  const data = await response.json();
  const addr = data.address || {};

  // Pick the most specific locality name available
  const locality =
    addr.city ||
    addr.town ||
    addr.village ||
    addr.municipality ||
    addr.county ||
    addr.state_district ||
    addr.state ||
    null;

  if (!locality) {
    throw new Error("Could not determine your area from coordinates");
  }

  return locality as string;
}

/**
 * Custom hook that provides real-time location detection via the browser
 * Geolocation API with automatic reverse geocoding to a human-readable area name.
 */
export function useGeolocation(): GeolocationState {
  const [detectedLocation, setDetectedLocation] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    setError(null);
    setDetectedLocation(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const location = await reverseGeocode(latitude, longitude);
          setDetectedLocation(location);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Unable to determine your area. Please try again.";
          setError(message);
        } finally {
          setIsDetecting(false);
        }
      },
      (err) => {
        setIsDetecting(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location access denied. Please enable location permissions.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError("An unknown error occurred while detecting your location.");
        }
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  const clearLocation = useCallback(() => {
    setDetectedLocation(null);
    setError(null);
  }, []);

  return { detectedLocation, isDetecting, error, detectLocation, clearLocation };
}
