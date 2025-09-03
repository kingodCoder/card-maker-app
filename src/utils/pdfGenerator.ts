import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface CardData {
  template: string;
  firstName: string;
  lastName: string;
  position: string;
  photo: string | null;
  logo: string | null;
  showQrCode: boolean;
}

export const generatePDF = async (cardData: CardData): Promise<void> => {
  const cardElement = document.getElementById('card-preview');
  if (!cardElement) {
    throw new Error('Card preview element not found');
  }

  try {
    const canvas = await html2canvas(cardElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [85.6, 53.98] // Format carte de crédit standard
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 53.98);
    pdf.save(`carte-${cardData.firstName}-${cardData.lastName}.pdf`);
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    throw new Error('Erreur lors de la génération du PDF');
  }
};

export const generatePNG = async (cardData: CardData): Promise<void> => {
  const cardElement = document.getElementById('card-preview');
  if (!cardElement) {
    throw new Error('Card preview element not found');
  }

  try {
    const canvas = await html2canvas(cardElement, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Convertir en blob et télécharger
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `carte-${cardData.firstName}-${cardData.lastName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, 'image/png', 1.0);
  } catch (error) {
    console.error('Erreur lors de la génération du PNG:', error);
    throw new Error('Erreur lors de la génération du PNG');
  }
};

export const generateBulkPDFs = async (cardsData: CardData[]): Promise<void> => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [85.6, 53.98]
  });

  for (let i = 0; i < cardsData.length; i++) {
    const cardData = cardsData[i];
    
    // Simuler la mise à jour de l'aperçu de la carte
    // Note: En production, vous pourriez avoir besoin d'une méthode différente
    // pour générer les cartes individuellement
    
    if (i > 0) {
      pdf.addPage();
    }
    
    // Ici, vous ajouteriez le contenu de chaque carte
    // Pour l'instant, on ajoute juste le texte
    pdf.text(`${cardData.firstName} ${cardData.lastName}`, 10, 20);
    pdf.text(cardData.position, 10, 30);
  }

  pdf.save('cartes-bulk.pdf');
};