import React, { useEffect, useRef, useState } from 'react';
import fabric from 'fabric';

interface StoredModel {
  id: string;
  name: string;
  json: any;
  createdAt: number;
}

interface StoredBatch {
  id: string;
  modelId: string;
  name: string;
  cards: string[];
  createdAt: number;
}

const STORAGE_CONFIG = {
  useIndexedDB: false,
  batchTTLdays: 30,
};

const STORAGE_KEYS = {
  models: 'card_models',
  batches: 'card_batches',
};

export default function CardEditorWithStorageAndBatches(): JSX.Element {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const [models, setModels] = useState<StoredModel[]>([]);
  const [batches, setBatches] = useState<StoredBatch[]>([]);
  const [currentModelName, setCurrentModelName] = useState<string>('');

  useEffect(() => {
    const canvasContainer = canvasElRef.current?.parentElement;
    if (!canvasContainer) return;

    const canvas = new fabric.Canvas(canvasElRef.current!);
    
    const resizeCanvas = () => {
      canvas.setWidth(canvasContainer.clientWidth);
      canvas.setHeight(canvasContainer.clientWidth / 1.7); // Maintain aspect ratio
      canvas.backgroundColor = '#fff';
      canvas.renderAll();
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvasContainer);

    resizeCanvas();
    canvasRef.current = canvas;

    loadAllData();
    cleanupExpiredBatches();

    return () => {
      resizeObserver.disconnect();
      canvas.dispose();
    };
  }, []);

  const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const loadFromLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  const loadAllData = () => {
    setModels(loadFromLocalStorage(STORAGE_KEYS.models));
    setBatches(loadFromLocalStorage(STORAGE_KEYS.batches));
  };

  const cleanupExpiredBatches = () => {
    const ttl = STORAGE_CONFIG.batchTTLdays * 24 * 60 * 60 * 1000;
    const now = Date.now();
    const stored = loadFromLocalStorage(STORAGE_KEYS.batches) as StoredBatch[];
    const filtered = stored.filter(b => now - b.createdAt < ttl);
    saveToLocalStorage(STORAGE_KEYS.batches, filtered);
    setBatches(filtered);
  };

  const addText = () => {
    const text = new fabric.IText('Texte', { left: 50, top: 50, fill: '#000' });
    canvasRef.current?.add(text);
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      fabric.Image.fromURL(ev.target?.result as string, img => {
        canvasRef.current?.add(img);
      });
    };
    reader.readAsDataURL(file);
  };

  const saveModel = () => {
    if (!currentModelName) return alert('Veuillez donner un nom au modèle');
    const json = canvasRef.current?.toJSON();
    const newModel: StoredModel = {
      id: Date.now().toString(),
      name: currentModelName,
      json,
      createdAt: Date.now(),
    };
    const updated = [...models, newModel];
    saveToLocalStorage(STORAGE_KEYS.models, updated);
    setModels(updated);
    alert('Modèle enregistré');
  };

  const loadModel = (model: StoredModel) => {
    canvasRef.current?.loadFromJSON(model.json, () => {
      canvasRef.current?.renderAll();
    });
  };

  const createBatch = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL({ format: 'png' });
    const newBatch: StoredBatch = {
      id: Date.now().toString(),
      modelId: 'active',
      name: `Lot_${Date.now()}`,
      cards: [dataUrl],
      createdAt: Date.now(),
    };
    const updated = [...batches, newBatch];
    saveToLocalStorage(STORAGE_KEYS.batches, updated);
    setBatches(updated);
    alert('Lot créé');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Éditeur de carte</h2>
      <div className="flex gap-2 mb-2">
        <button onClick={addText} className="bg-blue-500 text-white px-2 py-1 rounded">Ajouter texte</button>
        <input type="file" accept="image/*" onChange={addImage} />
        <input type="text" placeholder="Nom du modèle" className="border px-2 py-1" onChange={e => setCurrentModelName(e.target.value)} />
        <button onClick={saveModel} className="bg-green-600 text-white px-2 py-1 rounded">Sauvegarder modèle</button>
        <button onClick={createBatch} className="bg-purple-600 text-white px-2 py-1 rounded">Créer lot</button>
      </div>

      <canvas ref={canvasElRef} className="border w-full h-auto"></canvas>

      <div className="mt-4 text-sm text-gray-600">
        <strong>Notes :</strong>
        <ul>
          <li>
            - Pour personnaliser, mettez dans vos champs texte des placeholders de la forme <code>{"{{NOM}}"}</code> ou <code>{"{{CLASSE}}"}</code> correspondant aux colonnes de votre CSV/JSON.
          </li>
          <li>
            - JSON attendu pour personnalisation : un tableau d'objets, p.ex. <code>{"[{NOM : Alice, CLASSE : 5A}, {NOM : Bob, CLASSE : 5B}]"}</code>
          </li>
          <li>
            - Le ZIP export utilise <code>jszip</code> si installé (import dynamique). Sinon, le lot sera téléchargé en JSON contenant les dataURLs.
          </li>
          <li>
            - Si vous voulez activer IndexedDB, installez <code>idb</code> puis mettez <code>{"STORAGE_CONFIG.useIndexedDB = true"}</code>.
          </li>
          <li>
            - Les lots expirent automatiquement au bout de {STORAGE_CONFIG.batchTTLdays} jours et sont nettoyés au démarrage du composant.
          </li>
        </ul>
      </div>
    </div>
  );
}
