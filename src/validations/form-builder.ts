import { z } from "zod";
import { FormField } from "@/types/form-builder";

// Validation schemas for form builder
export const fieldValidationSchema = z.object({
  required: z.boolean().default(false),
  minLength: z.number().min(0).optional(),
  maxLength: z.number().min(1).optional(),
  pattern: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
});

export const fieldOptionSchema = z.object({
  label: z.string().min(1, "Option label is required"),
  value: z.string().min(1, "Option value is required"),
});

export const formFieldSchema = z.object({
  id: z.string(),
  type: z.enum([
    "text",
    "textarea",
    "email",
    "number",
    "select",
    "radio",
    "checkbox",
    "date",
    "file",
    "switch",
    "slider",
    "heading",
    "paragraph",
  ]),
  label: z.string().min(1, "Field label is required"),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  options: z.array(fieldOptionSchema).optional(),
  size: z.enum(["50%", "60%", "100%"]).default("100%"),
  validation: fieldValidationSchema,
  order: z.number(),
});

export const formThemeSchema = z.object({
  primaryColor: z.string().default("#3b82f6"),
  secondaryColor: z.string().default("#6b7280"),
  fontSize: z.enum(["sm", "md", "lg"]).default("md"),
  spacing: z.enum(["compact", "normal", "relaxed"]).default("normal"),
  borderRadius: z.enum(["none", "sm", "md", "lg"]).default("md"),
});

export const formSchemaValidation = z.object({
  id: z.string(),
  title: z.string().min(1, "Form title is required"),
  description: z.string().optional(),
  fields: z.array(formFieldSchema),
  theme: formThemeSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Form submission schema (dynamic based on form fields)
export const createFormSubmissionSchema = (fields: FormField[]) => {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case "text":
      case "textarea":
      case "email":
        fieldSchema = z.string();
        if (field.validation.required) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            1,
            `${field.label} is required`
          );
        }
        if (field.validation.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            field.validation.minLength,
            `${field.label} must be at least ${field.validation.minLength} characters`
          );
        }
        if (field.validation.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            field.validation.maxLength,
            `${field.label} must be at most ${field.validation.maxLength} characters`
          );
        }
        if (field.type === "email") {
          fieldSchema = (fieldSchema as z.ZodString).email(
            "Please enter a valid email address"
          );
        }
        break;

      case "number":
        fieldSchema = z.number();
        if (field.validation.required) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(
            0,
            `${field.label} is required`
          );
        }
        if (field.validation.min !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(
            field.validation.min,
            `${field.label} must be at least ${field.validation.min}`
          );
        }
        if (field.validation.max !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).max(
            field.validation.max,
            `${field.label} must be at most ${field.validation.max}`
          );
        }
        break;

      case "select":
      case "radio":
        fieldSchema = z.string();
        if (field.validation.required) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            1,
            `${field.label} is required`
          );
        }
        break;

      case "checkbox":
        fieldSchema = z.boolean();
        if (field.validation.required) {
          fieldSchema = (fieldSchema as z.ZodBoolean).refine(
            (val: boolean) => val === true,
            {
              message: `${field.label} must be checked`,
            }
          );
        }
        break;

      case "date":
        fieldSchema = z.date();
        if (field.validation.required) {
          fieldSchema = (fieldSchema as z.ZodDate).refine(
            (val: Date) => val !== null,
            {
              message: `${field.label} is required`,
            }
          );
        }
        break;

      case "file":
        fieldSchema = z.instanceof(FileList).optional();
        if (field.validation.required) {
          fieldSchema = fieldSchema.refine(
            (files: unknown) => files instanceof FileList && files.length > 0,
            `${field.label} is required`
          );
        }
        break;

      default:
        fieldSchema = z.string().optional();
    }

    if (!field.validation.required && field.type !== "checkbox") {
      fieldSchema = fieldSchema.optional();
    }

    schemaShape[field.id] = fieldSchema;
  });

  return z.object(schemaShape);
};

export type FormFieldData = z.infer<typeof formFieldSchema>;
export type FormThemeData = z.infer<typeof formThemeSchema>;
export type FormSchemaData = z.infer<typeof formSchemaValidation>;
