'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { recentAlerts, heatmapPoints } from '@/lib/mock-data';

// Fix para ícones do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Ícones customizados para diferentes tipos de alertas
const createCustomIcon = (type: string, urgency: string) => {
  const getEmoji = (type: string) => {
    switch (type) {
      case 'assalto': return '🔫';
      case 'suspeito': return '👁️';
      case 'tiroteio': return '⚠️';
      case 'transito': return '🚗';
      case 'barulho': return '🔊';
      case 'incendio': return '🔥';
      default: return '📍';
    }
  };

  const getColor = (urgency: string) => {
    if (urgency === 'alta') return '#ef4444';
    if (urgency === 'media') return '#f97316';
    return '#eab308';
  };

  const emoji = getEmoji(type);
  const color = getColor(urgency);

  return L.divIcon({
    html: `
      <div style="position: relative;">
        <div style="
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          animation: pulse 2s infinite;
        ">
          ${emoji}
        </div>
        <style>
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
        </style>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });
};

// Ícone para localização do usuário
const userLocationIcon = L.divIcon({
  html: `
    <div style="position: relative;">
      <div style="
        background: #3b82f6;
        border: 4px solid white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(59,130,246,0.5);
        animation: userPulse 2s infinite;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
      <style>
        @keyframes userPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 12px rgba(59,130,246,0.5); }
          50% { transform: scale(1.15); box-shadow: 0 6px 20px rgba(59,130,246,0.8); }
        }
      </style>
    </div>
  `,
  className: 'user-location-marker',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Componente para centralizar o mapa na localização do usuário
function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, 15);
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={userLocationIcon}>
      <Popup>
        <div className="text-center">
          <p className="font-semibold text-gray-900">Você está aqui</p>
          <p className="text-xs text-gray-600 mt-1">Localização atual</p>
        </div>
      </Popup>
    </Marker>
  );
}

interface LiveMapProps {
  showHeatmap: boolean;
}

export default function LiveMap({ showHeatmap }: LiveMapProps) {
  const defaultCenter: [number, number] = [-23.5505, -46.6333]; // São Paulo

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      {/* Camada de tiles do OpenStreetMap (estilo escuro) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* Marcador de localização do usuário */}
      <LocationMarker />

      {/* Mapa de calor (círculos de intensidade) */}
      {showHeatmap && heatmapPoints.map((point, index) => {
        const getColor = (intensity: number) => {
          if (intensity >= 0.8) return '#ef4444';
          if (intensity >= 0.6) return '#f97316';
          if (intensity >= 0.4) return '#eab308';
          return '#84cc16';
        };

        return (
          <Circle
            key={`heatmap-${index}`}
            center={[point.lat, point.lng]}
            radius={point.radius}
            pathOptions={{
              fillColor: getColor(point.intensity),
              fillOpacity: 0.3,
              color: getColor(point.intensity),
              weight: 1,
              opacity: 0.5,
            }}
          />
        );
      })}

      {/* Marcadores de alertas */}
      {recentAlerts.map((alert) => (
        <Marker
          key={alert.id}
          position={[alert.lat, alert.lng]}
          icon={createCustomIcon(alert.type, alert.urgency)}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-bold text-gray-900 mb-1">{alert.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{alert.timeAgo}</span>
                <Link 
                  href={`/alertas/${alert.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Ver detalhes →
                </Link>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Urgência:</span>
                  <span className={`font-semibold ${
                    alert.urgency === 'alta' ? 'text-red-600' :
                    alert.urgency === 'media' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`}>
                    {alert.urgency.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
