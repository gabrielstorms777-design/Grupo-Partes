import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { checklistData, ChecklistItem } from '@/lib/checklistData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Check, AlertTriangle, XCircle, LogOut } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ClientData {
  clientName: string;
  location: string;
  equipmentDetails: string;
}

interface InspectionDashboardProps {
  clientData: ClientData;
}

type Status = 'ok' | 'caution' | 'fail' | null;

interface ReportState {
  [itemId: string]: {
    checks: { [checkTitle: string]: Status };
    observation: string;
  };
}

const initialState = checklistData.reduce((acc, item) => {
  acc[item.id] = {
    checks: item.sections.flatMap(s => s.checks).reduce((checkAcc, check) => {
      checkAcc[check.title] = null;
      return checkAcc;
    }, {} as { [checkTitle: string]: Status }),
    observation: '',
  };
  return acc;
}, {} as ReportState);

export const InspectionDashboard = ({ clientData }: InspectionDashboardProps) => {
  const [reportState, setReportState] = useState<ReportState>(initialState);
  const navigate = useNavigate();

  const handleStatusChange = (itemId: string, checkTitle: string, status: Status) => {
    setReportState(prevState => ({
      ...prevState,
      [itemId]: {
        ...prevState[itemId],
        checks: {
          ...prevState[itemId].checks,
          [checkTitle]: status,
        },
      },
    }));
  };

  const handleObservationChange = (itemId: string, value: string) => {
    setReportState(prevState => ({
      ...prevState,
      [itemId]: {
        ...prevState[itemId],
        observation: value,
      },
    }));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">Reporte de Inspección</h1>
          <p className="text-gray-400">{clientData.clientName} - {clientData.location}</p>
          <p className="text-gray-400">{clientData.equipmentDetails}</p>
        </div>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
        </Button>
      </header>

      <main>
        <section id="main-image" className="mb-8 relative">
          <img
            src="https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/69077d3aebf9337d2323ac1b.png"
            alt="Equipo Generador"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {checklistData.map((item, index) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleScrollTo(item.id)}
                  className="absolute w-8 h-8 bg-green-600 rounded-full animate-pulse transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold shadow-lg hover:animate-none hover:scale-125 transition-transform border-2 border-white cursor-pointer"
                  style={{ top: item.position.top, left: item.position.left }}
                >
                  {index + 1}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </section>

        <section id="checklist">
          <Accordion type="single" collapsible className="w-full">
            {checklistData.map((item: ChecklistItem) => (
              <AccordionItem value={item.id} key={item.id} id={item.id} className="border-gray-700 scroll-mt-20">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                    <span className="text-xl font-semibold">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      {item.sections.map(section => (
                        <div key={section.title} className="mb-6 last:mb-0">
                          <h4 className="text-lg font-bold text-blue-400 mb-4">{section.title}</h4>
                          <Accordion type="multiple" className="w-full space-y-2">
                            {section.checks.map(check => (
                              <AccordionItem value={check.title} key={check.title} className="border border-gray-700 rounded-md bg-gray-900/50">
                                <AccordionTrigger className="p-3 hover:no-underline">
                                  <span className="flex-1 text-left pr-4">{check.title}</span>
                                  <ToggleGroup
                                    type="single"
                                    variant="outline"
                                    size="sm"
                                    value={reportState[item.id].checks[check.title]}
                                    onValueChange={(status) => {
                                      handleStatusChange(item.id, check.title, status as Status || null);
                                    }}
                                    onClick={(e) => e.stopPropagation()} // Evita que el acordeón se cierre al hacer clic
                                  >
                                    <ToggleGroupItem value="ok" aria-label="OK" className="px-2 data-[state=on]:bg-green-600 data-[state=on]:text-white">
                                      <Check className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="caution" aria-label="Caution" className="px-2 data-[state=on]:bg-yellow-500 data-[state=on]:text-white">
                                      <AlertTriangle className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="fail" aria-label="Fail" className="px-2 data-[state=on]:bg-red-600 data-[state=on]:text-white">
                                      <XCircle className="h-4 w-4" />
                                    </ToggleGroupItem>
                                  </ToggleGroup>
                                </AccordionTrigger>
                                <AccordionContent className="p-3 pt-0 text-gray-400">
                                  {check.description}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      ))}
                      <div className="mt-6">
                        <h4 className="text-lg font-bold text-blue-400 mb-3">Observaciones</h4>
                        <Textarea
                          placeholder="Añada notas específicas de esta sección..."
                          value={reportState[item.id].observation}
                          onChange={(e) => handleObservationChange(item.id, e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <div className="fixed bottom-8 right-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg">Guardar Reporte</Button>
        </div>
      </main>
    </div>
  );
};