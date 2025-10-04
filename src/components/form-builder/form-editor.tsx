"use client";

import React, { useState, useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Plus,
  X,
} from "lucide-react";
import { useFormBuilder } from "@/lib/form-builder-context";
import { FormField } from "@/types/form-builder";
import { FIELD_TYPES } from "@/constants/form-builder";

export default function FormEditor() {
  const { state, updateField, deleteField, moveField, selectField } =
    useFormBuilder();
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const selectedField = state.formSchema.fields.find(
    (f) => f.id === state.selectedFieldId
  );

  const handleEditField = (field: FormField) => {
    setEditingField({ ...field });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingField) {
      updateField(editingField.id, editingField);
      setIsEditing(false);
      setEditingField(null);
      selectField(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingField(null);
    selectField(null);
  };

  const handleFieldUpdate = (updates: Partial<FormField>) => {
    if (editingField) {
      setEditingField({
        ...editingField,
        ...updates,
      });
    }
  };

  const handleValidationUpdate = (key: string, value: any) => {
    if (editingField) {
      setEditingField({
        ...editingField,
        validation: {
          ...editingField.validation,
          [key]: value,
        },
      });
    }
  };

  const handleOptionUpdate = (index: number, key: string, value: string) => {
    if (editingField && editingField.options) {
      const newOptions = [...editingField.options];
      newOptions[index] = {
        ...newOptions[index],
        [key]: value,
      };
      setEditingField({
        ...editingField,
        options: newOptions,
      });
    }
  };

  const handleAddOption = () => {
    if (editingField) {
      const newOptions = [
        ...(editingField.options || []),
        {
          label: "New Option",
          value: "new_option",
        },
      ];
      setEditingField({
        ...editingField,
        options: newOptions,
      });
    }
  };

  const handleRemoveOption = (index: number) => {
    if (editingField && editingField.options) {
      const newOptions = editingField.options.filter((_, i) => i !== index);
      setEditingField({
        ...editingField,
        options: newOptions,
      });
    }
  };

  // React to selectedField changes from outside
  useEffect(() => {
    if (selectedField && !isEditing) {
      handleEditField(selectedField);
    }
  }, [selectedField, isEditing]);

  const fieldType = FIELD_TYPES.find(
    (type) => type.type === editingField?.type
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Form Editor</h2>
          <Badge variant="outline">
            {state.formSchema.fields.length} field
            {state.formSchema.fields.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {!isEditing ? (
          /* Field List */
          <div className="p-4 space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">
              Form Fields
            </h3>
            {state.formSchema.fields.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No fields added yet</p>
                <p className="text-sm">Add fields from the sidebar</p>
              </div>
            ) : (
              <div className="space-y-2">
                {state.formSchema.fields.map((field, index) => (
                  <Card
                    key={field.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      state.selectedFieldId === field.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => handleEditField(field)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {field.label}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {field.type}
                            </Badge>
                            {field.validation.required && (
                              <Badge variant="destructive" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          {field.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {field.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveField(field.id, "up");
                            }}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveField(field.id, "down");
                            }}
                            disabled={
                              index === state.formSchema.fields.length - 1
                            }
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteField(field.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Property Editor */
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                {fieldType?.icon}
              </div>
              <div>
                <h3 className="font-medium">{fieldType?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {fieldType?.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Basic Properties */}
              <div className="space-y-3">
                <Label htmlFor="field-label">Field Label</Label>
                <Input
                  id="field-label"
                  value={editingField?.label || ""}
                  onChange={(e) => handleFieldUpdate({ label: e.target.value })}
                  placeholder="Enter field label"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="field-description">Description</Label>
                <Textarea
                  id="field-description"
                  value={editingField?.description || ""}
                  onChange={(e) =>
                    handleFieldUpdate({ description: e.target.value })
                  }
                  placeholder="Enter field description"
                  rows={2}
                />
              </div>

              {/* Placeholder for input fields */}
              {["text", "textarea", "email", "number"].includes(
                editingField?.type || ""
              ) && (
                <div className="space-y-3">
                  <Label htmlFor="field-placeholder">Placeholder</Label>
                  <Input
                    id="field-placeholder"
                    value={editingField?.placeholder || ""}
                    onChange={(e) =>
                      handleFieldUpdate({ placeholder: e.target.value })
                    }
                    placeholder="Enter placeholder text"
                  />
                </div>
              )}

              {/* Field Size */}
              <div className="space-y-3">
                <Label htmlFor="field-size">Field Size</Label>
                <Select
                  value={editingField?.size || "full"}
                  onValueChange={(value) =>
                    handleFieldUpdate({ size: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="half">Half Width (50%)</SelectItem>
                    <SelectItem value="medium">Medium (60%)</SelectItem>
                    <SelectItem value="full">Full Width (100%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Options for select, radio, checkbox */}
              {["select", "radio", "checkbox"].includes(
                editingField?.type || ""
              ) && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Options</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddOption}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Option
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {editingField?.options?.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={option.label}
                          onChange={(e) =>
                            handleOptionUpdate(index, "label", e.target.value)
                          }
                          placeholder="Option label"
                          className="flex-1"
                        />
                        <Input
                          value={option.value}
                          onChange={(e) =>
                            handleOptionUpdate(index, "value", e.target.value)
                          }
                          placeholder="Option value"
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveOption(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Validation */}
              <div className="space-y-3">
                <Label>Validation</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="required"
                    checked={editingField?.validation.required || false}
                    onCheckedChange={(checked) =>
                      handleValidationUpdate("required", checked)
                    }
                  />
                  <Label htmlFor="required">Required field</Label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {isEditing && (
        <div className="border-t p-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      )}
    </div>
  );
}
