
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Download, Printer, ArrowLeft } from "lucide-react";

const PreviewCard = () => {
  // Dans une vraie application, ces données viendraient de l'état global ou d'une base de données
  const cardData = {
    firstName: "John",
    lastName: "Doe",
    position: "Graphic Designer",
    template: "premium"
  };
  
  const handleDownload = () => {
    // Ici, on simulerait le téléchargement du PDF généré
    alert("Téléchargement du PDF en cours...");
  };
  
  const handlePrint = () => {
    // Fonction d'impression
    window.print();
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-10">
            <h1 className="text-3xl font-bold">Prévisualisation de la carte</h1>
            <p className="text-gray-500 mt-1">Votre carte est prête à être téléchargée ou imprimée</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              {/* Simulation de la carte générée */}
              <div className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-lg shadow-lg overflow-hidden mx-auto max-w-xs border border-brand-200 print:shadow-none">
                <div className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-white mx-auto mb-4 border-4 border-brand-200 flex items-center justify-center">
                    <span className="text-gray-400">Photo</span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-900">
                    {cardData.firstName} {cardData.lastName}
                  </h3>
                  <p className="text-brand-700">{cardData.position}</p>
                  
                  <div className="mt-4 mx-auto h-24 w-24 bg-white rounded-md p-2 flex items-center justify-center shadow-sm">
                    <svg viewBox="0 0 100 100" className="h-16 w-16 text-brand-600">
                      <path fill="currentColor" d="M30,30 L30,70 L70,70 L70,30 L30,30 Z M25,25 L75,25 L75,75 L25,75 L25,25 Z M35,35 L35,45 L45,45 L45,35 L35,35 Z M55,35 L55,45 L65,45 L65,35 L55,35 Z M35,55 L35,65 L45,65 L45,55 L35,55 Z M55,55 L55,65 L65,65 L65,55 L55,55 Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-white p-4 flex justify-center items-center border-t">
                  <div className="h-8 w-24 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Logo</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-medium mb-4">Actions</h2>
                <div className="space-y-4">
                  <Button 
                    onClick={handleDownload} 
                    className="w-full flex items-center justify-center bg-brand-600 hover:bg-brand-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger le PDF
                  </Button>
                  <Button 
                    onClick={handlePrint} 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer
                  </Button>
                  <Link to="/create-card">
                    <Button 
                      variant="link" 
                      className="w-full flex items-center justify-center"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Revenir à l'édition
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
                <h3 className="font-medium mb-2">Informations</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Cette carte peut être imprimée sur un papier cartonné de format standard. 
                  Pour un résultat professionnel, nous recommandons un grammage de 250-300g/m².
                </p>
                <p className="text-sm text-gray-500">
                  Besoin de plus de cartes ? 
                  <Link to="/tarifs" className="text-brand-600 hover:underline ml-1">
                    Découvrez nos formules d'abonnement
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PreviewCard;
