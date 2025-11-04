import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ClientFormProps {
  onSubmit: (data: { clientName: string; location: string; equipmentDetails: string }) => void;
}

export const ClientForm = ({ onSubmit }: ClientFormProps) => {
  const [clientName, setClientName] = useState('');
  const [location, setLocation] = useState('');
  const [equipmentDetails, setEquipmentDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName && location && equipmentDetails) {
      onSubmit({ clientName, location, equipmentDetails });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Nuevo Reporte de Inspección</CardTitle>
          <CardDescription>Complete la información del cliente y del equipo para comenzar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="clientName">Nombre del Cliente</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localidad</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="equipmentDetails">Datos del Equipo</Label>
              <Input
                id="equipmentDetails"
                placeholder="Ej: Grupo 500kVA, N° Serie XXXXX"
                value={equipmentDetails}
                onChange={(e) => setEquipmentDetails(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Iniciar Inspección
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};