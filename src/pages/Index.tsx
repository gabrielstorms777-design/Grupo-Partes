import { useState } from 'react';
import { ClientForm } from '@/components/ClientForm';
import { InspectionDashboard } from '@/components/InspectionDashboard';

interface ClientData {
  clientName: string;
  location: string;
  equipmentDetails: string;
}

const Index = () => {
  const [clientData, setClientData] = useState<ClientData | null>(null);

  const handleClientFormSubmit = (data: ClientData) => {
    setClientData(data);
  };

  if (!clientData) {
    return <ClientForm onSubmit={handleClientFormSubmit} />;
  }

  return <InspectionDashboard clientData={clientData} />;
};

export default Index;