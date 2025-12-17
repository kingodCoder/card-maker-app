import { Square, Type, Image, Layers, Settings } from "lucide-react";

const items = [
  { icon: Square, label: "Design" },
  { icon: Layers, label: "Elements" },
  { icon: Type, label: "Text" },
  { icon: Image, label: "Import" },
  { icon: Settings, label: "Apps" },
];

const EditorSidebar = () => {
  return (
    <div className="w-20 bg-gradient-to-b from-[#1f2328] to-[#2b2f33] flex flex-col items-center py-4 gap-6 border-r border-black/30">

      {items.map((item, i) => (
        <button
          key={i}
          className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition"
        >
          <item.icon size={22} />
          <span className="text-xs">{item.label}</span>
        </button>
      ))}

    </div>
  );
};

export default EditorSidebar;
