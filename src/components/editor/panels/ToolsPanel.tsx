// src/components/editor/panels/ToolsPanel.tsx
import React, { useState } from "react";

export default function ToolsPanel({ api }: any) {
  const [radius, setRadius] = useState(8);
  const [opacity, setOpacity] = useState(1);

  const applyRadius = () => {
    const c = api.canvas();
    const obj = c?.getActiveObject();
    if (!obj) return;

    if ("rx" in obj) {
      obj.set({ rx: radius, ry: radius });
      c.renderAll();
    }
  };

  const applyOpacity = () => {
    const c = api.canvas();
    const obj = c?.getActiveObject();
    if (!obj) return;

    obj.set({ opacity });
    c.renderAll();
  };

  const duplicate = () => {
    const c = api.canvas();
    const obj = c?.getActiveObject();
    if (!obj || !obj.clone) return;

    obj.clone((cloned: any) => {
      cloned.set({
        left: obj.left + 20,
        top: obj.top + 20,
      });
      c.add(cloned);
      c.setActiveObject(cloned);
      c.renderAll();
    });
  };

  const lock = () => {
    const obj = api.canvas()?.getActiveObject();
    if (!obj) return;
    obj.set({ selectable: false, lockMovementX: true, lockMovementY: true });
    api.canvas()?.renderAll();
  };

  const unlock = () => {
    const obj = api.canvas()?.getActiveObject();
    if (!obj) return;
    obj.set({ selectable: true, lockMovementX: false, lockMovementY: false });
    api.canvas()?.renderAll();
  };

  return (
    <div className="p-4">
      <h4 className="font-semibold mb-4">Outils</h4>

      <button onClick={api.removeSelected} className="w-full px-3 py-1 border rounded mb-3">
        Supprimer
      </button>

      <button onClick={duplicate} className="w-full px-3 py-1 border rounded mb-3">
        Dupliquer
      </button>

      <button onClick={api.bringToFront} className="w-full px-3 py-1 border rounded mb-3">
        Mettre devant
      </button>

      <button onClick={api.sendToBack} className="w-full px-3 py-1 border rounded mb-3">
        Mettre derrière
      </button>

      <div className="mt-4">
        <label className="text-sm">Arrondi (radius)</label>
        <input
          type="range"
          min={0}
          max={40}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full"
        />
        <button onClick={applyRadius} className="w-full px-3 py-1 border rounded">
          Appliquer arrondi
        </button>
      </div>

      <div className="mt-4">
        <label className="text-sm">Opacité</label>
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.1}
          value={opacity}
          onChange={(e) => setOpacity(Number(e.target.value))}
          className="w-full"
        />
        <button onClick={applyOpacity} className="w-full px-3 py-1 border rounded">
          Appliquer opacité
        </button>
      </div>

      <div className="mt-4">
        <button onClick={lock} className="w-full px-3 py-1 border rounded mb-2">
          Verrouiller
        </button>
        <button onClick={unlock} className="w-full px-3 py-1 border rounded">
          Déverrouiller
        </button>
      </div>
    </div>
  );
}
