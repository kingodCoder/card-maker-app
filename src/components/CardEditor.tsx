import React, { useEffect, useRef } from "react";
import fabric  from "fabric";

type CardEditorProps = {
  template: string;
  firstName: string;
  lastName: string;
  position: string;
  photo: string | null;
  logo: string | null;
  showQrCode: boolean;
  etablissement: string;
  birthday: string;
  birthplace: string;
  matricule: string;
  no: number;
};

const CardEditor: React.FC<CardEditorProps> = ({
  template,
  firstName,
  lastName,
  position,
  photo,
  logo,
  showQrCode,
  etablissement,
  birthday,
  birthplace,
  matricule,
  no,
}) => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const canvasEl = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasEl.current) return;

    // Initialisation Fabric
    const canvas = new fabric.Canvas(canvasEl.current, {
      width: 400,
      height: 250,
      backgroundColor: "#fff",
    });
    canvasRef.current = canvas;

    // Nettoyage à l’unmount
    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.clear();

    // Exemple simple : titre (nom + prénom)
    const fullName = `${firstName || "Prénom"} ${lastName || "Nom"}`;
    const nameText = new fabric.Text(fullName, {
      left: 150,
      top: 30,
      fontSize: 18,
      fontWeight: "bold",
      fill: "black",
    });

    // Poste / classe
    const posText = new fabric.Text(position || "Poste / Classe", {
      left: 150,
      top: 60,
      fontSize: 14,
      fill: "gray",
    });

    // Photo (si dispo)
    if (photo) {
       fabric.FabricImage.fromURL(photo, (img) => {
        img.set({
          left: 20,
          top: 30,
          scaleX: 80 / img.width!,
          scaleY: 80 / img.height!,
          selectable: true,
        });
        canvas.add(img);
      });
    }

    // Logo
    if (logo) {
       fabric.FabricImage.fromURL(logo, (img) => {
        img.set({
          left: 320,
          top: 20,
          scaleX: 50 / img.width!,
          scaleY: 50 / img.height!,
          selectable: true,
        });
        canvas.add(img);
      });
    }

    // Texte footer (matricule)
    const footerText = new fabric.Text(
      matricule || `${etablissement?.substring(0, 5) || "ECOLE"}-${no || "00"}`,
      {
        left: 120,
        top: 200,
        fontSize: 14,
        fill: "blue",
      }
    );

    // Ajout au canvas
    canvas.add(nameText, posText, footerText);
    canvas.renderAll();
  }, [template, firstName, lastName, position, photo, logo, showQrCode, etablissement, birthday, birthplace, matricule, no]);

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Éditeur de carte (Fabric)</h3>
      <canvas ref={canvasEl} />
    </div>
  );
};

export default CardEditor;
