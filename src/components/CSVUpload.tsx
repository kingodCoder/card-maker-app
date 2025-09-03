import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Download, FileText } from 'lucide-react';
import Papa from 'papaparse';
import { CardData } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';

interface CSVUploadProps {
  onCardsGenerated: (cards: CardData[]) => void;
}

const CSVUpload: React.FC<CSVUploadProps> = ({ onCardsGenerated }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const downloadTemplate = () => {
    const csvContent = 'firstName,lastName,position,template\nJohn,Doe,Développeur,standard\nJane,Smith,Designer,premium\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template-cartes.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const cards: CardData[] = results.data.map((row: any) => ({
            firstName: row.firstName || '',
            lastName: row.lastName || '',
            position: row.position || '',
            template: row.template || 'standard',
            photo: null,
            logo: null,
            showQrCode: false
          }));

          if (cards.length === 0) {
            throw new Error('Aucune donnée valide trouvée dans le fichier CSV');
          }

          onCardsGenerated(cards);
          toast({
            title: 'CSV traité avec succès',
            description: `${cards.length} carte(s) préparée(s) pour génération`,
          });
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Erreur lors du traitement du fichier');
        } finally {
          setIsUploading(false);
        }
      },
      error: (error) => {
        setError(`Erreur de lecture du fichier: ${error.message}`);
        setIsUploading(false);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Génération en masse via CSV
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={downloadTemplate}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Télécharger le modèle CSV
            </Button>
            <span className="text-sm text-gray-500">
              Utilisez ce modèle pour préparer vos données
            </span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="csv-upload">Importer un fichier CSV</Label>
            <Input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="cursor-pointer"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isUploading && (
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>Traitement du fichier CSV en cours...</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSVUpload;