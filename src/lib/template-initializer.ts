// src/lib/template-initializer.ts
import { fabric } from 'fabric';
import { countTemplates, saveTemplate } from './db';

/**
 * Représente la structure d'un modèle de carte pour l'initialisation.
 */
interface ICardTemplate {
  id: string;
  name: string;
  fabricData: () => fabric.Object[]; // Fonction qui génère les objets Fabric
  backgroundColor: string;
}

// Définition des modèles de base
const baseTemplates: ICardTemplate[] = [
  {
    id: 'standard',
    name: 'Standard',
    backgroundColor: '#ffffff',
    fabricData: () => [
      new fabric.Textbox('Prénom Nom', { left: 20, top: 20, fontSize: 24, fontWeight: 'bold' }),
      new fabric.Textbox('Poste / Fonction', { left: 20, top: 50, fontSize: 18, fill: '#555' }),
      new fabric.Rect({ left: 450, top: 20, width: 100, height: 120, fill: '#e0e0e0' }), // Placeholder Photo
      new fabric.Rect({ left: 20, top: 280, width: 120, height: 50, fill: '#e0e0e0' }), // Placeholder Logo
      new fabric.Rect({ left: 450, top: 250, width: 80, height: 80, fill: '#e0e0e0' }), // Placeholder QR
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    backgroundColor: '#f0f8ff',
    fabricData: () => [
        new fabric.Textbox('Prénom Nom', { left: 150, top: 150, fontSize: 28, fontWeight: 'bold', fill: '#1a202c', width: 300, textAlign: 'center' }),
        new fabric.Textbox('Poste / Fonction', { left: 150, top: 190, fontSize: 20, fill: '#4a5568', width: 300, textAlign: 'center' }),
        new fabric.Circle({ left: 250, top: 30, radius: 50, fill: '#ffffff', stroke: '#e2e8f0', strokeWidth: 4 }), // Placeholder Photo
        new fabric.Rect({ left: 240, top: 280, width: 120, height: 50, fill: '#e0e0e0' }), // Placeholder Logo
    ],
  },
  {
    id: 'minimal',
    name: 'Minimaliste',
    backgroundColor: '#f9f9f9',
    fabricData: () => [
        new fabric.Textbox('Prénom Nom', { left: 140, top: 150, fontSize: 26, fontWeight: 'bold' }),
        new fabric.Textbox('Poste / Fonction', { left: 140, top: 185, fontSize: 18, fill: '#555' }),
        new fabric.Circle({ left: 30, top: 130, radius: 40, fill: '#e0e0e0' }), // Placeholder Photo
    ],
  },
  {
    id: 'modern',
    name: 'Moderne',
    backgroundColor: '#1d4ed8',
    fabricData: () => [
        new fabric.Textbox('Prénom', { left: 150, top: 100, fontSize: 22, fill: '#ffffff' }),
        new fabric.Textbox('Nom & Postnom', { left: 150, top: 130, fontSize: 22, fill: '#ffffff' }),
        new fabric.Textbox('Classe : 6ème A', { left: 150, top: 180, fontSize: 18, fill: '#ffffff' }),
        new fabric.Rect({ left: 450, top: 80, width: 100, height: 120, fill: '#ffffff' }), // Placeholder Photo
        new fabric.Rect({ left: 20, top: 80, width: 100, height: 100, fill: '#ffffff' }), // Placeholder QR
        new fabric.Rect({ top: 0, left: 0, width: 200, height: 10, fill: '#3b82f6' }),
        new fabric.Rect({ top: 0, left: 200, width: 200, height: 10, fill: '#f59e0b' }),
        new fabric.Rect({ top: 0, left: 400, width: 200, height: 10, fill: '#ef4444' }),
    ],
  },
];

/**
 * Initialise la base de données avec les modèles par défaut si elle est vide.
 */
export const initializeDefaultTemplates = async () => {
  try {
    const count = await countTemplates();
    if (count === 0) {
      console.log('Base de données vide, initialisation des modèles par défaut...');
      
      // Crée un canvas temporaire pour générer le JSON
      const tempCanvas = new fabric.Canvas(null);

      for (const template of baseTemplates) {
        tempCanvas.clear();
        tempCanvas.backgroundColor = template.backgroundColor;
        const objects = template.fabricData();
        objects.forEach(obj => tempCanvas.add(obj));
        
        const json = tempCanvas.toJSON();
        await saveTemplate(template.id, { name: template.name, fabricJSON: json });
      }
      
      tempCanvas.dispose();
      console.log(`${baseTemplates.length} modèles par défaut ont été sauvegardés.`);
    } else {
      console.log('La base de données contient déjà des modèles.');
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation des modèles par défaut:", error);
  }
};
