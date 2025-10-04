"use client";

import React from "react";
import { useFormBuilder } from "@/lib/form-builder-context";
import { ELEMENT_CATEGORIES, FIELD_TEMPLATES } from "@/constants/form-builder";
import { FieldType } from "@/types/form-builder";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ElementsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ElementsModal({ open, onOpenChange }: ElementsModalProps) {
  const { addField } = useFormBuilder();

  const handleElementSelect = (type: FieldType) => {
    const template = FIELD_TEMPLATES[type];
    if (template) {
      addField(template);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Form Element</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {ELEMENT_CATEGORIES.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-3">
              <h3 className="font-medium text-sm text-gray-700 flex items-center gap-2">
                <span>{category.icon}</span>
                {category.name}
              </h3>

              <div className="space-y-2">
                {category.elements.map((element) => (
                  <Button
                    key={element.type}
                    variant="outline"
                    className="w-full justify-start h-auto p-3 text-left hover:bg-blue-50"
                    onClick={() => handleElementSelect(element.type)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <span className="text-lg">{element.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900">
                          {element.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {element.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
