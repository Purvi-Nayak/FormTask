// Form Builder Types

export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "number"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "file"
  | "switch"
  | "slider"
  | "heading"
  | "paragraph";

export interface FieldOption {
  label: string;
  value: string;
}

export interface ValidationRule {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  description?: string;
  placeholder?: string;
  options?: FieldOption[];
  size: "50%" | "60%" | "100%";
  validation: ValidationRule;
  order: number;
}

export interface FormSchema {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  theme: FormTheme;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormTheme {
  primaryColor: string;
  secondaryColor: string;
  fontSize: "sm" | "md" | "lg";
  spacing: "compact" | "normal" | "relaxed";
  borderRadius: "none" | "sm" | "md" | "lg";
}

export interface ElementCategory {
  name: string;
  icon: string;
  elements: ElementTemplate[];
}

export interface ElementTemplate {
  type: FieldType;
  label: string;
  icon: string;
  description: string;
}

export interface DragDropResult {
  source: { index: number };
  destination: { index: number } | null;
}
