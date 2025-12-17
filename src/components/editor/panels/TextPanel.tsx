// src/components/editor/panels/TextPanel.tsx
import React from "react";
export default function TextPanel({ api }: any) {
  return (
    <div className="p-4">
      <h4 className="font-semibold">Texte</h4>
      <div className="mt-3 flex gap-2">
        <button onClick={()=>api.addText("Titre")} className="px-3 py-1 border rounded">Titre</button>
        <button onClick={()=>api.addText("Sous-titre")} className="px-3 py-1 border rounded">Sous-titre</button>
      </div>
    </div>
  );
}
