'use client';

import { useQuery } from '@tanstack/react-query';
import { nhost } from '../lib/nhostClient';
import { GET_EMERGENCIES } from '../queries/getEmergencies';
import { Emergency } from '../types/Emergencies';

interface EmergenciesResponse {
  emergencies: Emergency[];
}

export function useEmergencies() {
  return useQuery<Emergency[], Error>({
    queryKey: ['emergencies'],
    queryFn: async () => {
      try {
        const { data, error } =
          await nhost.graphql.request<EmergenciesResponse>(GET_EMERGENCIES);

        if (error) {
          console.error('GraphQL Error:', error);
          throw new Error(
            Array.isArray(error)
              ? error.map((e) => e.message).join(', ')
              : error.message
          );
        }

        if (!data?.emergencies) {
          throw new Error('No data received from server');
        }

        return data.emergencies;
      } catch (error) {
        console.error('Query execution error:', error);
        throw error instanceof Error
          ? error
          : new Error('Failed to fetch emergencies');
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
