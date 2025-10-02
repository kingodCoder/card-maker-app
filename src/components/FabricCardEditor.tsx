import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

const FabricCardEditor = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement>(null);

  const [history, setHistory] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);

  // Initialisation du canvas
  useEffect(() => {
    if (!canvasElementRef.current) return;
    const canvas = new fabric.Canvas(canvasElementRef.current, {
      width: 800,
      height: 500,
      backgroundColor: "#fff",
      selection: true,
    });
    canvasRef.current = canvas;

    // Sauvegarder l’état à chaque modif
    const saveState = () => {
      setHistory((prev) => [...prev, canvas.toJSON()]);
      setRedoStack([]);
    };

    canvas.on("object:added", saveState);
    canvas.on("object:modified", saveState);
    canvas.on("object:removed", saveState);

    return () => {
      canvas.dispose();
    };
  }, []);

  // Annuler
  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;

    const prevState = history[history.length - 1];
    setRedoStack((r) => [...r, canvas.toJSON()]);
    setHistory((h) => h.slice(0, -1));
    canvas.loadFromJSON(prevState, () => canvas.renderAll());
  };

  // Rétablir
  const redo = () => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.length === 0) return;

    const nextState = redoStack[redoStack.length - 1];
    setRedoStack((r) => r.slice(0, -1));
    setHistory((h) => [...h, canvas.toJSON()]);
    canvas.loadFromJSON(nextState, () => canvas.renderAll());
  };

  // Supprimer
  const removeSelected = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObjects();
    active.forEach((obj) => canvas.remove(obj));
    canvas.discardActiveObject().renderAll();
  };

  // Ajouter texte
  const addText = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const txt = new fabric.Textbox("Texte", {
      left: 50,
      top: 50,
      fontSize: 20,
      fill: "#000",
    });
    canvas.add(txt);
  };

  // Ajouter rectangle
  const addRectangle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 150,
      height: 100,
      fill: "#3498db",
      rx: 10, // arrondi
      ry: 10,
    });
    canvas.add(rect);
  };

  // Ajouter cercle
  const addCircle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const circle = new fabric.Circle({
      left: 200,
      top: 200,
      radius: 60,
      fill: "#e74c3c",
    });
    canvas.add(circle);
  };

  // Changer la couleur de l’élément sélectionné
  const changeColor = (color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObjects();
    active.forEach((obj) => {
      if ("set" in obj) {
        obj.set("fill", color);
      }
    });
    canvas.renderAll();
  };

  // Définir couleur de fond
  const setBackgroundColor = (color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
  };

  // Définir image de fond
  const setBackgroundImage = (url: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    fabric.Image.fromURL(url, (img) => {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width! / img.width!,
        scaleY: canvas.height! / img.height!,
      });
    });
  };

  return (
    <div>
      <h2>Éditeur façon Canva</h2>
      <div className="flex flex-wrap gap-2 mb-3">
        <button onClick={addText}>+ Texte</button>
        <button onClick={addRectangle}>+ Rectangle</button>
        <button onClick={addCircle}>+ Cercle</button>
        <button onClick={removeSelected}>Supprimer</button>
        <button onClick={undo}>↶ Annuler</button>
        <button onClick={redo}>↷ Rétablir</button>
        <input
          type="color"
          onChange={(e) => changeColor(e.target.value)}
          title="Couleur de l'objet"
        />
        <input
          type="color"
          onChange={(e) => setBackgroundColor(e.target.value)}
          title="Couleur du fond"
        />
        <button onClick={() => {
          const url = prompt("URL de l'image de fond ?");
          if (url) setBackgroundImage(url);
        }}>Image de fond</button>
      </div>
      <canvas ref={canvasElementRef} style={{ border: "1px solid #ccc" }} />
    </div>
  );
};

export default FabricCardEditor;
