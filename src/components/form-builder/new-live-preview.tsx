"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormBuilder } from "@/lib/form-builder-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { FormField as FormFieldType, FieldType } from "@/types/form-builder";
import { AlertCircle, Eye } from "lucide-react";

// Create dynamic Zod schema based on form fields
function createFormSchema(fields: FormFieldType[]) {
  const schemaObject: Record<string, z.ZodTypeAny> = {};

  fields.forEach(field => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case "email":
        fieldSchema = field.validation.required 
          ? z.string().email("Please enter a valid email address").min(1, "This field is required")
          : z.string().email("Please enter a valid email address").optional();
        break;
      case "number":
        fieldSchema = field.validation.required 
          ? z.coerce.number({ message: "This field is required" })
          : z.coerce.number().optional();
        break;
      case "checkbox":
        fieldSchema = z.array(z.string()).optional();
        break;
      case "switch":
        fieldSchema = z.boolean().optional();
        break;
      case "date":
        fieldSchema = field.validation.required 
          ? z.string().min(1, "Please select a date")
          : z.string().optional();
        break;
      default:
        fieldSchema = field.validation.required 
          ? z.string().min(1, "This field is required")
          : z.string().optional();
        break;
    }

    schemaObject[field.id] = fieldSchema;
  });

  return z.object(schemaObject);
}

export function LivePreview() {
  const { schema } = useFormBuilder();

  // Create dynamic schema
  const formSchema = createFormSchema(schema.fields);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: schema.fields.reduce((acc: Record<string, any>, field) => {
      if (field.type === 'checkbox') {
        acc[field.id] = [];
      } else if (field.type === 'switch') {
        acc[field.id] = false;
      } else {
        acc[field.id] = '';
      }
      return acc;
    }, {})
  });

  const { register, handleSubmit, formState: { errors, isValid, isDirty }, setValue, watch } = form;

  const onSubmit = (data: Record<string, any>) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  const renderField = (field: FormFieldType) => {
    const fieldError = errors[field.id];
    const fieldValue = watch(field.id);
    
    const fieldClassNames = `w-full transition-all duration-200 ${
      fieldError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
    } ${field.size === '50%' ? 'max-w-[50%]' : field.size === '60%' ? 'max-w-[60%]' : 'max-w-full'}`;

    switch (field.type) {
      case "heading":
        return (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">{field.label}</h3>
            {field.description && (
              <p className="text-sm text-gray-600">{field.description}</p>
            )}
          </div>
        );

      case "paragraph":
        return (
          <div className="space-y-2">
            <p className="text-gray-700">{field.label}</p>
            {field.description && (
              <p className="text-sm text-gray-600">{field.description}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              className={fieldClassNames}
              {...register(field.id)}
            />
            {fieldError && (
              <div className="flex items-center space-x-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{fieldError.message as string}</span>
              </div>
            )}
          </div>
        );

      case "select":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            <Select onValueChange={(value) => setValue(field.id, value)}>
              <SelectTrigger className={fieldClassNames}>
                <SelectValue placeholder={field.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError && (
              <div className="flex items-center space-x-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{fieldError.message as string}</span>
              </div>
            )}
          </div>
        );

      case "radio":
        return (
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            <RadioGroup onValueChange={(value) => setValue(field.id, value)}>
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                  <Label 
                    htmlFor={`${field.id}-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {fieldError && (
              <div className="flex items-center space-x-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{fieldError.message as string}</span>
              </div>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-${option.value}`}
                    onCheckedChange={(checked) => {
                      const currentValues = fieldValue || [];
                      const newValues = checked
                        ? [...currentValues, option.value]
                        : currentValues.filter((v: string) => v !== option.value);
                      setValue(field.id, newValues);
                    }}
                  />
                  <Label 
                    htmlFor={`${field.id}-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {fieldError && (
              <div className="flex items-center space-x-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{fieldError.message as string}</span>
              </div>
            )}
          </div>
        );

      case "switch":
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor={field.id} className="text-sm font-medium">
                  {field.label}
                </Label>
                {field.description && (
                  <p className="text-xs text-gray-500 mt-1">{field.description}</p>
                )}
              </div>
              <Switch
                id={field.id}
                onCheckedChange={(checked) => setValue(field.id, checked)}
              />
            </div>
          </div>
        );

      case "date":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            <Input
              id={field.id}
              type="date"
              className={fieldClassNames}
              {...register(field.id)}
            />
            {fieldError && (
              <div className="flex items-center space-x-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{fieldError.message as string}</span>
              </div>
            )}
          </div>
        );

      case "file":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            <Input
              id={field.id}
              type="file"
              className={fieldClassNames}
              {...register(field.id)}
            />
            {fieldError && (
              <div className="flex items-center space-x-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{fieldError.message as string}</span>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            <Input
              id={field.id}
              type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : 'text'}
              placeholder={field.placeholder}
              className={fieldClassNames}
              {...register(field.id)}
            />
            {fieldError && (
              <div className="flex items-center space-x-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{fieldError.message as string}</span>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-[50%] bg-gray-50 flex flex-col h-full">
      {/* Fixed Header */}
      <div className="border-b border-gray-200 p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold">Live Preview</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isValid ? "default" : "destructive"} className="text-xs">
              {isValid ? "Valid" : "Has Errors"}
            </Badge>
            {isDirty && (
              <Badge variant="outline" className="text-xs">
                Modified
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{schema.title}</CardTitle>
            {schema.description && (
              <p className="text-gray-600 mt-2">{schema.description}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {schema.fields.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No fields added yet.</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Click &ldquo;Elements&rdquo; in the sidebar to add form fields.
                  </p>
                </div>
              ) : (
                <>
                  {schema.fields
                    .sort((a, b) => a.order - b.order)
                    .map((field) => (
                      <div key={field.id} className="form-field">
                        {renderField(field)}
                      </div>
                    ))}
                  
                  <div className="pt-6 border-t">
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={!isValid || schema.fields.length === 0}
                    >
                      Submit Form
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Footer */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="text-xs text-gray-500 text-center">
          Form updates in real-time • {schema.fields.length} field{schema.fields.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}