
import { useRef, useCallback } from 'react';
import { fabric } from 'fabric';

interface HistoryState {
  canvasJSON: string;
}

export const useHistory = (canvas: fabric.Canvas | null) => {
  const history = useRef<HistoryState[]>([]);
  const historyPointer = useRef<number>(-1);
  const isRedoingOrUndoing = useRef<boolean>(false);

  const saveHistory = useCallback(() => {
    if (canvas && !isRedoingOrUndoing.current) {
      const canvasJSON = JSON.stringify(canvas.toJSON());
      // If we are not at the end of the history, truncate it before adding new state
      if (historyPointer.current < history.current.length - 1) {
        history.current = history.current.slice(0, historyPointer.current + 1);
      }
      history.current.push({ canvasJSON });
      historyPointer.current = history.current.length - 1;
    }
  }, [canvas]);

  const undo = useCallback(() => {
    if (historyPointer.current > 0 && canvas) {
      isRedoingOrUndoing.current = true;
      historyPointer.current--;
      const prevState = history.current[historyPointer.current];
      canvas.loadFromJSON(prevState.canvasJSON, () => {
        canvas.renderAll();
        isRedoingOrUndoing.current = false;
      });
    }
  }, [canvas]);

  const redo = useCallback(() => {
    if (historyPointer.current < history.current.length - 1 && canvas) {
      isRedoingOrUndoing.current = true;
      historyPointer.current++;
      const nextState = history.current[historyPointer.current];
      canvas.loadFromJSON(nextState.canvasJSON, () => {
        canvas.renderAll();
        isRedoingOrUndoing.current = false;
      });
    }
  }, [canvas]);

  return { saveHistory, undo, redo };
};
