
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Check, FileText, Image, QrCode } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Créez vos cartes d'identité professionnelles en ligne en quelques clics.
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Une solution simple et efficace pour créer des badges personnalisés pour votre établissement.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/register">
                    <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
                      Essayer maintenant
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto max-w-sm lg:max-w-none">
                <div className="card-background rounded-xl border p-6 shadow-sm">
                  <div className="id-card p-4 mb-6 w-80 mx-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                      <div>
                        <h3 className="text-lg font-bold">John Doe</h3>
                        <p className="text-sm text-gray-500">Graphic Designer</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        <p>ID: 12345</p>
                        <p>Exp: 12/2025</p>
                      </div>
                      <div className="w-20 h-20 bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Fonctionnalités clés</h2>
              <p className="text-gray-500 mt-2">Des outils simples et efficaces pour la création de cartes professionnelles</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <FileText className="w-12 h-12 text-brand-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Création de carte</h3>
                <p className="text-gray-500">L'établissement crée des cartes pour ses membres en toute simplicité.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Image className="w-12 h-12 text-brand-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Personnalisation</h3>
                <p className="text-gray-500">Photos, logos et informations personnalisées pour chaque utilisateur.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <QrCode className="w-12 h-12 text-brand-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Export PDF</h3>
                <p className="text-gray-500">Exportation facile en PDF pour impression haute qualité et partage.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="bg-brand-600 text-white rounded-lg p-8 md:p-12 shadow-lg">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à simplifier la création de vos cartes professionnelles ?</h2>
                <p className="mb-8">Inscrivez-vous gratuitement et commencez à créer en quelques minutes.</p>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="text-primary border-white hover:bg-primary hover:text-white">
                    Commencer gratuitement
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

export default Index;
