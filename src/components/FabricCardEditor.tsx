import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";   // ✅ Import correct pour Vite (CommonJS → ESM)

type CardTemplate = "standard" | "premium" | "minimal" | "modern";

interface FabricCardEditorProps {
  initialTemplate?: CardTemplate;
}

const FabricCardEditorWYSIWYG: React.FC<FabricCardEditorProps> = ({
  initialTemplate = "standard",
}) => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const [currentTemplate, setCurrentTemplate] = useState<CardTemplate>(
    initialTemplate
  );

  // --- Initialisation du canvas Fabric ---
  useEffect(() => {
    if (!canvasElementRef.current) return;

    const canvas = new fabric.Canvas(canvasElementRef.current, {
      width: 600,
      height: 350,
      backgroundColor: "#fff",
      selection: true,
    });
    canvasRef.current = canvas;

    canvas.on("object:modified", () => {
      console.log("Objet modifié !");
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  // --- Rechargement du template ---
  useEffect(() => {
    if (canvasRef.current) {
      loadTemplate(currentTemplate);
    }
  }, [currentTemplate]);

  // --- Fonction pour charger un modèle existant ---
  const loadTemplate = (template: CardTemplate) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.clear();

    const addText = (
      text: string,
      left: number,
      top: number,
      options: Partial<fabric.ITextboxOptions> = {}
    ) => {
      const txt = new fabric.Textbox(text, {
        left,
        top,
        fontSize: 16,
        fill: "#000",
        ...options,
        selectable: true,
      });
      canvas.add(txt);
    };

    const addImage = (
      url: string,
      left: number,
      top: number,
      width: number,
      height: number
    ) => {
      fabric.Image.fromURL(
        url,
        (img) => {
          if (!img) {
            console.error(`Impossible de charger l'image depuis : ${url}`);
            const errorRect = new fabric.Rect({
              left,
              top,
              width,
              height,
              fill: "#f56565",
            });
            canvas.add(errorRect);
            canvas.renderAll();
            return;
          }
          img.set({ left, top, width, height, selectable: true });
          canvas.add(img);
          canvas.renderAll();
        },
        { crossOrigin: "anonymous" }
      );
    };

    const addQrCode = (left: number, top: number, size: number) => {
      const qrRect = new fabric.Rect({
        left,
        top,
        width: size,
        height: size,
        fill: "#eee",
        stroke: "#000",
        strokeWidth: 1,
        selectable: true,
      });
      canvas.add(qrRect);
    };

    switch (template) {
      case "standard":
        canvas.backgroundColor = "#fff";
        addText("Prénom : Victor", 20, 20);
        addText("Nom & Postnom : Doe Kabila", 20, 50);
        addText("Classe : 6ème A", 20, 80);
        addImage("https://via.placeholder.com/80x100", 400, 20, 80, 100);
        addQrCode(400, 240, 60);
        break;

      case "premium":
        canvas.backgroundColor = "#f0f8ff";
        addText("Prénom : Victor", 20, 20, { fill: "#1a202c" });
        addText("Nom & Postnom : Doe Kabila", 20, 50, { fill: "#1a202c" });
        addImage("https://via.placeholder.com/80x80", 400, 20, 80, 80);
        addQrCode(400, 240, 60);
        break;

      case "minimal":
        canvas.backgroundColor = "#f9f9f9";
        addText("Prénom : Victor", 20, 20);
        addText("Nom & Postnom : Doe Kabila", 20, 50);
        break;

      case "modern":
        canvas.backgroundColor = "#1d4ed8";
        addText("Prénom : Victor", 20, 30, { fill: "#fff" });
        addText("Nom & Postnom : Doe Kabila", 20, 60, { fill: "#fff" });
        addQrCode(400, 20, 60);
        break;

      default:
        break;
    }

    canvas.renderAll();
  };

  // --- Export JSON ---
  const exportJSON = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const json = canvas.toJSON();
    console.log("Export JSON:", JSON.stringify(json));
    return json;
  };

  // --- Import JSON ---
  const importJSON = (json: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
  };

  // --- Ajouter éléments dynamiques ---
  const addDynamicText = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const txt = new fabric.Textbox("Texte", {
      left: 50,
      top: 50,
      fontSize: 16,
      fill: "#000",
      selectable: true,
    });
    canvas.add(txt);
  };

  const addDynamicImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = prompt("URL de l'image ?");
    if (url) {
      fabric.Image.fromURL(
        url,
        (img) => {
          if (img) {
            img.set({
              left: 100,
              top: 100,
              width: 80,
              height: 80,
              selectable: true,
            });
            canvas.add(img);
            canvas.renderAll();
          }
        },
        { crossOrigin: "anonymous" }
      );
    }
  };

  const addDynamicQr = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = 60;
    const qrRect = new fabric.Rect({
      left: 200,
      top: 50,
      width: size,
      height: size,
      fill: "#eee",
      stroke: "#000",
      strokeWidth: 1,
      selectable: true,
    });
    canvas.add(qrRect);
  };

  return (
    <div>
      <h2>Éditeur WYSIWYG Fabric</h2>
      <div className="flex space-x-2 mb-2">
        <button onClick={() => setCurrentTemplate("standard")}>Standard</button>
        <button onClick={() => setCurrentTemplate("premium")}>Premium</button>
        <button onClick={() => setCurrentTemplate("minimal")}>Minimal</button>
        <button onClick={() => setCurrentTemplate("modern")}>Modern</button>
        <button onClick={exportJSON}>Exporter JSON</button>
        <button onClick={addDynamicText}>Ajouter texte</button>
        <button onClick={addDynamicImage}>Ajouter image</button>
        <button onClick={addDynamicQr}>Ajouter QR</button>
      </div>
      <canvas ref={canvasElementRef} style={{ border: "1px solid #ccc" }} />
    </div>
  );
};

export default FabricCardEditorWYSIWYG;
