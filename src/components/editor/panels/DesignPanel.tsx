// src/components/editor/panels/DesignPanel.tsx
import React, { useState } from "react";

export default function DesignPanel({ api }: any) {
  const [bgColor, setBgColor] = useState("#ffffff");

  const applyBackground = () => {
    const canvas = api.canvas();
    if (!canvas) return;
    canvas.setBackgroundColor(bgColor, () => canvas.renderAll());
  };

  const applyBackgroundImage = (url: string) => {
    const canvas = api.canvas();
    if (!canvas) return;

    fabric.Image.fromURL(url, (img: any) => {
      img.scaleToWidth(canvas.getWidth() || 900);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });
  };

  return (
    <div className="p-4">
      <h4 className="font-semibold mb-4">Design</h4>

      <div className="mb-4">
        <label className="text-sm">Couleur de fond</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="ml-2"
        />
        <button onClick={applyBackground} className="w-full mt-2 px-3 py-1 border rounded">
          Appliquer fond
        </button>
      </div>

      <div className="mb-4">
        <label className="text-sm">Image de fond</label>
        <button
          onClick={() => applyBackgroundImage("/mnt/data/carte_eleve.png")}
          className="w-full mt-2 px-3 py-1 border rounded"
        >
          Utiliser modèle OKAPI
        </button>
      </div>

      <div className="mt-4">
        <h5 className="font-medium">Canvas</h5>
        <p className="text-xs text-gray-500">Les tailles se gèrent dans CreateCard (pré-sélection).</p>
      </div>
    </div>
  );
}
