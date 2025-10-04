"use client";

import React from "react";
import { useFormBuilder } from "@/lib/form-builder-context";
import { THEME_PRESETS } from "@/constants/form-builder";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ThemeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeModal({ open, onOpenChange }: ThemeModalProps) {
  const { setTheme, state } = useFormBuilder();

  const handleThemeSelect = (preset: {
    name: string;
    primaryColor: string;
    secondaryColor: string;
  }) => {
    setTheme({
      primaryColor: preset.primaryColor,
      secondaryColor: preset.secondaryColor,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Theme</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {THEME_PRESETS.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full justify-start h-auto p-3 hover:bg-gray-50 ${
                state.formSchema.theme.primaryColor === preset.primaryColor
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleThemeSelect(preset)}
            >
              <div className="flex items-center gap-3 w-full">
                <div
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: preset.primaryColor }}
                />
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm text-gray-900">
                    {preset.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {preset.primaryColor}
                  </div>
                </div>
                {state.formSchema.theme.primaryColor ===
                  preset.primaryColor && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
