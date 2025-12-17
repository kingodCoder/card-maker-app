import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EditorLayout from "@/components/editor/EditorLayout";

type EditorState = {
  mode: "new" | "template";
  templateId?: string | null;
  format: {
    width: number;
    height: number;
  };
};

export default function CardEditor() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as EditorState | null;

  // Sécurité : accès direct interdit
  if (!state) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Accès invalide à l’éditeur.
          </p>
          <Button onClick={() => navigate("/create-card")}>
            Revenir à la création
          </Button>
        </div>
      </div>
    );
  }

  const { mode, templateId, format } = state;

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* HEADER */}
      <header className="h-14 bg-white border-b flex items-center px-4 justify-between">
        <div className="font-semibold">Éditeur de carte</div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Annuler
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Enregistrer
          </Button>
        </div>
      </header>

      {/* ZONE ÉDITEUR */}
      {/* <main className="flex-1 flex items-center justify-center overflow-hidden">
        <div
          className="bg-white shadow-lg flex items-center justify-center"
          style={{
            width: format.width,
            height: format.height,
          }}
        >
          <div className="text-center text-gray-500 text-sm">
            <p>Zone de travail</p>
            <p>
              {format.width} × {format.height}px
            </p>
            {mode === "template" && (
              <p className="mt-2 text-xs">
                Template : {templateId}
              </p>
            )}
          </div>
        </div>
      </main> */}
      <main className="flex-1 overflow-hidden">
        <EditorLayout
          width={format.width}
          height={format.height}
        />
      </main>
    </div>
  );
}
