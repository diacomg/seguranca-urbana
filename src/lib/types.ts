// Tipos do Vizinhança Segura

export type AlertType = 
  | 'assalto' 
  | 'suspeito' 
  | 'tiroteio' 
  | 'barulho' 
  | 'clima' 
  | 'transito' 
  | 'incendio';

export type RiskLevel = 'baixo' | 'medio' | 'alto' | 'critico';

export type UrgencyLevel = 'baixa' | 'media' | 'alta';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    neighborhood: string;
  };
  lat: number;
  lng: number;
  urgency: UrgencyLevel;
  timestamp: Date;
  photo?: string;
  confirmations: number;
  distance?: string;
  timeAgo?: string;
}

export interface Neighborhood {
  name: string;
  riskScore: number;
  riskLevel: RiskLevel;
  recentAlerts: number;
  population: number;
  safetyTrend: 'up' | 'down' | 'stable';
}

export interface Weather {
  temp: number;
  condition: string;
  icon: string;
  high: number;
  low: number;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
  radius: number;
  alerts: Alert[];
}

export interface News {
  id: string;
  title: string;
  neighborhood: string;
  category: string;
  summary: string;
  image: string;
  timestamp: Date;
  timeAgo: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href: string;
  color: string;
}
