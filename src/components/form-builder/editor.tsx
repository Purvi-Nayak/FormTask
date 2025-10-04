"use client";

import React from "react";
import { useFormBuilder } from "@/lib/form-builder-context";
import { useDragAndDrop } from "@/lib/drag-and-drop";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  GripVertical,
  Settings,
  Trash2,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { FormField } from "@/types/form-builder";

export function Editor() {
  const { state, selectField, updateField, deleteField, reorderFields } =
    useFormBuilder();
  const { formSchema, selectedFieldId } = state;
  const selectedField = formSchema.fields.find((f) => f.id === selectedFieldId);

  // Drag and drop functionality
  const {
    draggedItem,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  } = useDragAndDrop(formSchema.fields, reorderFields);

  const handleFieldUpdate = (fieldId: string, updates: Partial<FormField>) => {
    updateField(fieldId, updates);
  };

  const handleAddOption = (fieldId: string) => {
    const field = formSchema.fields.find((f) => f.id === fieldId);
    if (!field) return;

    const newOptions = [
      ...(field.options || []),
      {
        label: `Option ${(field.options?.length || 0) + 1}`,
        value: `option${(field.options?.length || 0) + 1}`,
      },
    ];

    updateField(fieldId, { options: newOptions });
  };

  const handleRemoveOption = (fieldId: string, optionIndex: number) => {
    const field = formSchema.fields.find((f) => f.id === fieldId);
    if (!field) return;

    const newOptions =
      field.options?.filter((_, index) => index !== optionIndex) || [];
    updateField(fieldId, { options: newOptions });
  };

  const handleUpdateOption = (
    fieldId: string,
    optionIndex: number,
    updates: { label?: string; value?: string }
  ) => {
    const field = formSchema.fields.find((f) => f.id === fieldId);
    if (!field) return;

    const newOptions =
      field.options?.map((option, index) =>
        index === optionIndex ? { ...option, ...updates } : option
      ) || [];

    updateField(fieldId, { options: newOptions });
  };

  const moveField = (fieldId: string, direction: "up" | "down") => {
    const currentIndex = formSchema.fields.findIndex((f) => f.id === fieldId);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= formSchema.fields.length) return;

    const newFields = [...formSchema.fields];
    [newFields[currentIndex], newFields[newIndex]] = [
      newFields[newIndex],
      newFields[currentIndex],
    ];

    reorderFields(newFields);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Property Editor</h2>
        <p className="text-sm text-gray-600">Configure your form fields</p>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Fields List */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Form Fields ({formSchema.fields.length})
          </h3>

          {formSchema.fields.length === 0 ? (
            <div className="text-center py-8">
              <Settings className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No fields added yet</p>
              <p className="text-xs text-gray-400">
                Add fields from the sidebar to get started
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {formSchema.fields.map((field, index) => (
                <Card
                  key={field.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, field, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedFieldId === field.id
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : "hover:shadow-md"
                  } ${
                    draggedItem?.id === field.id ? "opacity-50 scale-95" : ""
                  } ${
                    dragOverIndex === index ? "border-t-4 border-blue-500" : ""
                  }`}
                  onClick={() => selectField(field.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {field.label}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {field.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveField(field.id, "up");
                          }}
                          disabled={index === 0}
                          className="h-6 w-6 p-0"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveField(field.id, "down");
                          }}
                          disabled={index === formSchema.fields.length - 1}
                          className="h-6 w-6 p-0"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteField(field.id);
                          }}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Field Editor */}
        {selectedField && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Field Properties
            </h3>

            <div className="space-y-4">
              {/* Basic Properties */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="field-label" className="text-sm font-medium">
                    Field Label *
                  </Label>
                  <Input
                    id="field-label"
                    value={selectedField.label}
                    onChange={(e) =>
                      handleFieldUpdate(selectedField.id, {
                        label: e.target.value,
                      })
                    }
                    placeholder="Enter field label"
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
                      handleFieldUpdate(selectedField.id, {
                        description: e.target.value,
                      })
                    }
                    placeholder="Optional field description"
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="field-placeholder"
                    className="text-sm font-medium"
                  >
                    Placeholder
                  </Label>
                  <Input
                    id="field-placeholder"
                    value={selectedField.placeholder || ""}
                    onChange={(e) =>
                      handleFieldUpdate(selectedField.id, {
                        placeholder: e.target.value,
                      })
                    }
                    placeholder="Enter placeholder text"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="field-size" className="text-sm font-medium">
                    Field Width
                  </Label>
                  <Select
                    value={selectedField.size}
                    onValueChange={(value: "50%" | "60%" | "100%") =>
                      handleFieldUpdate(selectedField.id, { size: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50%">50% Width</SelectItem>
                      <SelectItem value="60%">60% Width</SelectItem>
                      <SelectItem value="100%">100% Width</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="field-required"
                    className="text-sm font-medium"
                  >
                    Required Field
                  </Label>
                  <Switch
                    id="field-required"
                    checked={selectedField.validation.required}
                    onCheckedChange={(checked) =>
                      handleFieldUpdate(selectedField.id, {
                        validation: {
                          ...selectedField.validation,
                          required: checked,
                        },
                      })
                    }
                  />
                </div>
              </div>

              {/* Options for select, radio, checkbox */}
              {(selectedField.type === "select" ||
                selectedField.type === "radio" ||
                selectedField.type === "checkbox") && (
                <>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm font-medium">Options</Label>
                      <Button
                        size="sm"
                        onClick={() => handleAddOption(selectedField.id)}
                        className="h-7"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Option
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {selectedField.options?.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            value={option.label}
                            onChange={(e) =>
                              handleUpdateOption(selectedField.id, index, {
                                label: e.target.value,
                              })
                            }
                            placeholder="Option label"
                            className="flex-1"
                          />
                          <Input
                            value={option.value}
                            onChange={(e) =>
                              handleUpdateOption(selectedField.id, index, {
                                value: e.target.value,
                              })
                            }
                            placeholder="Option value"
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleRemoveOption(selectedField.id, index)
                            }
                            className="h-8 w-8 p-0 text-red-500"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                        </div>
                      )) || []}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
