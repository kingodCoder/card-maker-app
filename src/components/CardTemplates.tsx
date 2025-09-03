
import { CheckCircle } from "lucide-react";

type CardTemplateProps = {
  id: string;
  name: string;
  isSelected: boolean;
  onClick: (id: string) => void;
};

const CardTemplate = ({ id, name, isSelected, onClick }: CardTemplateProps) => {
  return (
    <div 
      className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected 
          ? "border-brand-600 bg-brand-50 ring-2 ring-brand-200" 
          : "border-gray-200 hover:border-brand-200"
      }`}
      onClick={() => onClick(id)}
    >
      {isSelected && (
        <div className="absolute top-2 right-2">
          <CheckCircle className="h-5 w-5 text-brand-600" />
        </div>
      )}
      
      {id === "standard" && (
        <div className="flex flex-col items-center p-4 bg-white border rounded-md">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
          <div className="w-24 h-3 bg-gray-200 rounded mb-1"></div>
          <div className="w-16 h-2 bg-gray-200 rounded"></div>
        </div>
      )}
      
      {id === "premium" && (
        <div className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border rounded-md">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
          <div className="w-24 h-3 bg-gray-200 rounded mb-1"></div>
          <div className="w-16 h-2 bg-gray-200 rounded mb-3"></div>
          <div className="w-12 h-12 bg-gray-200 rounded"></div>
        </div>
      )}
      
      {id === "minimal" && (
        <div className="flex justify-between items-center p-4 bg-white border rounded-md">
          <div>
            <div className="w-24 h-3 bg-gray-200 rounded mb-1"></div>
            <div className="w-16 h-2 bg-gray-200 rounded"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
      )}
      
      <h3 className="font-medium text-center mt-3">{name}</h3>
    </div>
  );
};

type CardTemplatesProps = {
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
};

const CardTemplates = ({ selectedTemplate, onSelectTemplate }: CardTemplatesProps) => {
  const templates = [
    { id: "standard", name: "Standard" },
    { id: "premium", name: "Premium" },
    { id: "minimal", name: "Minimal" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <CardTemplate
          key={template.id}
          id={template.id}
          name={template.name}
          isSelected={selectedTemplate === template.id}
          onClick={onSelectTemplate}
        />
      ))}
    </div>
  );
};

export default CardTemplates;
