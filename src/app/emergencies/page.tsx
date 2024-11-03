'use client';

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '../../../components/ui/alert';
import { useEmergencies } from '../../hooks/useEmergencies';

import { Loader2 } from 'lucide-react';
import EmergencyCard from '../components/EmergencyCard';

export default function EmergenciesPage() {
  const { data: emergencies, error, isLoading } = useEmergencies();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mx-auto mt-4 max-w-2xl">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">Emergencies</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {emergencies?.map((emergency) => (
          <EmergencyCard
            key={emergency.id}
            title={emergency.title}
            description={emergency.description}
            type={emergency.type}
            urgencyLevel={emergency.urgency_level}
            address={emergency.address}
            contactName={emergency.contact_name}
          />
        ))}
      </div>
    </div>
  );
}
