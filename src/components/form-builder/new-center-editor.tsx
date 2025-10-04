"use client";

import React from "react";
import { useFormBuilder } from "@/lib/form-builder-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Settings, Trash2, Move, Plus } from "lucide-react";
import { FormField } from "@/types/form-builder";

export function CenterEditor() {
  const { 
    schema, 
    selectedField, 
    setSelectedField, 
    updateField, 
    deleteField, 
    updateSchema,
    moveField
  } = useFormBuilder();

  const handleBackClick = () => {
    setSelectedField(null);
  };

  const handleSchemaUpdate = (field: keyof typeof schema, value: string) => {
    updateSchema({ [field]: value });
  };

  const handleFieldUpdate = (field: keyof FormField, value: string | boolean | number | Array<any>) => {
    if (selectedField) {
      updateField(selectedField.id, { [field]: value });
    }
  };

  const handleDeleteField = () => {
    if (selectedField) {
      deleteField(selectedField.id);
      setSelectedField(null);
    }
  };

  const handleMoveField = (direction: 'up' | 'down') => {
    if (selectedField) {
      const currentIndex = schema.fields.findIndex((f: FormField) => f.id === selectedField.id);
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      if (newIndex >= 0 && newIndex < schema.fields.length) {
        moveField(currentIndex, newIndex);
      }
    }
  };

  const addFieldOption = () => {
    if (selectedField && selectedField.options) {
      const newOptions = [...selectedField.options, { label: "New Option", value: `option_${Date.now()}` }];
      handleFieldUpdate('options', newOptions);
    }
  };

  const updateFieldOption = (index: number, field: 'label' | 'value', value: string) => {
    if (selectedField && selectedField.options) {
      const newOptions = [...selectedField.options];
      newOptions[index] = { ...newOptions[index], [field]: value };
      handleFieldUpdate('options', newOptions);
    }
  };

  const removeFieldOption = (index: number) => {
    if (selectedField && selectedField.options) {
      const newOptions = selectedField.options.filter((_: any, i: number) => i !== index);
      handleFieldUpdate('options', newOptions);
    }
  };

  const shouldShowOptions = selectedField && ['select', 'radio', 'checkbox'].includes(selectedField.type);

  return (
    <div className="w-[30%] bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Fixed Header */}
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {selectedField && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <h2 className="text-lg font-semibold">
              {selectedField ? 'Field Properties' : 'Form Settings'}
            </h2>
          </div>
          {selectedField && (
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMoveField('up')}
                disabled={schema.fields.findIndex((f: FormField) => f.id === selectedField.id) === 0}
              >
                <Move className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDeleteField}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {!selectedField ? (
          /* Form Schema Settings */
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Form Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="form-title">Title</Label>
                  <Input
                    id="form-title"
                    value={schema.title}
                    onChange={(e) => handleSchemaUpdate('title', e.target.value)}
                    placeholder="Enter form title"
                  />
                </div>
                <div>
                  <Label htmlFor="form-description">Description</Label>
                  <Textarea
                    id="form-description"
                    value={schema.description || ''}
                    onChange={(e) => handleSchemaUpdate('description', e.target.value)}
                    placeholder="Enter form description"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Form Fields</CardTitle>
              </CardHeader>
              <CardContent>
                {schema.fields.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No fields added yet. Click &ldquo;Elements&rdquo; to add fields.
                  </p>
                ) : (
                                    <div className="space-y-2">
                    {schema.fields.map((field: FormField) => (
                      <div
                        key={field.id}
                        onClick={() => setSelectedField(field)}
                        className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {field.type}
                            </Badge>
                            <span className="text-sm font-medium">{field.label}</span>
                          </div>
                          <Settings className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Field Properties */
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Badge variant="outline">{selectedField.type}</Badge>
                  <span>Field Properties</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="field-label">Label</Label>
                  <Input
                    id="field-label"
                    value={selectedField.label}
                    onChange={(e) => handleFieldUpdate('label', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="field-description">Description</Label>
                  <Input
                    id="field-description"
                    value={selectedField.description || ''}
                    onChange={(e) => handleFieldUpdate('description', e.target.value)}
                    placeholder="Optional field description"
                  />
                </div>
                {!['heading', 'paragraph'].includes(selectedField.type) && (
                  <div>
                    <Label htmlFor="field-placeholder">Placeholder</Label>
                    <Input
                      id="field-placeholder"
                      value={selectedField.placeholder || ''}
                      onChange={(e) => handleFieldUpdate('placeholder', e.target.value)}
                      placeholder="Enter placeholder text"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Field Options for select/radio/checkbox */}
            {shouldShowOptions && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>Options</span>
                    <Button size="sm" variant="outline" onClick={addFieldOption}>
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedField.options?.map((option: any, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={option.label}
                        onChange={(e) => updateFieldOption(index, 'label', e.target.value)}
                        placeholder="Option label"
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFieldOption(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Field Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="field-size">Field Width</Label>
                  <Select 
                    value={selectedField.size} 
                    onValueChange={(value) => handleFieldUpdate('size', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50%">Half Width (50%)</SelectItem>
                      <SelectItem value="60%">Large (60%)</SelectItem>
                      <SelectItem value="100%">Full Width (100%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {!['heading', 'paragraph'].includes(selectedField.type) && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <Label htmlFor="field-required">Required</Label>
                      <Switch
                        id="field-required"
                        checked={selectedField.validation.required}
                        onCheckedChange={(checked) => 
                          handleFieldUpdate('validation', {
                            ...selectedField.validation,
                            required: checked
                          } as any)
                        }
                      />
                    </div>
                    
                    {['text', 'textarea', 'email'].includes(selectedField.type) && (
                      <>
                        <div>
                          <Label htmlFor="field-min-length">Min Length</Label>
                          <Input
                            id="field-min-length"
                            type="number"
                            value={selectedField.validation.minLength || ''}
                            onChange={(e) => 
                              handleFieldUpdate('validation', {
                                ...selectedField.validation,
                                minLength: e.target.value ? parseInt(e.target.value) : undefined
                              } as any)
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="field-max-length">Max Length</Label>
                          <Input
                            id="field-max-length"
                            type="number"
                            value={selectedField.validation.maxLength || ''}
                            onChange={(e) => 
                              handleFieldUpdate('validation', {
                                ...selectedField.validation,
                                maxLength: e.target.value ? parseInt(e.target.value) : undefined
                              } as any)
                            }
                          />
                        </div>
                      </>
                    )}
                    
                    {selectedField.type === 'number' && (
                      <>
                        <div>
                          <Label htmlFor="field-min">Minimum Value</Label>
                          <Input
                            id="field-min"
                            type="number"
                            value={selectedField.validation.min || ''}
                            onChange={(e) => 
                              handleFieldUpdate('validation', {
                                ...selectedField.validation,
                                min: e.target.value ? parseInt(e.target.value) : undefined
                              } as any)
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="field-max">Maximum Value</Label>
                          <Input
                            id="field-max"
                            type="number"
                            value={selectedField.validation.max || ''}
                            onChange={(e) => 
                              handleFieldUpdate('validation', {
                                ...selectedField.validation,
                                max: e.target.value ? parseInt(e.target.value) : undefined
                              } as any)
                            }
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Fixed Footer */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          {selectedField ? 'Editing field properties' : 'Configure form settings'}
        </div>
      </div>
    </div>
  );
}