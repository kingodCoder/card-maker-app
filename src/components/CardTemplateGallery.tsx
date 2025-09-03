import React from 'react';
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
      name: 'Standard',
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
      id: 'premium',
      name: 'Premium',
      description: 'Design élégant avec gradient',
      preview: (
        <div className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border rounded-md">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
          <div className="w-24 h-3 bg-gray-200 rounded mb-1"></div>
          <div className="w-16 h-2 bg-gray-200 rounded mb-3"></div>
          <div className="w-12 h-12 bg-gray-200 rounded"></div>
        </div>
      ),
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Design épuré et moderne',
      preview: (
        <div className="flex justify-between items-center p-4 bg-white border rounded-md">
          <div>
            <div className="w-24 h-3 bg-gray-200 rounded mb-1"></div>
            <div className="w-16 h-2 bg-gray-200 rounded"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
      ),
    },
    {
      id: 'modern',
      name: 'Moderne',
      description: 'Design contemporain avec couleurs vives',
      preview: (
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 border rounded-md">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mb-2"></div>
          <div className="w-24 h-3 bg-purple-200 rounded mb-1"></div>
          <div className="w-16 h-2 bg-pink-200 rounded"></div>
        </div>
      ),
    },
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Design professionnel pour entreprises',
      preview: (
        <div className="flex items-center p-4 bg-gray-50 border rounded-md">
          <div className="w-12 h-12 bg-gray-300 rounded mr-3"></div>
          <div className="flex-1">
            <div className="w-20 h-3 bg-gray-300 rounded mb-1"></div>
            <div className="w-16 h-2 bg-gray-300 rounded"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'creative',
      name: 'Créatif',
      description: 'Design artistique et original',
      preview: (
        <div className="flex flex-col items-center p-4 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border rounded-md">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-200 to-red-200 rounded-lg mb-2 transform rotate-3"></div>
          <div className="w-24 h-3 bg-orange-200 rounded mb-1"></div>
          <div className="w-16 h-2 bg-red-200 rounded"></div>
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