"use client";

import React from "react";
import { useFormBuilder } from "@/lib/form-builder-context";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const COLOR_THEMES = [
  {
    name: "Blue",
    primary: "#3b82f6",
    secondary: "#e0e7ff",
    preview: "bg-blue-500"
  },
  {
    name: "Purple",
    primary: "#8b5cf6",
    secondary: "#ede9fe",
    preview: "bg-purple-500"
  },
  {
    name: "Green",
    primary: "#10b981",
    secondary: "#d1fae5",
    preview: "bg-green-500"
  },
  {
    name: "Red",
    primary: "#ef4444",
    secondary: "#fee2e2",
    preview: "bg-red-500"
  },
  {
    name: "Orange",
    primary: "#f97316",
    secondary: "#fed7aa",
    preview: "bg-orange-500"
  },
  {
    name: "Gray",
    primary: "#6b7280",
    secondary: "#f3f4f6",
    preview: "bg-gray-500"
  }
];

const FONT_OPTIONS = [
  { name: "Inter", className: "font-sans" },
  { name: "Serif", className: "font-serif" },
  { name: "Mono", className: "font-mono" }
];

const SIZE_OPTIONS = [
  { name: "Small", value: "sm" },
  { name: "Medium", value: "md" },
  { name: "Large", value: "lg" }
];

interface ThemeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ThemeModal({ open, onClose }: ThemeModalProps) {
  const { setTheme } = useFormBuilder();

  const handleColorSelect = (theme: typeof COLOR_THEMES[0]) => {
    setTheme({
      primaryColor: theme.primary,
      secondaryColor: theme.secondary
    });
  };

  const handleFontSelect = (font: typeof FONT_OPTIONS[0]) => {
    // Note: Font family is handled via CSS classes, not theme state
    // This could be extended to store font preference in form metadata
    console.log('Font selected:', font.name);
  };

  const handleSizeSelect = (size: typeof SIZE_OPTIONS[0]) => {
    setTheme({
      fontSize: size.value as "sm" | "md" | "lg"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Customize Theme</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 overflow-y-auto">
          {/* Colors */}
          <div>
            <h3 className="text-lg font-medium mb-4">Colors</h3>
            <div className="grid grid-cols-3 gap-3">
              {COLOR_THEMES.map((theme) => (
                <Card 
                  key={theme.name}
                  className="cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => handleColorSelect(theme)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full ${theme.preview}`} />
                      <div>
                        <p className="font-medium">{theme.name}</p>
                        <p className="text-xs text-gray-500">{theme.primary}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Fonts */}
          <div>
            <h3 className="text-lg font-medium mb-4">Typography</h3>
            <div className="grid grid-cols-3 gap-3">
              {FONT_OPTIONS.map((font) => (
                <Card 
                  key={font.name}
                  className="cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => handleFontSelect(font)}
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className={`font-medium ${font.className}`}>{font.name}</p>
                      <p className={`text-sm text-gray-500 ${font.className}`}>Aa Bb Cc</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-4">Size</h3>
            <div className="grid grid-cols-3 gap-3">
              {SIZE_OPTIONS.map((size) => (
                <Card 
                  key={size.name}
                  className="cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => handleSizeSelect(size)}
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="font-medium">{size.name}</p>
                      <Badge variant="outline" className="mt-1">
                        {size.value.toUpperCase()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}