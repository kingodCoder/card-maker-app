// src/components/editor/panels/ElementsPanel.tsx
import React from "react";
export default function ElementsPanel({ api }: any) {
  return (
    <div className="p-4">
      <h4 className="font-semibold">Formes</h4>
      <div className="flex gap-2 mt-3">
        <button onClick={()=>api.addRect()} className="px-3 py-1 border rounded">Rectangle</button>
        <button onClick={()=>api.addCircle()} className="px-3 py-1 border rounded">Cercle</button>
      </div>
    </div>
  );
}
