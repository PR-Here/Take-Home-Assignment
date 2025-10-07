export type CowSex = 'Male' | 'Female';

export type CowStatus = 'Active' | 'In Treatment' | 'Deceased';

export type EventType = 
  | 'Created'
  | 'Weight Check'
  | 'Treatment'
  | 'Pen Change'
  | 'Status Change'
  | 'Death';

export interface CowEvent {
  id: string;
  type: EventType;
  date: string; // ISO date string
  description: string;
  metadata?: {
    weight?: number;
    previousPen?: string;
    newPen?: string;
    previousStatus?: CowStatus;
    newStatus?: CowStatus;
    treatmentType?: string;
  };
}

export interface Cow {
  id: string;
  earTag: string; // Unique identifier
  sex: CowSex;
  pen: string;
  status: CowStatus;
  weight?: number;
  dailyWeightGain?: number;
  createdAt: string; // ISO date string
  lastEventDate: string; // ISO date string
  events: CowEvent[];
}

export interface CowFilters {
  searchQuery: string;
  statusFilter: CowStatus | 'All';
  penFilter: string | 'All';
}

export interface CowFormValues {
  earTag: string;
  sex: CowSex | '';
  pen: string;
  status: CowStatus;
  weight: string;
}

