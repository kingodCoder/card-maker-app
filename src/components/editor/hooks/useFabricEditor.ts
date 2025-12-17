import { useRef } from "react";
import * as fabric from "fabric";

export function useFabricEditor() {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);

  const saveHistory = () => {
    if (!canvasRef.current) return;
    const json = JSON.stringify(canvasRef.current.toJSON());
    historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
    historyRef.current.push(json);
    historyIndexRef.current++;
  };

  const undo = () => {
    if (!canvasRef.current || historyIndexRef.current <= 0) return;
    historyIndexRef.current--;
    canvasRef.current.loadFromJSON(
      historyRef.current[historyIndexRef.current],
      canvasRef.current.renderAll.bind(canvasRef.current)
    );
  };

  const redo = () => {
    if (
      !canvasRef.current ||
      historyIndexRef.current >= historyRef.current.length - 1
    )
      return;
    historyIndexRef.current++;
    canvasRef.current.loadFromJSON(
      historyRef.current[historyIndexRef.current],
      canvasRef.current.renderAll.bind(canvasRef.current)
    );
  };

  const addRectangle = () => {
    if (!canvasRef.current) return;
    const rect = new fabric.Rect({
      width: 200,
      height: 120,
      fill: "#2563eb",
      rx: 12,
      ry: 12,
      left: 100,
      top: 100,
    });
    canvasRef.current.add(rect);
    canvasRef.current.setActiveObject(rect);
    saveHistory();
  };

  const addText = () => {
    if (!canvasRef.current) return;
    const text = new fabric.Textbox("Nouveau texte", {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: "#000",
    });
    canvasRef.current.add(text);
    canvasRef.current.setActiveObject(text);
    saveHistory();
  };

  const deleteSelected = () => {
    if (!canvasRef.current) return;
    const obj = canvasRef.current.getActiveObject();
    if (!obj) return;
    canvasRef.current.remove(obj);
    saveHistory();
  };

  return {
    canvasRef,
    saveHistory,
    undo,
    redo,
    addRectangle,
    addText,
    deleteSelected,
  };
}
