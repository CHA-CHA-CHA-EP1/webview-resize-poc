"use client";

import { useWindowSize } from "./components/hooks/useWindowSize";

export default function Home() {
  const size = useWindowSize();

  // Safely display values with fallbacks
  const safeValue = (value: number | undefined) => {
    if (value === null || value === undefined) return "N/A";
    return `${value}px`;
  };

  const safeScale = (value: number | undefined) => {
    if (value === null || value === undefined) return "N/A";
    return value;
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      <div className="p-1 flex-1 overflow-hidden">
        <h1 className="text-xs font-bold mb-2">Size Monitor</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="p-2 border rounded shadow-sm">
            <h2 className="text-xs font-bold">Window</h2>
            <p className="text-xs font-mono">W: {safeValue(size.innerWidth)}</p>
            <p className="text-xs font-mono">H: {safeValue(size.innerHeight)}</p>
            <p className="text-xs font-mono">OW: {safeValue(size.outerWidth)}</p>
            <p className="text-xs font-mono">OH: {safeValue(size.outerHeight)}</p>
          </div>

          <div className="p-2 border rounded shadow-sm">
            <h2 className="text-xs font-bold">Document</h2>
            <p className="text-xs font-mono">W: {safeValue(size.clientWidth)}</p>
            <p className="text-xs font-mono">H: {safeValue(size.clientHeight)}</p>
          </div>

          <div className="p-2 border rounded shadow-sm">
            <h2 className="text-xs font-bold">Screen</h2>
            <p className="text-xs font-mono">W: {safeValue(size.screenWidth)}</p>
            <p className="text-xs font-mono">H: {safeValue(size.screenHeight)}</p>
            <p className="text-xs font-mono">AW: {safeValue(size.availWidth)}</p>
            <p className="text-xs font-mono">AH: {safeValue(size.availHeight)}</p>
          </div>

          <div className="p-2 border rounded shadow-sm">
            <h2 className="text-xs font-bold">Viewport</h2>
            <p className="text-xs font-mono">W: {safeValue(size.visualViewport?.width)}</p>
            <p className="text-xs font-mono">H: {safeValue(size.visualViewport?.height)}</p>
            <p className="text-xs font-mono">S: {safeScale(size.visualViewport?.scale)}</p>
          </div>
        </div>

        <p className="mt-2 text-2xs text-gray-500">
          Resize window or zoom to see updates
        </p>
      </div>
      
      {/* Bottom Sheet - Absolute positioning */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3">
        <div className="flex items-center justify-between">
          <div className="w-2/3">
            <label htmlFor="amount" className="text-xs block mb-1">จำนวน</label>
            <input 
              type="number" 
              id="amount" 
              className="w-full p-2 border border-gray-300 rounded text-xs" 
              placeholder="ระบุจำนวน"
            />
          </div>
          <div className="flex space-x-2">
            <a 
              href="/test"
              className="bg-gray-200 text-gray-700 text-xs font-medium py-2 px-4 rounded"
            >
              ทดสอบหน้าใหม่
            </a>
            <button 
              className="bg-blue-500 text-white text-xs font-medium py-2 px-4 rounded"
            >
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
