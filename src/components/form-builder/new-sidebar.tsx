"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Layers3, Palette } from "lucide-react";
import { ElementsModal } from "./elements-modal";
import { ThemeModal } from "./theme-modal";

export function SimpleSidebar() {
  const [showElementsModal, setShowElementsModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  return (
    <>
      <div className="w-[20%] bg-white border-r border-gray-200 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Form Builder</h2>
          <p className="text-sm text-gray-500 mt-1">Build your form</p>
        </div>

        {/* Buttons */}
        <div className="p-6 space-y-4">
          <Button
            onClick={() => setShowElementsModal(true)}
            className="w-full h-16 flex flex-col items-center justify-center space-y-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg"
            variant="outline"
          >
            <Layers3 className="w-6 h-6" />
            <span className="text-sm font-medium">Elements</span>
          </Button>

          <Button
            onClick={() => setShowThemeModal(true)}
            className="w-full h-16 flex flex-col items-center justify-center space-y-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg"
            variant="outline"
          >
            <Palette className="w-6 h-6" />
            <span className="text-sm font-medium">Theme</span>
          </Button>
        </div>

        {/* Footer Info */}
        <div className="mt-auto p-6 text-center">
          <p className="text-xs text-gray-400">
            Click Elements to add fields
          </p>
        </div>
      </div>

      {/* Modals */}
      <ElementsModal 
        open={showElementsModal} 
        onClose={() => setShowElementsModal(false)} 
      />
      <ThemeModal 
        open={showThemeModal} 
        onClose={() => setShowThemeModal(false)} 
      />
    </>
  );
}