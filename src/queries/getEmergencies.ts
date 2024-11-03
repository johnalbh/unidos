export const GET_EMERGENCIES = `
  query GetEmergencies {
    emergencies {
      id
      title
      description
      type
      status
      urgency_level
      latitude
      longitude
      address
      affected_people
      contact_name
      contact_phone
      created_at
    }
  }
`;
