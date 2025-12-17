import { useState } from "react";

export function useEditorState() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  return {
    selectedTool,
    setSelectedTool,
  };
}
