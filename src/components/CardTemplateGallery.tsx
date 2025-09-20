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
        <div className="flex flex-col items-center p-4 bg-primary border rounded-md">
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
    {
      id: 'more',
      name: 'Plus de modèle',
      description: 'Créer plus de modèle en fonction de vos préférences',
      preview: (
        // <div className="flex flex-col items-center p-4 bg-black border rounded-md">
        //   <Button className="w-16 h-16 bg-white rounded-lg mb-2 flex flex-col flex-row items-center justify-center"><span className='text-weight-bold text-primary'>+</span></Button>
        // </div>
        <div className="flex flex-col items-center p-6 bg-black border border-gray-800 rounded-xl shadow-lg group transition-all duration-200">
  {/* Illustration style carte
  <div className="mb-3">
    <svg width="46" height="40" viewBox="0 0 46 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="38" height="28" rx="5" fill="#18181b" stroke="#6366f1" strokeWidth="2"/>
      <rect x="10" y="12" width="26" height="16" rx="3" fill="#fff" stroke="#6366f1" strokeWidth="1.5"/>
      <path d="M18 20L22 24L28 16" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div> */}
  {/* Bouton add */}
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