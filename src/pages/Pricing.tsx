
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Nos tarifs</h1>
            <p className="text-lg text-gray-500">
              Des formules adaptées à tous les besoins, de l'essai gratuit à l'usage professionnel intensif.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Gratuit */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold">Gratuit</h2>
                <p className="text-gray-500 mt-1 mb-4">Pour démarrer simplement</p>
                <p className="text-4xl font-bold mb-6">0€</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Jusqu'à 10 cartes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Personnalisation basique</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Exportation PDF</span>
                  </li>
                </ul>
                
                <Link to="/register">
                  <Button variant="outline" className="w-full">
                    Commencer gratuitement
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Plan Pro */}
            <div className="bg-brand-50 rounded-lg shadow-sm border-2 border-brand-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-brand-900">Pro</h2>
                <p className="text-brand-700 mt-1 mb-4">Pour les utilisateurs réguliers</p>
                <p className="text-4xl font-bold mb-6">19,99€ <span className="text-lg font-normal text-gray-500">/mois</span></p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Cartes illimitées</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Personnalisation avancée</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Logo et QR code</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Modèles exclusifs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Support prioritaire</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-brand-600 hover:bg-brand-700">
                  S'abonner
                </Button>
              </div>
            </div>
          </div>
          
          {/* FAQ */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Questions fréquentes</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold mb-2">Comment fonctionne la version d'essai ?</h3>
                <p className="text-gray-600">
                  La version gratuite vous permet de créer jusqu'à 10 cartes avec des fonctionnalités de base. 
                  C'est parfait pour tester le service ou pour les petites organisations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold mb-2">Puis-je passer à la version Pro plus tard ?</h3>
                <p className="text-gray-600">
                  Oui, vous pouvez passer à la version Pro à tout moment. Toutes vos cartes existantes seront conservées.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold mb-2">Est-ce que je peux annuler mon abonnement ?</h3>
                <p className="text-gray-600">
                  Oui, vous pouvez annuler votre abonnement à tout moment. Vous conserverez l'accès jusqu'à la fin de votre période de facturation.
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

export default Pricing;
