
import { QrCode } from "lucide-react";

type CardPreviewProps = {
  template: string;
  firstName: string;
  lastName: string;
  position: string;
  photo: string | null;
  logo: string | null;
  showQrCode: boolean;
};

const CardPreview = ({
  template,
  firstName,
  lastName,
  position,
  photo,
  logo,
  showQrCode,
}: CardPreviewProps) => {
  // Rendu conditionnel basé sur le modèle sélectionné
  const renderCard = () => {
    const fullName = `${firstName || "Prénom"} ${lastName || "Nom"}`;
    const displayPosition = position || "Poste / Fonction";

    switch (template) {
      case "standard":
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xs mx-auto">
            <div className="p-6 text-center">
              {photo ? (
                <img
                  src={photo}
                  alt={fullName}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Photo</span>
                </div>
              )}
              <h3 className="text-xl font-bold">{fullName}</h3>
              <p className="text-gray-500">{displayPosition}</p>
            </div>
            <div className="bg-gray-50 p-4 flex justify-between items-center border-t">
              {logo ? (
                <img src={logo} alt="Logo" className="h-8" />
              ) : (
                <div className="h-8 w-16 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Logo</span>
                </div>
              )}
              {showQrCode && (
                <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                  <QrCode className="h-10 w-10 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        );
      case "premium":
        return (
          <div className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-lg shadow-lg overflow-hidden w-full max-w-xs mx-auto border border-brand-200">
            <div className="p-6 text-center">
              {photo ? (
                <img
                  src={photo}
                  alt={fullName}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white mx-auto mb-4 border-4 border-brand-200 flex items-center justify-center">
                  <span className="text-gray-400">Photo</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-brand-900">{fullName}</h3>
              <p className="text-brand-700">{displayPosition}</p>
              
              {showQrCode && (
                <div className="mt-4 mx-auto h-24 w-24 bg-white rounded-md p-2 flex items-center justify-center shadow-sm">
                  <QrCode className="h-16 w-16 text-brand-600" />
                </div>
              )}
            </div>
            <div className="bg-white p-4 flex justify-center items-center border-t">
              {logo ? (
                <img src={logo} alt="Logo" className="h-8" />
              ) : (
                <div className="h-8 w-24 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Logo</span>
                </div>
              )}
            </div>
          </div>
        );
      case "minimal":
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xs mx-auto">
            <div className="p-6 flex items-center">
              {photo ? (
                <img
                  src={photo}
                  alt={fullName}
                  className="w-20 h-20 rounded-full mr-4 object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
                  <span className="text-gray-400">Photo</span>
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold">{fullName}</h3>
                <p className="text-gray-500">{displayPosition}</p>
                {logo && <img src={logo} alt="Logo" className="h-6 mt-2" />}
              </div>
            </div>
            {showQrCode && (
              <div className="bg-gray-50 p-4 flex justify-center items-center border-t">
                <div className="h-16 w-16 bg-white rounded flex items-center justify-center">
                  <QrCode className="h-10 w-10 text-gray-500" />
                </div>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <p className="text-gray-500">Sélectionnez un modèle</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-medium mb-4">Aperçu</h3>
      {renderCard()}
    </div>
  );
};

export default CardPreview;
