"use client";

import React, { useState } from "react";
import { useFormBuilder } from "@/lib/form-builder-context";
import { Button } from "@/components/ui/button";
import { ElementsModal } from "./elements-modal";
import { ThemeModal } from "./theme-modal";

export function SimpleSidebar() {
  const [elementsModalOpen, setElementsModalOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);

  return (
    <>
      <div className="w-[20%] bg-white border-r border-gray-200 p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Form Builder
          </h2>

          <Button
            onClick={() => setElementsModalOpen(true)}
            className="w-full h-12 text-left justify-start"
            variant="outline"
          >
            <span className="mr-3">📝</span>
            Elements
          </Button>

          <Button
            onClick={() => setThemeModalOpen(true)}
            className="w-full h-12 text-left justify-start"
            variant="outline"
          >
            <span className="mr-3">🎨</span>
            Theme
          </Button>
        </div>
      </div>

      <ElementsModal
        open={elementsModalOpen}
        onOpenChange={setElementsModalOpen}
      />

      <ThemeModal open={themeModalOpen} onOpenChange={setThemeModalOpen} />
    </>
  );
}
