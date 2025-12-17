// src/components/editor/panels/ImportPanel.tsx
import React from "react";

export default function ImportPanel({ api }: any) {
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    api.addImageFromUrl(url);
  };
  return (
    <div className="p-4">
      <h4 className="font-semibold">Importer</h4>
      <input type="file" accept="image/*" onChange={onUpload} />
      <div className="mt-3">
        <button onClick={()=>api.addImageFromUrl('/mnt/data/carte_eleve.png')}>Charger le template fourni</button>
      </div>
    </div>
  );
}
