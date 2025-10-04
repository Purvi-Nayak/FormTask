"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { FormField, FormSchema, FormTheme } from "@/types/form-builder";
import { v4 as uuidv4 } from "uuid";

// Form Builder State
interface FormBuilderState {
  formSchema: FormSchema;
  selectedFieldId: string | null;
  isDragging: boolean;
  previewMode: boolean;
}

// Form Builder Actions
type FormBuilderAction =
  | { type: "SET_FORM_TITLE"; payload: string }
  | { type: "SET_FORM_DESCRIPTION"; payload: string }
  | { type: "ADD_FIELD"; payload: Omit<FormField, "id" | "order"> }
  | { type: "UPDATE_FIELD"; payload: { id: string; field: Partial<FormField> } }
  | { type: "DELETE_FIELD"; payload: string }
  | { type: "REORDER_FIELDS"; payload: FormField[] }
  | { type: "SELECT_FIELD"; payload: string | null }
  | { type: "SET_THEME"; payload: Partial<FormTheme> }
  | { type: "SET_DRAGGING"; payload: boolean }
  | { type: "SET_PREVIEW_MODE"; payload: boolean }
  | { type: "MOVE_FIELD"; payload: { id: string; direction: "up" | "down" } };

// Default theme
const defaultTheme: FormTheme = {
  primaryColor: "#3b82f6",
  secondaryColor: "#6b7280",
  fontSize: "md",
  spacing: "normal",
  borderRadius: "md",
};

// Initial state
const initialState: FormBuilderState = {
  formSchema: {
    id: uuidv4(),
    title: "Untitled Form",
    description: "",
    fields: [],
    theme: defaultTheme,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  selectedFieldId: null,
  isDragging: false,
  previewMode: false,
};

// Reducer
function formBuilderReducer(
  state: FormBuilderState,
  action: FormBuilderAction
): FormBuilderState {
  switch (action.type) {
    case "SET_FORM_TITLE":
      return {
        ...state,
        formSchema: {
          ...state.formSchema,
          title: action.payload,
          updatedAt: new Date(),
        },
      };

    case "SET_FORM_DESCRIPTION":
      return {
        ...state,
        formSchema: {
          ...state.formSchema,
          description: action.payload,
          updatedAt: new Date(),
        },
      };

    case "ADD_FIELD":
      const newField: FormField = {
        ...action.payload,
        id: uuidv4(),
        order: state.formSchema.fields.length,
      };
      return {
        ...state,
        formSchema: {
          ...state.formSchema,
          fields: [...state.formSchema.fields, newField],
          updatedAt: new Date(),
        },
        selectedFieldId: newField.id,
      };

    case "UPDATE_FIELD":
      return {
        ...state,
        formSchema: {
          ...state.formSchema,
          fields: state.formSchema.fields.map((field) =>
            field.id === action.payload.id
              ? { ...field, ...action.payload.field }
              : field
          ),
          updatedAt: new Date(),
        },
      };

    case "DELETE_FIELD":
      return {
        ...state,
        formSchema: {
          ...state.formSchema,
          fields: state.formSchema.fields
            .filter((field) => field.id !== action.payload)
            .map((field, index) => ({ ...field, order: index })),
          updatedAt: new Date(),
        },
        selectedFieldId:
          state.selectedFieldId === action.payload
            ? null
            : state.selectedFieldId,
      };

    case "REORDER_FIELDS":
      return {
        ...state,
        formSchema: {
          ...state.formSchema,
          fields: action.payload.map((field, index) => ({
            ...field,
            order: index,
          })),
          updatedAt: new Date(),
        },
      };

    case "SELECT_FIELD":
      return {
        ...state,
        selectedFieldId: action.payload,
      };

    case "SET_THEME":
      return {
        ...state,
        formSchema: {
          ...state.formSchema,
          theme: { ...state.formSchema.theme, ...action.payload },
          updatedAt: new Date(),
        },
      };

    case "SET_DRAGGING":
      return {
        ...state,
        isDragging: action.payload,
      };

    case "SET_PREVIEW_MODE":
      return {
        ...state,
        previewMode: action.payload,
      };

    case "MOVE_FIELD":
      const { id, direction } = action.payload;
      const fields = [...state.formSchema.fields];
      const currentIndex = fields.findIndex((f) => f.id === id);

      if (currentIndex === -1) return state;

      const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= fields.length) return state;

      // Swap fields
      [fields[currentIndex], fields[newIndex]] = [
        fields[newIndex],
        fields[currentIndex],
      ];

      return {
        ...state,
        formSchema: {
          ...state.formSchema,
          fields: fields.map((field, index) => ({ ...field, order: index })),
          updatedAt: new Date(),
        },
      };

    default:
      return state;
  }
}

// Context
interface FormBuilderContextType {
  state: FormBuilderState;
  schema: FormSchema;
  selectedField: FormField | null;
  isDragging: boolean;
  previewMode: boolean;
  dispatch: React.Dispatch<FormBuilderAction>;
  // Helper methods
  addField: (field: Omit<FormField, "id" | "order">) => void;
  updateField: (id: string, field: Partial<FormField>) => void;
  deleteField: (id: string) => void;
  selectField: (id: string | null) => void;
  setSelectedField: (field: FormField | null) => void;
  reorderFields: (fields: FormField[]) => void;
  setFormTitle: (title: string) => void;
  setFormDescription: (description: string) => void;
  updateSchema: (update: Partial<FormSchema>) => void;
  setTheme: (theme: Partial<FormTheme>) => void;
  setPreviewMode: (preview: boolean) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(
  undefined
);

// Provider component
interface FormBuilderProviderProps {
  children: ReactNode;
  initialForm?: Partial<FormSchema>;
}

export function FormBuilderProvider({
  children,
  initialForm,
}: FormBuilderProviderProps) {
  const [state, dispatch] = useReducer(formBuilderReducer, {
    ...initialState,
    formSchema: initialForm
      ? { ...initialState.formSchema, ...initialForm }
      : initialState.formSchema,
  });

  // Helper methods
  const addField = (field: Omit<FormField, "id" | "order">) => {
    dispatch({ type: "ADD_FIELD", payload: field });
  };

  const updateField = (id: string, field: Partial<FormField>) => {
    dispatch({ type: "UPDATE_FIELD", payload: { id, field } });
  };

  const deleteField = (id: string) => {
    dispatch({ type: "DELETE_FIELD", payload: id });
  };

  const selectField = (id: string | null) => {
    dispatch({ type: "SELECT_FIELD", payload: id });
  };

  const reorderFields = (fields: FormField[]) => {
    dispatch({ type: "REORDER_FIELDS", payload: fields });
  };

  const setFormTitle = (title: string) => {
    dispatch({ type: "SET_FORM_TITLE", payload: title });
  };

  const setFormDescription = (description: string) => {
    dispatch({ type: "SET_FORM_DESCRIPTION", payload: description });
  };

  const setTheme = (theme: Partial<FormTheme>) => {
    dispatch({ type: "SET_THEME", payload: theme });
  };

  const setPreviewMode = (preview: boolean) => {
    dispatch({ type: "SET_PREVIEW_MODE", payload: preview });
  };

  const moveField = (fromIndex: number, toIndex: number) => {
    const fields = [...state.formSchema.fields];
    const [movedField] = fields.splice(fromIndex, 1);
    fields.splice(toIndex, 0, movedField);
    
    // Update orders
    const reorderedFields = fields.map((field, index) => ({
      ...field,
      order: index
    }));
    
    reorderFields(reorderedFields);
  };

  const setSelectedField = (field: FormField | null) => {
    selectField(field?.id || null);
  };

  const updateSchema = (update: Partial<FormSchema>) => {
    if (update.title !== undefined) setFormTitle(update.title);
    if (update.description !== undefined) setFormDescription(update.description);
  };

  // Derived state
  const selectedField = state.selectedFieldId 
    ? state.formSchema.fields.find(f => f.id === state.selectedFieldId) || null
    : null;

  const value = {
    state,
    schema: state.formSchema,
    selectedField,
    isDragging: state.isDragging,
    previewMode: state.previewMode,
    dispatch,
    addField,
    updateField,
    deleteField,
    selectField,
    setSelectedField,
    reorderFields,
    setFormTitle,
    setFormDescription,
    updateSchema,
    setTheme,
    setPreviewMode,
    moveField,
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
}

// Hook to use the context
export function useFormBuilder() {
  const context = useContext(FormBuilderContext);
  if (context === undefined) {
    throw new Error("useFormBuilder must be used within a FormBuilderProvider");
  }
  return context;
}
