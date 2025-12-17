import React from "react";

const EditorSidebar = () => {
  return (
    <aside className="w-60 bg-white border-r h-full flex flex-col">
      <div className="p-4 font-semibold border-b">
        Outils
      </div>

      <nav className="flex-1 p-2 space-y-2 text-sm">
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
          Design
        </button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
          Éléments
        </button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
          Texte
        </button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
          Images
        </button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
          Couleurs
        </button>
      </nav>
    </aside>
  );
};

export default EditorSidebar;
