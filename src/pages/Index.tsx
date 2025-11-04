import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Energen</h1>
        <p className="text-xl text-gray-600 mb-6">
          Sesión iniciada como: {user?.email}
        </p>
        <Button onClick={handleLogout}>Cerrar Sesión</Button>
      </div>
    </div>
  );
};

export default Index;