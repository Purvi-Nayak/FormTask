"use client";

import React, { useState } from "react";
import { useFormBuilder } from "@/lib/form-builder-context";
import { FormField, FieldType } from "@/types/form-builder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { SIZE_OPTIONS } from "@/constants/form-builder";
import { ElementsModal } from "./elements-modal";

export function CenterEditor() {
  const { state, updateField, deleteField, selectField } = useFormBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const [elementsModalOpen, setElementsModalOpen] = useState(false);
  const selectedField = state.formSchema.fields.find(
    (f) => f.id === state.selectedFieldId
  );

  const handleSave = () => {
    setIsEditing(false);
    selectField(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    selectField(null);
  };

  const handleAddElements = () => {
    setElementsModalOpen(true);
  };

  const handleFieldUpdate = (updates: Partial<FormField>) => {
    if (selectedField) {
      updateField(selectedField.id, updates);
    }
  };

  const handleValidationUpdate = (key: string, value: any) => {
    if (selectedField) {
      handleFieldUpdate({
        validation: {
          ...selectedField.validation,
          [key]: value,
        },
      });
    }
  };

  const handleOptionUpdate = (
    index: number,
    key: "label" | "value",
    value: string
  ) => {
    if (selectedField) {
      const newOptions = [...(selectedField.options || [])];
      newOptions[index] = { ...newOptions[index], [key]: value };
      handleFieldUpdate({ options: newOptions });
    }
  };

  const handleAddOption = () => {
    if (selectedField) {
      const newOptions = [
        ...(selectedField.options || []),
        { label: "New Option", value: "new_option" },
      ];
      handleFieldUpdate({ options: newOptions });
    }
  };

  const handleRemoveOption = (index: number) => {
    if (selectedField) {
      const newOptions =
        selectedField.options?.filter((_, i) => i !== index) || [];
      handleFieldUpdate({ options: newOptions });
    }
  };

  const hasOptions =
    selectedField && ["select", "radio"].includes(selectedField.type);
  const hasPlaceholder =
    selectedField &&
    ["text", "textarea", "email", "number", "select"].includes(
      selectedField.type
    );
  const hasMinMax =
    selectedField && ["number", "slider"].includes(selectedField.type);
  const hasLength =
    selectedField && ["text", "textarea", "email"].includes(selectedField.type);

  // If editing a field, show property editor
  if (selectedField) {
    return (
      <div className="w-[30%] bg-white border-r border-gray-200 flex flex-col">
        {/* Fixed Header */}
        <div className="border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="p-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h3 className="font-semibold text-gray-900">Edit Field</h3>
              <p className="text-sm text-gray-500">
                Configure your {selectedField.type} field
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Basic Properties */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Badge variant="secondary">{selectedField.type}</Badge>
                Basic Properties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="field-label" className="text-sm font-medium">
                  Field Label *
                </Label>
                <Input
                  id="field-label"
                  value={selectedField.label}
                  onChange={(e) => handleFieldUpdate({ label: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label
                  htmlFor="field-description"
                  className="text-sm font-medium"
                >
                  Description
                </Label>
                <Textarea
                  id="field-description"
                  value={selectedField.description || ""}
                  onChange={(e) =>
                    handleFieldUpdate({ description: e.target.value })
                  }
                  className="mt-1"
                  rows={2}
                />
              </div>

              {hasPlaceholder && (
                <div>
                  <Label
                    htmlFor="field-placeholder"
                    className="text-sm font-medium"
                  >
                    Placeholder Text
                  </Label>
                  <Input
                    id="field-placeholder"
                    value={selectedField.placeholder || ""}
                    onChange={(e) =>
                      handleFieldUpdate({ placeholder: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="field-size" className="text-sm font-medium">
                  Field Size
                </Label>
                <Select
                  value={selectedField.size}
                  onValueChange={(value) =>
                    handleFieldUpdate({ size: value as "50%" | "60%" | "100%" })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SIZE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Options for select/radio fields */}
          {hasOptions && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  Options
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddOption}
                    className="h-7 px-2"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedField.options?.map((option, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 space-y-1">
                        <Input
                          placeholder="Option label"
                          value={option.label}
                          onChange={(e) =>
                            handleOptionUpdate(index, "label", e.target.value)
                          }
                          className="text-xs"
                        />
                        <Input
                          placeholder="Option value"
                          value={option.value}
                          onChange={(e) =>
                            handleOptionUpdate(index, "value", e.target.value)
                          }
                          className="text-xs"
                        />
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveOption(index)}
                        className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    {index < (selectedField.options?.length || 0) - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Validation Rules */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Validation Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="required" className="text-sm font-medium">
                  Required Field
                </Label>
                <Switch
                  id="required"
                  checked={selectedField.validation.required}
                  onCheckedChange={(checked) =>
                    handleValidationUpdate("required", checked)
                  }
                />
              </div>

              {hasLength && (
                <>
                  <div>
                    <Label htmlFor="min-length" className="text-sm font-medium">
                      Minimum Length
                    </Label>
                    <Input
                      id="min-length"
                      type="number"
                      value={selectedField.validation.minLength || ""}
                      onChange={(e) =>
                        handleValidationUpdate(
                          "minLength",
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                      className="mt-1"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="max-length" className="text-sm font-medium">
                      Maximum Length
                    </Label>
                    <Input
                      id="max-length"
                      type="number"
                      value={selectedField.validation.maxLength || ""}
                      onChange={(e) =>
                        handleValidationUpdate(
                          "maxLength",
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                      className="mt-1"
                      min="1"
                    />
                  </div>
                </>
              )}

              {hasMinMax && (
                <>
                  <div>
                    <Label htmlFor="min-value" className="text-sm font-medium">
                      Minimum Value
                    </Label>
                    <Input
                      id="min-value"
                      type="number"
                      value={selectedField.validation.min || ""}
                      onChange={(e) =>
                        handleValidationUpdate(
                          "min",
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="max-value" className="text-sm font-medium">
                      Maximum Value
                    </Label>
                    <Input
                      id="max-value"
                      type="number"
                      value={selectedField.validation.max || ""}
                      onChange={(e) =>
                        handleValidationUpdate(
                          "max",
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              {selectedField.type === "text" && (
                <div>
                  <Label htmlFor="pattern" className="text-sm font-medium">
                    Pattern (Regex)
                  </Label>
                  <Input
                    id="pattern"
                    value={selectedField.validation.pattern || ""}
                    onChange={(e) =>
                      handleValidationUpdate(
                        "pattern",
                        e.target.value || undefined
                      )
                    }
                    className="mt-1"
                    placeholder="^[A-Za-z]+$"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Fixed Footer */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              Save Field
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default state - show add elements interface
  return (
    <div className="w-3/10 bg-white border-r border-gray-200 flex flex-col">
      {/* Fixed Header */}
      <div className="border-b border-gray-200 p-4 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Form Editor</h3>
            <p className="text-sm text-gray-500">
              {state.formSchema.fields.length} field(s) added
            </p>
          </div>
          <Button
            onClick={handleAddElements}
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Elements
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Ready to build your form
          </h3>
          <p className="text-gray-500 mb-4">
            Click "Add Elements" to start adding fields to your form
          </p>
          <Button onClick={handleAddElements} variant="outline">
            Get Started
          </Button>
        </div>
      </div>

      <ElementsModal
        open={elementsModalOpen}
        onOpenChange={setElementsModalOpen}
      />
    </div>
  );
}
