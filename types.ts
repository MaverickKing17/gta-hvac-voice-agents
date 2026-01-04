
export interface AudioState {
  isPlaying: boolean;
  isListening: boolean;
  volume: number;
}

export interface LeadDetails {
  name: string;
  phone: string;
  address?: string;
  type: 'emergency' | 'rebate' | 'general';
  heatingSource?: 'gas' | 'oil' | 'electric';
  agentPersona: 'sarah' | 'marcus';
  marketType: 'residential' | 'commercial';
  status: 'collecting' | 'complete';
}

export interface ServiceMetric {
  name: string;
  value: number;
  unit: string;
}

export interface Message {
  id: string;
  role: 'user' | 'agent' | 'system';
  agentName?: string;
  text: string;
  timestamp: Date;
  isPartial?: boolean;
}
