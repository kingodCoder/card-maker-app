import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Types internes
 */
type CardFormat = {
  label: string;
  width: number;
  height: number;
};

const CARD_FORMATS: CardFormat[] = [
  { label: "Carte élève (PVC)", width: 856, height: 540 },
  { label: "Badge vertical", width: 400, height: 600 },
  { label: "Carte carrée", width: 600, height: 600 },
  { label: "Format personnalisé", width: 0, height: 0 },
];

export default function CreateCard() {
  const navigate = useNavigate();

  const [selectedFormat, setSelectedFormat] = useState<CardFormat | null>(null);
  const [customWidth, setCustomWidth] = useState<number>(800);
  const [customHeight, setCustomHeight] = useState<number>(500);

  const [mode, setMode] = useState<"new" | "template">("new");
  const [templateId, setTemplateId] = useState<string | null>(null);

  /**
   * Validation et navigation vers l’éditeur
   */
  const handleCreate = () => {
    if (!selectedFormat) {
      alert("Veuillez sélectionner un format de carte.");
      return;
    }

    const format =
      selectedFormat.label === "Format personnalisé"
        ? { width: customWidth, height: customHeight }
        : { width: selectedFormat.width, height: selectedFormat.height };

    if (format.width <= 0 || format.height <= 0) {
      alert("Dimensions invalides.");
      return;
    }

    navigate("/card-editor", {
      state: {
        mode,
        templateId,
        format,
      },
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Créer une nouvelle carte</h1>

      {/* FORMAT */}
      <section className="mb-8">
        <h2 className="font-semibold mb-4">1. Choisissez le format</h2>
        <div className="grid grid-cols-2 gap-4">
          {CARD_FORMATS.map((format) => (
            <button
              key={format.label}
              onClick={() => setSelectedFormat(format)}
              className={`border rounded p-4 text-left ${
                selectedFormat?.label === format.label
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <div className="font-medium">{format.label}</div>
              {format.width > 0 && (
                <div className="text-sm text-gray-500">
                  {format.width} × {format.height}px
                </div>
              )}
            </button>
          ))}
        </div>

        {/* FORMAT PERSONNALISÉ */}
        {selectedFormat?.label === "Format personnalisé" && (
          <div className="mt-4 flex gap-4">
            <input
              type="number"
              value={customWidth}
              onChange={(e) => setCustomWidth(Number(e.target.value))}
              className="border rounded px-3 py-2 w-32"
              placeholder="Largeur"
            />
            <input
              type="number"
              value={customHeight}
              onChange={(e) => setCustomHeight(Number(e.target.value))}
              className="border rounded px-3 py-2 w-32"
              placeholder="Hauteur"
            />
          </div>
        )}
      </section>

      {/* MODE */}
      <section className="mb-8">
        <h2 className="font-semibold mb-4">2. Source du design</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setMode("new")}
            className={`px-4 py-2 rounded border ${
              mode === "new"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            Nouveau design
          </button>

          <button
            onClick={() => setMode("template")}
            className={`px-4 py-2 rounded border ${
              mode === "template"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            À partir d’un template
          </button>
        </div>

        {/* TEMPLATE (placeholder logique) */}
        {mode === "template" && (
          <div className="mt-4">
            <select
              className="border rounded px-3 py-2 w-full"
              onChange={(e) => setTemplateId(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Sélectionner un template
              </option>
              {/* Les vrais templates viendront d’IndexedDB plus tard */}
              <option value="template-1">Template carte élève</option>
              <option value="template-2">Template badge</option>
            </select>
          </div>
        )}
      </section>

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Créer et ouvrir l’éditeur
        </button>
      </div>
    </div>
  );
}
