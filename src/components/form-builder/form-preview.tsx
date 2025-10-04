"use client";

import React from "react";
import { useFormBuilder } from "@/lib/form-builder-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Trash2 } from "lucide-react";

export function FormPreview() {
  const { state, selectField, deleteField } = useFormBuilder();

  const handleFieldClick = (fieldId: string) => {
    selectField(fieldId);
  };

  const handleRemoveField = (fieldId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteField(fieldId);
  };

  return (
    <div className="w-[50%] bg-white border-l border-gray-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Form Preview</h2>
        <p className="text-sm text-gray-600 mt-1">
          {state.formSchema.fields.length} field
          {state.formSchema.fields.length !== 1 ? "s" : ""} added
        </p>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-6">
        {state.formSchema.fields.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Settings className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No fields added yet
              </h3>
              <p className="text-sm text-gray-500">
                Add fields from the Elements panel to see your form preview
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Form Fields */}
            <div className="space-y-4">
              {state.formSchema.fields.map((field) => (
                <div
                  key={field.id}
                  className={`
                    group relative p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer
                    ${
                      state.selectedFieldId === field.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }
                  `}
                  onClick={() => handleFieldClick(field.id)}
                >
                  {/* Field Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-blue-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectField(field.id);
                      }}
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-red-100"
                      onClick={(e) => handleRemoveField(field.id, e)}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>

                  {/* Field Label */}
                  <div className="mb-3">
                    <Label className="text-sm font-medium text-gray-700">
                      {field.label}
                      {field.validation.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </Label>
                    {field.description && (
                      <p className="text-xs text-gray-500 mt-1">
                        {field.description}
                      </p>
                    )}
                  </div>

                  {/* Field Input */}
                  <div className="space-y-2">
                    <Input
                      type={field.type === "textarea" ? "text" : field.type}
                      placeholder={field.placeholder}
                      className="w-full"
                      disabled
                    />

                    {/* Error Message Example */}
                    {field.validation.required && (
                      <p className="text-xs text-red-500 opacity-60">
                        This field is required
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                disabled
              >
                Submit Form
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
