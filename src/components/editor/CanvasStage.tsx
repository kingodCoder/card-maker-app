import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useFabric } from "./hooks/FabricContext";

type Props = {
  width: number;
  height: number;
};

const CanvasStage: React.FC<Props> = ({ width, height }) => {
  const canvasEl = useRef<HTMLCanvasElement | null>(null);
  const editor = useFabric();

  useEffect(() => {
    if (!canvasEl.current) return;

    const canvas = new fabric.Canvas(canvasEl.current, {
      width,
      height,
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
    });

    editor.canvasRef.current = canvas;
    editor.saveHistory();

    return () => canvas.dispose();
  }, [width, height]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="bg-white rounded-xl shadow-2xl p-6">
        <canvas ref={canvasEl} />
      </div>
    </div>
  );
};

export default CanvasStage;
