
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, Image, QrCode, UserCircle, Download, Printer } from "lucide-react";

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">Fonctionnalités</h1>
              <p className="text-lg text-gray-500 mb-8">
                Découvrez comment Carte Pro Studio peut vous aider à créer des cartes d'identité professionnelles de qualité.
              </p>
            </div>
          </div>
        </section>
        
        {/* Features Grid */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <UserCircle className="h-12 w-12 text-brand-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Personnalisation complète</h3>
                <p className="text-gray-600 mb-4">
                  Personnalisez chaque aspect de vos cartes : noms, photos, logos, postes, et bien plus encore.
                </p>
                <ul className="space-y-2 text-gray-500">
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">•</span>
                    <span>Photos des employés</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">•</span>
                    <span>Logo de l'établissement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">•</span>
                    <span>Informations personnalisées</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <FileText className="h-12 w-12 text-brand-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Modèles professionnels</h3>
                <p className="text-gray-600 mb-4">
                  Choisissez parmi une variété de modèles élégants et professionnels pour vos cartes.
                </p>
                <ul className="space-y-2 text-gray-500">
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">•</span>
                    <span>Designs modernes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">•</span>
                    <span>Adapté à tout type d'établissement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">•</span>
                    <span>Mise en page optimisée</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <QrCode className="h-12 w-12 text-brand-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">QR Codes intégrés</h3>
                <p className="text-gray-600 mb-4">
                  Ajoutez des QR codes pour accéder rapidement aux informations importantes ou vérifier l'authenticité.
                </p>
                <ul className="space-y-2 text-gray-500">
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">•</span>
                    <span>Vérification d'identité</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">•</span>
                    <span>Accès aux informations supplémentaires</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">•</span>
                    <span>Sécurité renforcée</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Download className="h-12 w-12 text-brand-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Export PDF haute qualité</h3>
                <p className="text-gray-600 mb-4">
                  Exportez vos cartes en PDF haute résolution, prêtes pour l'impression professionnelle.
                </p>
                <ul className="space-y-2 text-gray-500">
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">•</span>
                    <span>Format d'impression optimisé</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">•</span>
                    <span>Haute résolution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">•</span>
                    <span>Archivage numérique</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Prêt à essayer ?</h2>
              <p className="text-lg text-gray-500 mb-8">
                Commencez gratuitement et créez vos premières cartes d'identité professionnelles en quelques minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
                    Commencer gratuitement
                  </Button>
                </Link>
                <Link to="/tarifs">
                  <Button size="lg" variant="outline">
                    Voir les tarifs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
