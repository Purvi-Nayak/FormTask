"use client";

import React, { ChangeEvent } from "react";
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
import { Trash2, Plus, GripVertical } from "lucide-react";
import { SIZE_OPTIONS } from "@/constants/form-builder";

export function PropertyEditor() {
  const { state, updateField, deleteField, selectField } = useFormBuilder();
  const selectedField = state.formSchema.fields.find(
    (f) => f.id === state.selectedFieldId
  );

  if (!selectedField) {
    return (
      <div className="w-80 bg-gray-50 border-r border-gray-200 h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-sm">Select a field to edit its properties</div>
        </div>
      </div>
    );
  }

  const handleFieldUpdate = (updates: Partial<FormField>) => {
    updateField(selectedField.id, updates);
  };

  const handleValidationUpdate = (key: string, value: any) => {
    handleFieldUpdate({
      validation: {
        ...selectedField.validation,
        [key]: value,
      },
    });
  };

  const handleOptionUpdate = (
    index: number,
    key: "label" | "value",
    value: string
  ) => {
    const newOptions = [...(selectedField.options || [])];
    newOptions[index] = { ...newOptions[index], [key]: value };
    handleFieldUpdate({ options: newOptions });
  };

  const handleAddOption = () => {
    const newOptions = [
      ...(selectedField.options || []),
      { label: "New Option", value: "new_option" },
    ];
    handleFieldUpdate({ options: newOptions });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions =
      selectedField.options?.filter((_, i) => i !== index) || [];
    handleFieldUpdate({ options: newOptions });
  };

  const handleDeleteField = () => {
    deleteField(selectedField.id);
    selectField(null);
  };

  const hasOptions = ["select", "radio"].includes(selectedField.type);
  const hasPlaceholder = [
    "text",
    "textarea",
    "email",
    "number",
    "select",
  ].includes(selectedField.type);
  const hasMinMax = ["number", "slider"].includes(selectedField.type);
  const hasLength = ["text", "textarea", "email"].includes(selectedField.type);

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Field Properties
          </h3>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteField}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <Badge variant="secondary" className="mt-2">
          {selectedField.type}
        </Badge>
      </div>

      <div className="p-4 h-[calc(100vh-8rem)] overflow-y-auto space-y-6">
        {/* Basic Properties */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Basic Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="field-label" className="text-sm font-medium">
                Field Label *
              </Label>
              <Input
                id="field-label"
                value={selectedField.label}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFieldUpdate({ label: e.target.value })
                }
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
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
                onValueChange={(value: string) =>
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
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <div className="flex-1 space-y-1">
                      <Input
                        placeholder="Option label"
                        value={option.label}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleOptionUpdate(index, "label", e.target.value)
                        }
                        className="text-xs"
                      />
                      <Input
                        placeholder="Option value"
                        value={option.value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
                onCheckedChange={(checked: boolean) =>
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
    </div>
  );
}
