import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

type Template = {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
};

type CardTemplateGalleryProps = {
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
};

const CardTemplateGallery: React.FC<CardTemplateGalleryProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  const templates: Template[] = [
    {
      id: 'standard',
      name: 'Cartes',
      description: 'Design classique et professionnel',
      preview: (
        <div className="flex flex-col items-center p-4 bg-white border rounded-md">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
          <div className="w-24 h-3 bg-gray-200 rounded mb-1"></div>
          <div className="w-16 h-2 bg-gray-200 rounded"></div>
        </div>
      ),
    },
    {
      id: 'more',
      name: 'Plus de modèle',
      description: 'Créer plus de modèle en fonction de vos préférences',
      preview: (
        <div className="flex flex-col items-center p-6 bg-black border border-gray-800 rounded-xl shadow-lg group transition-all duration-200">
          <button
            className="
              w-16 h-16 bg-gradient-to-tr from-indigo-500 to-blue-400 text-white rounded-lg shadow-md 
              flex flex-col items-center justify-center mb-2 border-4 border-black group-hover:border-indigo-500
              transition-all duration-200 scale-100 group-hover:scale-105 hover:shadow-xl
              ring-2 ring-indigo-400/30
            "
          >
            <span className="text-3xl font-extrabold drop-shadow-lg pointer-events-none">
              +
            </span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
            selectedTemplate === template.id
              ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
              : 'border-gray-200 hover:border-primary/40 hover:shadow-md'
          }`}
          onClick={() => onSelectTemplate(template.id)}
        >
          {selectedTemplate === template.id && (
            <div className="absolute top-2 right-2">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
          )}

          <div className="mb-3">{template.preview}</div>

          <div className="text-center">
            <h3 className="font-medium mb-1">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardTemplateGallery;