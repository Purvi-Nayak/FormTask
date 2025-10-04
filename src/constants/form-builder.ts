import { FieldType, FormField, ElementCategory } from "@/types/form-builder";

// Default validation for all field types
const defaultValidation = {
  required: false,
  minLength: undefined,
  maxLength: undefined,
  pattern: undefined,
  min: undefined,
  max: undefined,
};

// Form field templates
export const FIELD_TEMPLATES: Record<
  FieldType,
  Omit<FormField, "id" | "order">
> = {
  text: {
    type: "text",
    label: "Text Input",
    description: "",
    placeholder: "Enter text...",
    size: "100%",
    validation: defaultValidation,
  },
  textarea: {
    type: "textarea",
    label: "Text Area",
    description: "",
    placeholder: "Enter your message...",
    size: "100%",
    validation: defaultValidation,
  },
  email: {
    type: "email",
    label: "Email",
    description: "",
    placeholder: "Enter your email...",
    size: "100%",
    validation: { ...defaultValidation, required: true },
  },
  number: {
    type: "number",
    label: "Number Input",
    description: "",
    placeholder: "Enter a number...",
    size: "100%",
    validation: defaultValidation,
  },
  select: {
    type: "select",
    label: "Dropdown",
    description: "",
    placeholder: "Select an option...",
    size: "100%",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    validation: defaultValidation,
  },
  radio: {
    type: "radio",
    label: "Radio Buttons",
    description: "",
    size: "100%",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    validation: defaultValidation,
  },
  checkbox: {
    type: "checkbox",
    label: "Checkbox",
    description: "",
    size: "100%",
    validation: defaultValidation,
  },
  date: {
    type: "date",
    label: "Date Picker",
    description: "",
    size: "100%",
    validation: defaultValidation,
  },
  file: {
    type: "file",
    label: "File Upload",
    description: "",
    size: "100%",
    validation: defaultValidation,
  },
  switch: {
    type: "switch",
    label: "Switch",
    description: "",
    size: "50%",
    validation: defaultValidation,
  },
  slider: {
    type: "slider",
    label: "Slider",
    description: "",
    size: "100%",
    validation: { ...defaultValidation, min: 0, max: 100 },
  },
  heading: {
    type: "heading",
    label: "Heading",
    description: "",
    size: "100%",
    validation: defaultValidation,
  },
  paragraph: {
    type: "paragraph",
    label: "Paragraph",
    description: "",
    size: "100%",
    validation: defaultValidation,
  },
};

// Element categories for the sidebar
export const ELEMENT_CATEGORIES: ElementCategory[] = [
  {
    name: "Input Fields",
    icon: "📝",
    elements: [
      {
        type: "text",
        label: "Text Input",
        icon: "📝",
        description: "Single line text input",
      },
      {
        type: "textarea",
        label: "Text Area",
        icon: "📄",
        description: "Multi-line text input",
      },
      {
        type: "email",
        label: "Email",
        icon: "📧",
        description: "Email address input",
      },
      {
        type: "number",
        label: "Number Input",
        icon: "🔢",
        description: "Numeric input field",
      },
    ],
  },
  {
    name: "Selection Fields",
    icon: "☑️",
    elements: [
      {
        type: "select",
        label: "Dropdown",
        icon: "📋",
        description: "Dropdown selection",
      },
      {
        type: "radio",
        label: "Radio Buttons",
        icon: "🔘",
        description: "Single choice selection",
      },
      {
        type: "checkbox",
        label: "Checkbox",
        icon: "☑️",
        description: "True/false selection",
      },
    ],
  },
  {
    name: "Special Fields",
    icon: "⚡",
    elements: [
      {
        type: "date",
        label: "Date Picker",
        icon: "📅",
        description: "Date selection",
      },
      {
        type: "file",
        label: "File Upload",
        icon: "📎",
        description: "File upload field",
      },
      {
        type: "switch",
        label: "Switch",
        icon: "🔄",
        description: "Toggle switch",
      },
      {
        type: "slider",
        label: "Slider",
        icon: "🎚️",
        description: "Range slider",
      },
    ],
  },
  {
    name: "Layout Elements",
    icon: "📐",
    elements: [
      {
        type: "heading",
        label: "Heading",
        icon: "📖",
        description: "Section heading",
      },
      {
        type: "paragraph",
        label: "Paragraph",
        icon: "📃",
        description: "Text paragraph",
      },
    ],
  },
];

// Theme presets
export const THEME_PRESETS = [
  {
    name: "Blue",
    primaryColor: "#3b82f6",
    secondaryColor: "#6b7280",
  },
  {
    name: "Green",
    primaryColor: "#10b981",
    secondaryColor: "#6b7280",
  },
  {
    name: "Purple",
    primaryColor: "#8b5cf6",
    secondaryColor: "#6b7280",
  },
  {
    name: "Red",
    primaryColor: "#ef4444",
    secondaryColor: "#6b7280",
  },
  {
    name: "Orange",
    primaryColor: "#f97316",
    secondaryColor: "#6b7280",
  },
  {
    name: "Teal",
    primaryColor: "#14b8a6",
    secondaryColor: "#6b7280",
  },
];

// Size options
export const SIZE_OPTIONS = [
  { label: "Half Width (50%)", value: "50%" as const },
  { label: "Medium (60%)", value: "60%" as const },
  { label: "Full Width (100%)", value: "100%" as const },
];

// Font size options
export const FONT_SIZE_OPTIONS = [
  { label: "Small", value: "sm" as const },
  { label: "Medium", value: "md" as const },
  { label: "Large", value: "lg" as const },
];

// Spacing options
export const SPACING_OPTIONS = [
  { label: "Compact", value: "compact" as const },
  { label: "Normal", value: "normal" as const },
  { label: "Relaxed", value: "relaxed" as const },
];

// Border radius options
export const BORDER_RADIUS_OPTIONS = [
  { label: "None", value: "none" as const },
  { label: "Small", value: "sm" as const },
  { label: "Medium", value: "md" as const },
  { label: "Large", value: "lg" as const },
];

// Field types for form editor (extracted from ELEMENT_CATEGORIES)
export const FIELD_TYPES = [
  {
    type: "text" as const,
    name: "Text Input",
    description: "Single line text input",
    icon: "📝",
    category: "input",
  },
  {
    type: "textarea" as const,
    name: "Text Area",
    description: "Multi-line text input",
    icon: "📄",
    category: "input",
  },
  {
    type: "email" as const,
    name: "Email",
    description: "Email address input",
    icon: "📧",
    category: "input",
  },
  {
    type: "number" as const,
    name: "Number",
    description: "Numeric input",
    icon: "🔢",
    category: "input",
  },
  {
    type: "select" as const,
    name: "Select",
    description: "Dropdown selection",
    icon: "📋",
    category: "selection",
  },
  {
    type: "radio" as const,
    name: "Radio Group",
    description: "Single choice selection",
    icon: "⚪",
    category: "selection",
  },
  {
    type: "checkbox" as const,
    name: "Checkbox",
    description: "True/false selection",
    icon: "☑️",
    category: "selection",
  },
  {
    type: "date" as const,
    name: "Date",
    description: "Date picker",
    icon: "📅",
    category: "special",
  },
  {
    type: "file" as const,
    name: "File Upload",
    description: "File upload input",
    icon: "📁",
    category: "special",
  },
];

// Export as default for compatibility
export default FIELD_TYPES;
