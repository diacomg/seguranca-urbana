import { Alert, Neighborhood, Weather, News, HeatmapPoint } from './types';

// Dados simulados do bairro atual
export const currentNeighborhood: Neighborhood = {
  name: 'Pinheiros',
  riskScore: 6.8,
  riskLevel: 'medio',
  recentAlerts: 12,
  population: 65000,
  safetyTrend: 'stable'
};

// Clima atual
export const currentWeather: Weather = {
  temp: 24,
  condition: 'Parcialmente nublado',
  icon: 'cloud',
  high: 28,
  low: 19
};

// Alertas recentes
export const recentAlerts: Alert[] = [
  {
    id: '1',
    type: 'assalto',
    title: 'Assalto à mão armada',
    description: 'Dois indivíduos em moto abordaram pedestre na esquina',
    location: {
      lat: -23.5629,
      lng: -46.6728,
      address: 'Rua dos Pinheiros, 450',
      neighborhood: 'Pinheiros'
    },
    lat: -23.5629,
    lng: -46.6728,
    urgency: 'alta',
    timestamp: new Date(Date.now() - 15 * 60000),
    confirmations: 8,
    distance: '180m',
    timeAgo: '15 min atrás'
  },
  {
    id: '2',
    type: 'suspeito',
    title: 'Movimento suspeito',
    description: 'Grupo observando carros estacionados',
    location: {
      lat: -23.5635,
      lng: -46.6735,
      address: 'Av. Faria Lima, 1200',
      neighborhood: 'Pinheiros'
    },
    lat: -23.5635,
    lng: -46.6735,
    urgency: 'media',
    timestamp: new Date(Date.now() - 32 * 60000),
    confirmations: 3,
    distance: '320m',
    timeAgo: '32 min atrás'
  },
  {
    id: '3',
    type: 'transito',
    title: 'Trânsito intenso',
    description: 'Acidente bloqueando faixa da esquerda',
    location: {
      lat: -23.5642,
      lng: -46.6715,
      address: 'Av. Rebouças, 3000',
      neighborhood: 'Pinheiros'
    },
    lat: -23.5642,
    lng: -46.6715,
    urgency: 'baixa',
    timestamp: new Date(Date.now() - 45 * 60000),
    confirmations: 12,
    distance: '550m',
    timeAgo: '45 min atrás'
  },
  {
    id: '4',
    type: 'tiroteio',
    title: 'Disparos ouvidos',
    description: 'Moradores relatam sons de tiros',
    location: {
      lat: -23.5620,
      lng: -46.6740,
      address: 'Rua Teodoro Sampaio, 800',
      neighborhood: 'Pinheiros'
    },
    lat: -23.5620,
    lng: -46.6740,
    urgency: 'alta',
    timestamp: new Date(Date.now() - 90 * 60000),
    confirmations: 15,
    distance: '1.2km',
    timeAgo: '1h 30min atrás'
  }
];

// Pontos do heatmap
export const heatmapPoints: HeatmapPoint[] = [
  {
    lat: -23.5629,
    lng: -46.6728,
    intensity: 0.9,
    radius: 200,
    alerts: [recentAlerts[0]]
  },
  {
    lat: -23.5635,
    lng: -46.6735,
    intensity: 0.6,
    radius: 150,
    alerts: [recentAlerts[1]]
  },
  {
    lat: -23.5642,
    lng: -46.6715,
    intensity: 0.3,
    radius: 100,
    alerts: [recentAlerts[2]]
  },
  {
    lat: -23.5620,
    lng: -46.6740,
    intensity: 0.8,
    radius: 180,
    alerts: [recentAlerts[3]]
  }
];

// Notícias da cidade
export const cityNews: News[] = [
  {
    id: '1',
    title: 'PM reforça policiamento em Pinheiros após série de assaltos',
    neighborhood: 'Pinheiros',
    category: 'Segurança',
    summary: 'Comando da Polícia Militar anunciou aumento do efetivo na região após registros de assaltos. Patrulhamento será intensificado nos horários de pico.',
    image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=400&h=250&fit=crop',
    timestamp: new Date(Date.now() - 2 * 3600000),
    timeAgo: '2h atrás'
  },
  {
    id: '2',
    title: 'Operação da GCM prende suspeitos na Vila Madalena',
    neighborhood: 'Vila Madalena',
    category: 'Operação',
    summary: 'Guarda Civil Metropolitana realizou operação que resultou na prisão de três suspeitos de furtos na região. Material roubado foi recuperado.',
    image: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400&h=250&fit=crop',
    timestamp: new Date(Date.now() - 5 * 3600000),
    timeAgo: '5h atrás'
  },
  {
    id: '3',
    title: 'Moradores relatam aumento de furtos em estacionamentos',
    neighborhood: 'Jardins',
    category: 'Alerta',
    summary: 'Associação de moradores dos Jardins alerta para aumento de casos de furtos em estacionamentos. Polícia orienta sobre medidas preventivas.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&h=250&fit=crop',
    timestamp: new Date(Date.now() - 8 * 3600000),
    timeAgo: '8h atrás'
  }
];

// Ações rápidas
export const quickActions = [
  { id: 'mapa', label: 'Mapa', icon: 'Map', href: '/mapa', color: 'from-blue-500 to-blue-600' },
  { id: 'viagem', label: 'Viagem', icon: 'Navigation', href: '/viagem', color: 'from-purple-500 to-purple-600' },
  { id: 'comunidade', label: 'Comunidade', icon: 'Users', href: '/comunidade', color: 'from-green-500 to-green-600' },
  { id: 'buscar', label: 'Buscar', icon: 'Search', href: '/buscar', color: 'from-orange-500 to-orange-600' }
];

// Tipos de alerta para envio rápido
export const alertTypes = [
  { type: 'assalto', label: 'Assalto', icon: 'ShieldAlert', color: 'bg-red-500' },
  { type: 'suspeito', label: 'Suspeito', icon: 'Eye', color: 'bg-orange-500' },
  { type: 'tiroteio', label: 'Tiroteio', icon: 'AlertTriangle', color: 'bg-red-600' },
  { type: 'barulho', label: 'Barulho', icon: 'Volume2', color: 'bg-yellow-500' },
  { type: 'clima', label: 'Clima', icon: 'CloudRain', color: 'bg-blue-500' },
  { type: 'transito', label: 'Trânsito', icon: 'Car', color: 'bg-gray-500' },
  { type: 'incendio', label: 'Incêndio', icon: 'Flame', color: 'bg-orange-600' }
];
