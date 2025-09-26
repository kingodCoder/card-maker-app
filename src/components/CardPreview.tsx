
import { QrCode } from "lucide-react";
import FabricCardEditorWYSIWYG from "./FabricCardEditor";

type CardPreviewProps = {
  template: string;
  firstName: string;
  lastName: string;
  position: string;
  photo: string | null;
  logo: string | null;
  showQrCode: boolean;
  etablissement: string;
  birthday: string;
  birthplace: string;
  matricule: string;
  no: number;
};

const CardPreview = ({
  template,
  firstName,
  lastName,
  position,
  photo,
  logo,
  showQrCode,
  etablissement,
  birthday,
  birthplace,
  matricule,
  no
}: CardPreviewProps) => {
  // Rendu conditionnel basé sur le modèle sélectionné
  const renderCard = () => {
    const fullName = `${firstName || "Prénom"} ${lastName || "Nom"}`;
    const displayPosition = position || "Poste / Fonction";
    const birth = `{birthplace||"Lieu"},{birthday||" et Date de naissance"}`;
    const matri = `{etablissement.length>5?etablissement.substring(0,5):etablissement}-{no?no:"00"}`;

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
      case "modern":
        return (
          <div className="w-full h-60 bg-blue-700 text-white rounded-xl overflow-hidden shadow-lg flex flex-col">
            {/* --- Bandeau tricolore --- */}
            <div className="grid grid-cols-3 h-3">
              <div className="bg-blue-600"></div>
              <div className="bg-yellow-400"></div>
              <div className="bg-red-500"></div>
            </div>

            {/* --- Logo + bannière --- */}
            <div className="flex items-center justify-center mt-1  px-1">
              {logo ? (
                <img
                  src={logo}
                  alt="Logo"
                  className="w-20 h-20 rounded-full bg-white p-1 object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center text-xs">
                  LOGO
                </div>
              )}
              <div className="flex-1 h-8 bg-blue-800 rounded-md"></div>
            </div>

            {/* --- Infos élève + QR + Photo --- */}
            <div className="flex justify-between items-start px-2">
              {/* QR gauche */}
              {showQrCode ? (
                <div className="w-16 h-16 bg-white rounded-md text-black text-xs flex items-center justify-center">
                  <QrCode className="h-12 w-12" />
                </div>
              ) : (
                <div className="w-16 h-16"></div>
              )}

              {/* Infos élève */}
              <div className="flex-1 text-sm space-y-2 px-3 text-left">
                <div>
                  <span className="font-semibold block">Prénom :</span>
                  <span>{firstName || "Victor"}</span>
                </div>
                <div>
                  <span className="font-semibold block">Nom & Postnom :</span>
                  <span>
                    {lastName || "Doe"} {position || "Kabila"}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                <div>
                  <span className="font-semibold block">Naissance :</span>
                  <span>
                    {birthplace || "Lieu"}, {birthday || "01/01/2010"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold block">Classe :</span>
                  <span>{position || "6ème A"}</span>
                </div>
                </div>
                <div>
                  <span className="font-semibold block">Adresse :</span>
                  <span>{etablissement || "Adresse élève"}</span>
                </div>
              </div>

              {/* Photo droite */}
              {photo ? (
                <img
                  src={photo}
                  alt={firstName}
                  className="w-20 h-24 bg-white rounded-md object-cover"
                />
              ) : (
                <div className="w-20 h-24 bg-white rounded-md text-black text-xs flex items-center justify-center">
                  Photo
                </div>
              )}
            </div>

            {/* --- Footer avec année scolaire + matricule --- */}
            <div className="mt-4 bg-blue-900 py-3 text-center text-sm font-medium tracking-wide">
              Année scolaire {new Date().getFullYear()}-{new Date().getFullYear() + 1} —{" "}
              Matricule:{" "}
              {matricule ||
                `${etablissement?.substring(0, 5) || "ECOLE"}-${no || "00"}`}
            </div>
          </div>
        );
    case "more": 
        return (
          <FabricCardEditorWYSIWYG  initialTemplate={template as any}/>
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
