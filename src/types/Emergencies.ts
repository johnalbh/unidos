export interface Emergency {
  id: string;
  title: string;
  description: string | null;
  type: 'flood' | 'fire' | 'medical' | 'supplies' | 'shelter' | 'other';
  status: 'active' | 'in_progress' | 'resolved' | 'closed';
  urgency_level: number;
  latitude: number;
  longitude: number;
  address: string | null;
  affected_people: number;
  contact_name: string;
  contact_phone: string;
  contact_email: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}
