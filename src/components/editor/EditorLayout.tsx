import EditorSidebar from "./EditorSidebar";
import EditorToolbar from "./EditorToolbar";
import CanvasStage from "./CanvasStage";
import { FabricProvider } from "./hooks/FabricContext";

type Props = {
  width: number;
  height: number;
};

const EditorLayout: React.FC<Props> = ({ width, height }) => {
  return (
    <FabricProvider>
      <div className="h-screen w-screen bg-[#2b2f33] flex flex-col">
        
        {/* Top Bar */}
        <EditorToolbar />

        {/* Main Area */}
        <div className="flex flex-1 overflow-hidden">
          <EditorSidebar />

          <div className="flex-1 bg-[#dfe3e8] flex items-center justify-center">
            <CanvasStage width={width} height={height} />
          </div>
        </div>
      </div>
    </FabricProvider>
  );
};

export default EditorLayout;
