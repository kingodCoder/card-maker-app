
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Plus } from "lucide-react";

type Card = {
  id: string;
  name: string;
  position: string;
  createdAt: string;
  template: string;
};

const Dashboard = () => {
  // Données factices pour la démo
  const [cards, setCards] = useState<Card[]>([
    {
      id: "1",
      name: "John Doe",
      position: "Graphic Designer",
      createdAt: "2023-05-15",
      template: "standard",
    },
    {
      id: "2",
      name: "Jane Smith",
      position: "Marketing Manager",
      createdAt: "2023-05-10",
      template: "premium",
    },
  ]);

  const etablissementName = "Acme Corporation";
  const cardsCreated = cards.length;
  const cardsRemaining = 10 - cardsCreated; // Dans une version d'essai limitée à 10 cartes

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold">Tableau de bord</h1>
              <p className="text-gray-500 mt-1">Bienvenue, {etablissementName}</p>
            </div>
            <Link to="/create-card">
              <Button className="bg-brand-600 hover:bg-brand-700 mt-4 md:mt-0">
                <Plus className="w-4 h-4 mr-2" />
                Créer une nouvelle carte
              </Button>
            </Link>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Cartes créées</h3>
              <p className="text-3xl font-bold">{cardsCreated}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Cartes restantes (essai)</h3>
              <p className="text-3xl font-bold">{cardsRemaining}</p>
            </div>
            <div className="bg-brand-50 p-6 rounded-lg shadow-sm border border-brand-100">
              <h3 className="text-sm font-medium text-brand-800 mb-1">Statut</h3>
              <p className="text-lg font-medium">Essai gratuit</p>
              <Link to="/tarifs">
                <Button variant="link" className="text-brand-600 hover:text-brand-800 p-0 h-auto mt-1">
                  Passer à l'abonnement Pro
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Cards List */}
          <div>
            <h2 className="text-xl font-bold mb-6">Vos cartes</h2>
            
            {cards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                  <div key={card.id} className="id-card">
                    <div className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mb-3"></div>
                        <h3 className="font-bold">{card.name}</h3>
                        <p className="text-sm text-gray-500">{card.position}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 flex justify-between items-center border-t">
                      <span className="text-xs text-gray-500">Créée le {card.createdAt}</span>
                      <Link to={`/edit-card/${card.id}`}>
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-4">Vous n'avez pas encore créé de cartes</p>
                <Link to="/create-card">
                  <Button className="bg-brand-600 hover:bg-brand-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Créer ma première carte
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
