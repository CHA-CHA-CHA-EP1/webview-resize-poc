"use client";

import { useWindowSize } from "../components/hooks/useWindowSize";
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';

export default function TestPage() {
    const size = useWindowSize();
    const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
    const [initialHeight, setInitialHeight] = useState<number | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Keep track of the initial height and detect keyboard changes
    useEffect(() => {
        if (!initialHeight && size.innerHeight) {
            setInitialHeight(size.innerHeight);
            setMaxHeight(size.innerHeight);
        }

        // If the height changes significantly and is smaller than initial, it's likely the keyboard
        if (initialHeight && size.innerHeight && initialHeight > size.innerHeight) {
            // Update max height to match available height when keyboard is open
            setMaxHeight(size.innerHeight);
        } else if (initialHeight && size.innerHeight && Math.abs(initialHeight - size.innerHeight) < 50) {
            // Reset when keyboard closes (allowing for small variations)
            setMaxHeight(size.innerHeight);
        }
    }, [size.innerHeight, initialHeight]);

    // Handle input focus to adjust container height
    const handleFocus = () => {
        // Add a small delay to allow keyboard to appear
        setTimeout(() => {
            if (containerRef.current && maxHeight) {
                containerRef.current.style.height = `${maxHeight}px`;
            }
        }, 100);
    };

    // Safely display values with fallbacks
    const safeValue = (value: number | undefined) => {
        if (value === null || value === undefined) return "N/A";
        return `${value}px`;
    };

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 flex flex-col"
            style={{ height: maxHeight ? `${maxHeight}px` : '100%' }}
        >
            {/* Top section - Size Monitor */}
            <div className="p-1 flex-1 overflow-auto">
                <h1 className="text-xs font-bold mb-2">Size Monitor (Test Page)</h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="p-2 border rounded shadow-sm">
                        <h2 className="text-xs font-bold">Window</h2>
                        <p className="text-xs font-mono">W: {safeValue(size.innerWidth)}</p>
                        <p className="text-xs font-mono">H: {safeValue(size.innerHeight)}</p>
                        <p className="text-xs font-mono">Max H: {safeValue(maxHeight)}</p>
                        <p className="text-xs font-mono">Initial H: {safeValue(initialHeight)}</p>
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
                    </div>

                    <div className="p-2 border rounded shadow-sm">
                        <h2 className="text-xs font-bold">Viewport</h2>
                        <p className="text-xs font-mono">W: {safeValue(size.visualViewport?.width)}</p>
                        <p className="text-xs font-mono">H: {safeValue(size.visualViewport?.height)}</p>
                        <p className="text-xs font-mono">S: {size.visualViewport?.scale || "N/A"}</p>
                    </div>
                </div>

                <p className="mt-2 text-2xs text-gray-500">
                    Focus on input to see keyboard resize effect
                </p>
                
                <div className="mt-4">
                    <Link href="/" className="text-xs text-blue-500 underline">กลับไปหน้าหลัก</Link>
                </div>
            </div>
            
            {/* Bottom Sheet - Absolute positioning */}
            <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3">
                <div className="flex items-center justify-between">
                    <div className="w-2/3">
                        <label htmlFor="amount" className="text-xs block mb-1">จำนวน</label>
                        <input 
                            ref={inputRef}
                            type="number" 
                            id="amount" 
                            className="w-full p-2 border border-gray-300 rounded text-xs" 
                            placeholder="ระบุจำนวน"
                            onFocus={handleFocus}
                        />
                    </div>
                    <button 
                        className="bg-blue-500 text-white text-xs font-medium py-2 px-4 rounded"
                    >
                        ชำระเงิน
                    </button>
                </div>
            </div>
        </div>
    );
}