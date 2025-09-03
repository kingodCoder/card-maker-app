
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, FileImage, Upload } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CardTemplateGallery from "@/components/CardTemplateGallery";
import CardPreview from "@/components/CardPreview";
import CSVUpload from "@/components/CSVUpload";
import { useToast } from "@/hooks/use-toast";
import { generatePDF, generatePNG, generateBulkPDFs, CardData } from "@/utils/pdfGenerator";

const CreateCard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // État pour les étapes de création
  const [currentStep, setCurrentStep] = useState("template");
  
  // État pour les informations de la carte
  const [template, setTemplate] = useState("standard");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [showQrCode, setShowQrCode] = useState(false);
  
  // État pour la génération en masse
  const [bulkCards, setBulkCards] = useState<CardData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Gestion des fichiers uploadés
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Génération de la carte PDF
  const generateCardPDF = async () => {
    if (!firstName || !lastName) {
      toast({
        title: "Erreur",
        description: "Veuillez renseigner au moins le prénom et le nom.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const cardData: CardData = {
        template,
        firstName,
        lastName,
        position,
        photo,
        logo,
        showQrCode,
      };
      
      await generatePDF(cardData);
      toast({
        title: "Carte PDF générée avec succès",
        description: "Votre carte a été téléchargée.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Génération de la carte PNG
  const generateCardPNG = async () => {
    if (!firstName || !lastName) {
      toast({
        title: "Erreur",
        description: "Veuillez renseigner au moins le prénom et le nom.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const cardData: CardData = {
        template,
        firstName,
        lastName,
        position,
        photo,
        logo,
        showQrCode,
      };
      
      await generatePNG(cardData);
      toast({
        title: "Carte PNG générée avec succès",
        description: "Votre carte a été téléchargée.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PNG.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Génération en masse
  const handleBulkGeneration = async () => {
    if (bulkCards.length === 0) {
      toast({
        title: "Erreur",
        description: "Aucune carte à générer.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      await generateBulkPDFs(bulkCards);
      toast({
        title: "Cartes générées avec succès",
        description: `${bulkCards.length} carte(s) téléchargée(s).`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer les cartes en masse.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-10">
            <h1 className="text-3xl font-bold">Création de carte</h1>
            <p className="text-gray-500 mt-1">Personnalisez votre carte d'identité professionnelle</p>
          </div>
          
          <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="template">1. Choix du modèle</TabsTrigger>
              <TabsTrigger value="personalization">2. Personnalisation</TabsTrigger>
              <TabsTrigger value="preview">3. Aperçu final</TabsTrigger>
              <TabsTrigger value="bulk">4. Génération en masse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="template" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-medium mb-4">Choisissez un modèle</h2>
                <CardTemplateGallery
                  selectedTemplate={template}
                  onSelectTemplate={setTemplate}
                />
                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={() => setCurrentStep("personalization")}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="personalization" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h2 className="text-xl font-medium mb-6">Informations personnelles</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Prénom"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Nom"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="position">Poste / Fonction</Label>
                      <Input
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder="Poste ou fonction"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="photo">Photo</Label>
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="cursor-pointer"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="logo">Logo de l'établissement</Label>
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="cursor-pointer"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="qrcode"
                        checked={showQrCode}
                        onCheckedChange={(checked) => 
                          setShowQrCode(checked as boolean)
                        }
                      />
                      <Label htmlFor="qrcode" className="cursor-pointer">
                        Ajouter un QR code
                      </Label>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep("template")}
                    >
                      Retour
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep("preview")}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Aperçu
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm border flex items-center justify-center">
                  <div id="card-preview">
                    <CardPreview
                      template={template}
                      firstName={firstName}
                      lastName={lastName}
                      position={position}
                      photo={photo}
                      logo={logo}
                      showQrCode={showQrCode}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-6">
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                  <h2 className="text-xl font-medium mb-6">Aperçu final</h2>
                  
                  <div className="max-w-sm mx-auto mb-8">
                    <div id="card-preview">
                      <CardPreview
                        template={template}
                        firstName={firstName}
                        lastName={lastName}
                        position={position}
                        photo={photo}
                        logo={logo}
                        showQrCode={showQrCode}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-center space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep("personalization")}
                    >
                      Modifier
                    </Button>
                    <Button 
                      onClick={generateCardPDF}
                      disabled={isGenerating}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isGenerating ? "Génération..." : "Télécharger PDF"}
                    </Button>
                    <Button 
                      onClick={generateCardPNG}
                      disabled={isGenerating}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      <FileImage className="h-4 w-4 mr-2" />
                      {isGenerating ? "Génération..." : "Télécharger PNG"}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bulk" className="space-y-6">
              <CSVUpload onCardsGenerated={setBulkCards} />
              
              {bulkCards.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-medium mb-4">
                    Cartes à générer ({bulkCards.length})
                  </h3>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {bulkCards.map((card, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded"
                      >
                        <span>
                          {card.firstName} {card.lastName} - {card.position}
                        </span>
                        <span className="text-sm text-gray-500 capitalize">
                          {card.template}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={handleBulkGeneration}
                      disabled={isGenerating}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {isGenerating ? "Génération..." : "Générer toutes les cartes PDF"}
                    </Button>
                  </div>
                </div>
              )}
              
              {bulkCards.length === 0 && (
                <Alert>
                  <AlertDescription>
                    Importez un fichier CSV pour générer plusieurs cartes d'un coup.
                    Téléchargez d'abord le modèle CSV pour voir le format requis.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateCard;
