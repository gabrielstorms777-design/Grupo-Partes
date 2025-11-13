import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { checklistData, ChecklistItem } from '@/lib/checklistData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertTriangle, XCircle, LogOut, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import jsPDF from 'jspdf';
import { showError, showSuccess } from '@/utils/toast';

interface ClientData {
  clientName: string;
  location: string;
  equipmentDetails: string;
}

interface InspectionDashboardProps {
  clientData: ClientData;
}

type Status = 'ok' | 'caution' | 'fail' | null;

interface CheckState {
  controlled: boolean;
  status: Status;
}

interface ReportState {
  [itemId: string]: {
    checks: { [checkTitle: string]: CheckState };
    observation: string;
  };
}

interface DiagnosticNotes {
  fallas: string;
  causas: string;
  recomendaciones: string;
  soluciones: string;
}

const initialState = checklistData.reduce((acc, item) => {
  if (!['diagnostico', 'insumos'].includes(item.id)) {
    acc[item.id] = {
      checks: item.sections.flatMap(s => s.checks).reduce((checkAcc, check) => {
        checkAcc[check.title] = { controlled: false, status: null };
        return checkAcc;
      }, {} as { [checkTitle: string]: CheckState }),
      observation: '',
    };
  }
  return acc;
}, {} as ReportState);

const getImageBase64 = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const InspectionDashboard = ({ clientData }: InspectionDashboardProps) => {
  const [reportState, setReportState] = useState<ReportState>(initialState);
  const [diagnosticNotes, setDiagnosticNotes] = useState<DiagnosticNotes>({
    fallas: '',
    causas: '',
    recomendaciones: '',
    soluciones: '',
  });
  const [supplies, setSupplies] = useState<string[]>(['']);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleControlledChange = (itemId: string, checkTitle: string, controlled: boolean) => {
    setReportState(prevState => ({
      ...prevState,
      [itemId]: {
        ...prevState[itemId],
        checks: {
          ...prevState[itemId].checks,
          [checkTitle]: {
            ...prevState[itemId].checks[checkTitle],
            controlled,
            // Reset status if uncontrolled
            status: controlled ? prevState[itemId].checks[checkTitle].status : null,
          },
        },
      },
    }));
  };

  const handleStatusChange = (itemId: string, checkTitle: string, status: Status) => {
    setReportState(prevState => ({
      ...prevState,
      [itemId]: {
        ...prevState[itemId],
        checks: {
          ...prevState[itemId].checks,
          [checkTitle]: {
            ...prevState[itemId].checks[checkTitle],
            status,
          },
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

  const handleDiagnosticChange = (field: keyof DiagnosticNotes, value: string) => {
    setDiagnosticNotes(prev => ({ ...prev, [field]: value }));
  };

  const handleSupplyChange = (index: number, value: string) => {
    const newSupplies = [...supplies];
    newSupplies[index] = value;
    setSupplies(newSupplies);
  };

  const addSupply = () => setSupplies([...supplies, '']);
  const removeSupply = (index: number) => {
    if (supplies.length > 1) {
      setSupplies(supplies.filter((_, i) => i !== index));
    }
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

  const handleFinalizeReport = async () => {
    setIsProcessing(true);
    try {
      await generatePdf();
      showSuccess('PDF generado exitosamente.');
    } catch (pdfError) {
      console.error("Error al generar el PDF:", pdfError);
      showError("Hubo un error al generar el PDF.");
    }
    setIsProcessing(false);
  };

  const generatePdf = async () => {
    const doc = new jsPDF();
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    try {
      const logoUrl = 'https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/690661473081bc838e4020d0.png';
      const logoBase64 = await getImageBase64(logoUrl);
      doc.addImage(logoBase64, 'PNG', margin, 10, 40, 15);
    } catch (error) {
      console.error("Error loading logo for PDF:", error);
    }

    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('Reporte de Inspección Técnica', pageWidth / 2, 20, { align: 'center' });
    
    y += 20;
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Cliente:', margin, y);
    doc.setFont(undefined, 'normal');
    doc.text(clientData.clientName, margin + 25, y);

    doc.setFont(undefined, 'bold');
    doc.text('Fecha:', pageWidth - margin - 35, y);
    doc.setFont(undefined, 'normal');
    doc.text(new Date().toLocaleDateString('es-ES'), pageWidth - margin, y, { align: 'right' });

    y += 7;
    doc.setFont(undefined, 'bold');
    doc.text('Localidad:', margin, y);
    doc.setFont(undefined, 'normal');
    doc.text(clientData.location, margin + 25, y);
    y += 7;
    doc.setFont(undefined, 'bold');
    doc.text('Equipo:', margin, y);
    doc.setFont(undefined, 'normal');
    doc.text(clientData.equipmentDetails, margin + 25, y);
    y += 10;
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
    };

    const statusMap: { [key in NonNullable<Status>]: { text: string; color: [number, number, number] } } = {
      ok: { text: 'OK', color: [0, 128, 0] },
      caution: { text: 'PRECAUCIÓN', color: [255, 165, 0] },
      fail: { text: 'FALLO', color: [255, 0, 0] },
    };

    for (const item of checklistData) {
      if (['diagnostico', 'insumos'].includes(item.id)) continue;

      checkPageBreak(15);
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(item.title, margin, y);
      y += 8;

      for (const section of item.sections) {
        checkPageBreak(10);
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(60, 60, 60);
        doc.text(section.title, margin + 5, y);
        y += 6;
        doc.setTextColor(0, 0, 0);

        for (const check of section.checks) {
          const checkState = reportState[item.id].checks[check.title];
          if (checkState.controlled) {
            const status = checkState.status;
            const statusInfo = status ? statusMap[status] : { text: 'CONTROLADO', color: [128, 128, 128] };
            const statusText = `[${statusInfo.text}]`;
            const statusColWidth = 45;
            const titleX = margin + statusColWidth;
            const titleMaxWidth = pageWidth - titleX - margin;
            
            const splitTitle = doc.splitTextToSize(check.title, titleMaxWidth);
            const neededHeight = (splitTitle.length * 5) + 2;
            checkPageBreak(neededHeight);

            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(statusInfo.color[0], statusInfo.color[1], statusInfo.color[2]);
            doc.text(statusText, margin + 10, y);
            
            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, 'normal');
            doc.text(splitTitle, titleX, y);
            y += neededHeight;
          }
        }
      }

      const observation = reportState[item.id].observation;
      if (observation.trim()) {
        checkPageBreak(15);
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text('Observaciones:', margin + 5, y);
        y += 6;
        doc.setFont(undefined, 'normal');
        const splitObservation = doc.splitTextToSize(observation, pageWidth - margin * 2 - 15);
        doc.text(splitObservation, margin + 10, y);
        y += (splitObservation.length * 5) + 5;
      }
      y += 5;
    }

    const writeTextAreaContent = (title: string, content: string) => {
      if (content.trim()) {
        checkPageBreak(20);
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(title, margin, y);
        y += 7;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        const splitContent = doc.splitTextToSize(content, pageWidth - margin * 2);
        doc.text(splitContent, margin, y);
        y += (splitContent.length * 5) + 5;
      }
    };

    checkPageBreak(20);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('11. Diagnóstico y Recomendaciones', margin, y);
    y += 10;
    writeTextAreaContent('Fallas Detectadas:', diagnosticNotes.fallas);
    writeTextAreaContent('Causas de la Falla:', diagnosticNotes.causas);
    writeTextAreaContent('Recomendaciones:', diagnosticNotes.recomendaciones);
    writeTextAreaContent('Soluciones Aplicadas:', diagnosticNotes.soluciones);

    const filteredSupplies = supplies.filter(s => s.trim() !== '');
    if (filteredSupplies.length > 0) {
      checkPageBreak(20);
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('12. Insumos Utilizados', margin, y);
      y += 10;
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      filteredSupplies.forEach(supply => {
        checkPageBreak(7);
        doc.text(`- ${supply}`, margin, y);
        y += 7;
      });
    }

    doc.save(`Reporte_${clientData.clientName.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Reporte de Inspección</h1>
        </div>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
        </Button>
      </header>

      <Card className="mb-8 bg-gray-800 border-gray-700">
        <CardHeader>
            <CardTitle>Información del Cliente y Equipo</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
                <p className="text-gray-400 font-semibold">Cliente</p>
                <p>{clientData.clientName}</p>
            </div>
            <div>
                <p className="text-gray-400 font-semibold">Localidad</p>
                <p>{clientData.location}</p>
            </div>
            <div>
                <p className="text-gray-400 font-semibold">Equipo</p>
                <p>{clientData.equipmentDetails}</p>
            </div>
        </CardContent>
      </Card>

      <main>
        <section id="main-image" className="mb-8 relative">
          <img
            src="https://storage.googleapis.com/msgsndr/W7R1X8YOEgKpF0ad1L2W/media/69077d3aebf9337d2323ac1b.png"
            alt="Equipo Generador"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {checklistData.map((item, index) => (
            !['diagnostico', 'insumos'].includes(item.id) && (
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
            )
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
                      {item.id === 'diagnostico' ? (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-bold text-blue-400 mb-3">Fallas Detectadas</h4>
                            <Textarea placeholder="Describa las fallas encontradas..." value={diagnosticNotes.fallas} onChange={(e) => handleDiagnosticChange('fallas', e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-blue-400 mb-3">Causas de la Falla</h4>
                            <Textarea placeholder="Describa las posibles causas..." value={diagnosticNotes.causas} onChange={(e) => handleDiagnosticChange('causas', e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-blue-400 mb-3">Recomendaciones</h4>
                            <Textarea placeholder="Describa las recomendaciones..." value={diagnosticNotes.recomendaciones} onChange={(e) => handleDiagnosticChange('recomendaciones', e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-blue-400 mb-3">Soluciones Aplicadas</h4>
                            <Textarea placeholder="Describa las soluciones realizadas..." value={diagnosticNotes.soluciones} onChange={(e) => handleDiagnosticChange('soluciones', e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                          </div>
                        </div>
                      ) : item.id === 'insumos' ? (
                        <div className="space-y-4">
                          {supplies.map((supply, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Input placeholder="Ej: Filtro de aceite, 10L de refrigerante..." value={supply} onChange={(e) => handleSupplyChange(index, e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                              <Button variant="ghost" size="icon" onClick={() => removeSupply(index)} disabled={supplies.length <= 1}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                          <Button onClick={addSupply} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                            <PlusCircle className="mr-2 h-4 w-4" /> Agregar Insumo
                          </Button>
                        </div>
                      ) : (
                        <>
                          {item.sections.map(section => (
                            <div key={section.title} className="mb-6 last:mb-0">
                              <h4 className="text-lg font-bold text-blue-400 mb-4">{section.title}</h4>
                              <Accordion type="multiple" className="w-full space-y-2">
                                {section.checks.map(check => (
                                  <AccordionItem value={check.title} key={check.title} className="border border-gray-700 rounded-md bg-gray-900/50">
                                    <AccordionTrigger className="p-3 hover:no-underline">
                                      <span className="flex-1 text-left pr-4">{check.title}</span>
                                      <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center gap-2">
                                          <Checkbox id={`controlled-${item.id}-${check.title}`} checked={reportState[item.id].checks[check.title].controlled} onCheckedChange={(checked) => handleControlledChange(item.id, check.title, !!checked)} />
                                          <label htmlFor={`controlled-${item.id}-${check.title}`} className="text-sm font-medium text-gray-400">Controlado</label>
                                        </div>
                                        <ToggleGroup type="single" variant="outline" size="sm" disabled={!reportState[item.id].checks[check.title].controlled} value={reportState[item.id].checks[check.title].status} onValueChange={(status) => handleStatusChange(item.id, check.title, status as Status || null)}>
                                          <ToggleGroupItem value="ok" aria-label="OK" className="px-2 data-[state=on]:bg-green-600 data-[state=on]:text-white"><Check className="h-4 w-4" /></ToggleGroupItem>
                                          <ToggleGroupItem value="caution" aria-label="Caution" className="px-2 data-[state=on]:bg-yellow-500 data-[state=on]:text-white"><AlertTriangle className="h-4 w-4" /></ToggleGroupItem>
                                          <ToggleGroupItem value="fail" aria-label="Fail" className="px-2 data-[state=on]:bg-red-600 data-[state=on]:text-white"><XCircle className="h-4 w-4" /></ToggleGroupItem>
                                        </ToggleGroup>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="p-3 pt-0 text-gray-400">{check.description}</AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </div>
                          ))}
                          <div className="mt-6">
                            <h4 className="text-lg font-bold text-blue-400 mb-3">Observaciones</h4>
                            <Textarea placeholder="Añada notas específicas de esta sección..." value={reportState[item.id].observation} onChange={(e) => handleObservationChange(item.id, e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <div className="fixed bottom-8 right-8">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 shadow-lg"
              onClick={handleFinalizeReport}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                'Generar Informe'
              )}
            </Button>
        </div>
      </main>
    </div>
  );
};