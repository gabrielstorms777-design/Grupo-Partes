import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Home } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';

interface Report {
  id: string;
  created_at: string;
  client_name: string;
  equipment_details: string;
}

const ReportsPage = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('reports')
        .select('id, created_at, client_name, equipment_details')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        showError('No se pudieron cargar los reportes.');
        console.error(error);
      } else {
        setReports(data);
      }
      setLoading(false);
    };

    fetchReports();
  }, [user]);

  const handleDelete = async () => {
    if (!reportToDelete) return;

    const { error } = await supabase
      .from('reports')
      .delete()
      .match({ id: reportToDelete.id });

    if (error) {
      showError('Error al eliminar el reporte.');
    } else {
      setReports(reports.filter(r => r.id !== reportToDelete.id));
      showSuccess('Reporte eliminado correctamente.');
    }
    setReportToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Reportes Guardados</h1>
        <Button asChild variant="outline">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" /> Volver al Inicio
          </Link>
        </Button>
      </header>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400">No hay reportes guardados todavía.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map(report => (
            <Card key={report.id} className="bg-gray-800 border-gray-700 flex flex-col justify-between">
              <CardHeader>
                <CardTitle>{report.client_name}</CardTitle>
                <CardDescription>{new Date(report.created_at).toLocaleDateString('es-ES')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">{report.equipment_details}</p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" onClick={() => setReportToDelete(report)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!reportToDelete} onOpenChange={() => setReportToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el reporte de
              <span className="font-bold"> {reportToDelete?.client_name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReportsPage;