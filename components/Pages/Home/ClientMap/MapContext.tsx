// ClientMap\MapContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
interface Project {
  city: string;
  count: number;
}
interface MapContextType {
  coordinates: Record<string, [number, number]>;
  loading: boolean;
  map: mapboxgl.Map | null;
  setMap: (map: mapboxgl.Map | null) => void;
  mapContainer: HTMLDivElement | null;
  setMapContainer: (container: HTMLDivElement | null) => void;
}
const MapContext = createContext<MapContextType | undefined>(undefined);
const projectsCompletedInCities: Project[] = [
  { city: 'Waco, Texas', count: 18 },
  { city: 'Waxahachie, Texas', count: 1 },
  { city: 'China Spring, Texas', count: 3 },
  { city: 'Austin, Texas', count: 1 },
  { city: 'San Marcos, Texas', count: 1 },
  { city: 'Dallas, Texas', count: 1 },
  { city: 'Elgin, Texas', count: 1 },
  { city: 'El Campo, Texas', count: 1 },
  { city: 'Sealy, Texas', count: 1 },
  { city: 'Hillje, Texas', count: 1 },
  { city: 'Hewitt, Texas', count: 1 },
  { city: 'Crawford, Texas', count: 1 },
];
const defaultCoordinates: Record<string, [number, number]> = {
  'Waco, Texas': [-97.1467, 31.5493],
  'Waxahachie, Texas': [-96.8444, 32.3917],
  'China Spring, Texas': [-97.3167, 31.6591],
  'Austin, Texas': [-97.7431, 30.2672],
  'San Marcos, Texas': [-97.9414, 29.8833],
  'Dallas, Texas': [-96.7969, 32.7767],
  'Elgin, Texas': [-97.3703, 30.3497],
  'El Campo, Texas': [-96.2697, 29.1966],
  'Sealy, Texas': [-96.1572, 29.7808],
  'Hillje, Texas': [-96.3458, 29.1447],
  'Hewitt, Texas': [-97.1958, 31.4624],
  'Crawford, Texas': [-97.4431, 31.5343],
};
export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coordinates, setCoordinates] = useState<Record<string, [number, number]>>({});
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    const cachedCoords = localStorage.getItem('mapCoordinates');
    if (cachedCoords) {
      try {
        const parsedCoords = JSON.parse(cachedCoords);
        // Validate parsed coordinates
        if (Object.keys(parsedCoords).length === projectsCompletedInCities.length) {
          setCoordinates(parsedCoords);
          setLoading(false);
          return;
        } else {
          console.warn('Cached coordinates invalid, fetching new ones');
        }
      } catch (error) {
        console.error('Error parsing cached coordinates:', error);
      }
    }
    const fetchCoordinates = async () => {
      try {
        const coords = await Promise.all(
          projectsCompletedInCities.map(async (project) => {
            try {
              const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(project.city)}.json?access_token=${mapboxgl.accessToken}`
              );
              const coordinates = response.data.features[0]?.geometry.coordinates as [number, number];
              return { city: project.city, coordinates: coordinates || defaultCoordinates[project.city] || [-97.1467, 31.5493] };
            } catch (error) {
              console.error(`Error fetching coordinates for ${project.city}:`, error);
              return { city: project.city, coordinates: defaultCoordinates[project.city] || [-97.1467, 31.5493] };
            }
          })
        );
        const coordsMap = coords.reduce((acc, { city, coordinates }) => {
          acc[city] = coordinates;
          return acc;
        }, {} as Record<string, [number, number]>);
        setCoordinates(coordsMap);
        localStorage.setItem('mapCoordinates', JSON.stringify(coordsMap));
      } catch (error) {
        console.error('Error fetching coordinates, using defaults:', error);
        setCoordinates(defaultCoordinates);
      } finally {
        setLoading(false);
      }
    };
    fetchCoordinates();
  }, []);
  useEffect(() => {
    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
      if (mapContainer) {
        setMapContainer(null);
      }
    };
  }, []);
  const contextValue = useMemo(
    () => ({
      coordinates,
      loading,
      map,
      setMap,
      mapContainer,
      setMapContainer,
    }),
    [coordinates, loading, map, mapContainer]
  );
  return <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>;
};
export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};