import { Button } from "@/components/ui/button";
import { useFabric } from "./hooks/FabricContext";

const EditorToolbar = () => {
  const editor = useFabric();

  return (
    <div className="h-12 bg-white border-b flex items-center px-4 gap-2">
      <Button size="sm" variant="outline" onClick={editor.undo}>Undo</Button>
      <Button size="sm" variant="outline" onClick={editor.redo}>Redo</Button>

      <div className="mx-2 h-6 w-px bg-gray-300" />

      <Button size="sm" onClick={editor.addRectangle}>Rectangle</Button>
      <Button size="sm" onClick={editor.addText}>Texte</Button>
      <Button size="sm" variant="destructive" onClick={editor.deleteSelected}>
        Supprimer
      </Button>
    </div>
  );
};

export default EditorToolbar;
