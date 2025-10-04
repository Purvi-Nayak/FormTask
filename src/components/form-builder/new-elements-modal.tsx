"use client";

import React from "react";
import { useFormBuilder } from "@/lib/form-builder-context";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Type, 
  AlignLeft, 
  Mail, 
  Hash, 
  ChevronDown, 
  Circle, 
  Square, 
  Calendar, 
  Upload,
  ToggleLeft,
  Sliders
} from "lucide-react";
import { FieldType } from "@/types/form-builder";

const ELEMENT_TYPES = [
  {
    type: "text" as FieldType,
    label: "Text Input",
    description: "Single line text field",
    icon: <Type className="w-5 h-5" />,
    category: "Input"
  },
  {
    type: "textarea" as FieldType,
    label: "Textarea",
    description: "Multi-line text field",
    icon: <AlignLeft className="w-5 h-5" />,
    category: "Input"
  },
  {
    type: "email" as FieldType,
    label: "Email",
    description: "Email address field",
    icon: <Mail className="w-5 h-5" />,
    category: "Input"
  },
  {
    type: "number" as FieldType,
    label: "Number",
    description: "Numeric input field",
    icon: <Hash className="w-5 h-5" />,
    category: "Input"
  },
  {
    type: "date" as FieldType,
    label: "Date",
    description: "Date picker field",
    icon: <Calendar className="w-5 h-5" />,
    category: "Input"
  },
  {
    type: "select" as FieldType,
    label: "Select",
    description: "Dropdown selection",
    icon: <ChevronDown className="w-5 h-5" />,
    category: "Choice"
  },
  {
    type: "radio" as FieldType,
    label: "Radio Group",
    description: "Single choice from options",
    icon: <Circle className="w-5 h-5" />,
    category: "Choice"
  },
  {
    type: "checkbox" as FieldType,
    label: "Checkbox",
    description: "Multiple selections",
    icon: <Square className="w-5 h-5" />,
    category: "Choice"
  },
  {
    type: "file" as FieldType,
    label: "File Upload",
    description: "File upload field",
    icon: <Upload className="w-5 h-5" />,
    category: "Special"
  },
  {
    type: "switch" as FieldType,
    label: "Switch",
    description: "Toggle switch",
    icon: <ToggleLeft className="w-5 h-5" />,
    category: "Special"
  },
  {
    type: "slider" as FieldType,
    label: "Slider",
    description: "Range slider",
    icon: <Sliders className="w-5 h-5" />,
    category: "Special"
  }
];

const CATEGORIES = ["Input", "Choice", "Special"];

interface ElementsModalProps {
  open: boolean;
  onClose: () => void;
}

export function ElementsModal({ open, onClose }: ElementsModalProps) {
  const { addField, selectField } = useFormBuilder();

  const handleSelectElement = (elementType: FieldType) => {
    // Add the field and select it for editing
    const newField = {
      type: elementType,
      label: `New ${elementType.charAt(0).toUpperCase() + elementType.slice(1)}`,
      description: "",
      placeholder: elementType === "select" || elementType === "radio" || elementType === "checkbox" ? "" : `Enter ${elementType}...`,
      size: "100%" as const,
      validation: { required: false },
      ...(elementType === "select" || elementType === "radio" || elementType === "checkbox" ? {
        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" }
        ]
      } : {})
    };

    addField(newField);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Form Element</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto">
          {CATEGORIES.map((category) => (
            <div key={category} className="mb-8">
              <div className="flex items-center mb-4">
                <Badge variant="secondary" className="text-sm">
                  {category}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {ELEMENT_TYPES
                  .filter(element => element.category === category)
                  .map((element) => (
                    <Card 
                      key={element.type}
                      className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-blue-300"
                      onClick={() => handleSelectElement(element.type)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                            {element.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 mb-1">
                              {element.label}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {element.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}