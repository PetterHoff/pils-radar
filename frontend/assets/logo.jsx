import { Beer, Radar } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      {/* Øl-ikon */}
      <div className="relative">
        <Beer className="w-8 h-8 text-amber-500" />
        {/* Radar overlay */}
        <Radar className="w-4 h-4 text-green-500 absolute -top-1 -right-1 animate-ping" />
      </div>
    </div>
  );
}
