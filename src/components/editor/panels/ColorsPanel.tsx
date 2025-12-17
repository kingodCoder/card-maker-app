// src/components/editor/panels/ColorsPanel.tsx
import React, { useState } from "react";

export default function ColorsPanel({ api }: any) {
  const [fillColor, setFillColor] = useState("#2563eb");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#000000");

  const applyFill = () => {
    const canvas = api.canvas();
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (!obj) return;
    obj.set("fill", fillColor);
    canvas.renderAll();
  };

  const applyStroke = () => {
    const canvas = api.canvas();
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (!obj) return;
    obj.set("stroke", strokeColor);
    obj.set("strokeWidth", 2);
    canvas.renderAll();
  };

  const applyTextColor = () => {
    const canvas = api.canvas();
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (!obj || !obj.set) return;
    obj.set("fill", textColor);
    canvas.renderAll();
  };

  const presetColors = [
    "#1e3a8a", "#2563eb", "#3b82f6",
    "#10b981", "#ef4444", "#f59e0b",
    "#6b7280", "#000000", "#ffffff",
  ];

  return (
    <div className="p-4">
      <h4 className="font-semibold mb-4">Couleurs</h4>

      <div className="mb-4">
        <label className="text-sm">Remplissage</label>
        <input
          type="color"
          value={fillColor}
          onChange={(e) => setFillColor(e.target.value)}
          className="ml-2"
        />
        <button
          onClick={applyFill}
          className="mt-2 px-3 py-1 border rounded w-full"
        >
          Appliquer remplissage
        </button>
      </div>

      <div className="mb-4">
        <label className="text-sm">Contour</label>
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
          className="ml-2"
        />
        <button
          onClick={applyStroke}
          className="mt-2 px-3 py-1 border rounded w-full"
        >
          Appliquer contour
        </button>
      </div>

      <div className="mb-4">
        <label className="text-sm">Texte</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="ml-2"
        />
        <button
          onClick={applyTextColor}
          className="mt-2 px-3 py-1 border rounded w-full"
        >
          Appliquer couleur texte
        </button>
      </div>

      <h5 className="font-medium mt-4 mb-2">Palette rapide</h5>
      <div className="grid grid-cols-5 gap-2">
        {presetColors.map((c) => (
          <div
            key={c}
            className="w-6 h-6 rounded cursor-pointer border"
            style={{ background: c }}
            onClick={() => {
              setFillColor(c);
              applyFill();
            }}
          />
        ))}
      </div>
    </div>
  );
}
