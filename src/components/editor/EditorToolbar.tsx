import { Button } from "@/components/ui/button";
import { useFabric } from "./hooks/FabricContext";

const EditorToolbar = () => {
  const editor = useFabric();

  return (
    <div className="h-14 bg-gradient-to-r from-[#1f2328] to-[#2b2f33] text-white flex items-center px-6 justify-between border-b border-black/30">

      {/* Left */}
      <div className="flex items-center gap-6 text-sm">
        <span className="font-semibold">File</span>
        <span className="opacity-70">Resize</span>
        <span className="opacity-70">Edit</span>
      </div>

      {/* Center */}
      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary" onClick={editor.undo}>Undo</Button>
        <Button size="sm" variant="secondary" onClick={editor.redo}>Redo</Button>
        <span className="text-sm opacity-80 ml-4">100%</span>
      </div>

      {/* Right */}
      <Button className="bg-white text-black hover:bg-gray-200">
        Download
      </Button>
    </div>
  );
};

export default EditorToolbar;
