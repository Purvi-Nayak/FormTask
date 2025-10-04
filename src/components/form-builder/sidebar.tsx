"use client";

import React, { useState } from "react";
import { useFormBuilder } from "@/lib/form-builder-context";
import {
  ELEMENT_CATEGORIES,
  FIELD_TEMPLATES,
  THEME_PRESETS,
} from "@/constants/form-builder";
import { FieldType } from "@/types/form-builder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Palette, Plus } from "lucide-react";

export function FormBuilderSidebar() {
  const { addField, setTheme, state } = useFormBuilder();
  const [activeTab, setActiveTab] = useState("elements");

  const handleElementClick = (type: FieldType) => {
    const template = FIELD_TEMPLATES[type];
    if (template) {
      addField(template);
    }
  };

  const handleThemeSelect = (preset: {
    name: string;
    primaryColor: string;
    secondaryColor: string;
  }) => {
    setTheme({
      primaryColor: preset.primaryColor,
      secondaryColor: preset.secondaryColor,
    });
  };

  return (
    <div className="w-80 bg-white border-r border-gray-700 h-full overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Form Builder
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="elements">Elements</TabsTrigger>
            <TabsTrigger value="themes">Themes</TabsTrigger>
          </TabsList>

          <TabsContent value="elements" className="mt-4 space-y-4">
            <div className="h-[calc(100vh-12rem)] overflow-y-auto space-y-4">
              {ELEMENT_CATEGORIES.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <span>{category.icon}</span>
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    {category.elements.map((element) => (
                      <Button
                        key={element.type}
                        variant="outline"
                        className="w-full justify-start h-auto p-3 text-left hover:bg-blue-50 hover:border-blue-200"
                        onClick={() => handleElementClick(element.type)}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <span className="text-lg">{element.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-900">
                              {element.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {element.description}
                            </div>
                          </div>
                          <Plus className="w-4 h-4 text-gray-400" />
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="themes" className="mt-4 space-y-4">
            <div className="h-[calc(100vh-12rem)] overflow-y-auto space-y-4">
              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Color Themes
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  {THEME_PRESETS.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full justify-start h-auto p-3 hover:bg-gray-50 ${
                        state.formSchema.theme.primaryColor ===
                        preset.primaryColor
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleThemeSelect(preset)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div
                          className="w-6 h-6 rounded-full border border-gray-200"
                          style={{ backgroundColor: preset.primaryColor }}
                        />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm text-gray-900">
                            {preset.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {preset.primaryColor}
                          </div>
                        </div>
                        {state.formSchema.theme.primaryColor ===
                          preset.primaryColor && (
                          <Badge variant="secondary" className="text-xs">
                            Active
                          </Badge>
                        )}
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Current Theme
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        Primary Color
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded border"
                          style={{
                            backgroundColor:
                              state.formSchema.theme.primaryColor,
                          }}
                        />
                        <span className="text-xs font-mono text-gray-800">
                          {state.formSchema.theme.primaryColor}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Font Size</span>
                      <Badge variant="outline" className="text-xs">
                        {state.formSchema.theme.fontSize}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Spacing</span>
                      <Badge variant="outline" className="text-xs">
                        {state.formSchema.theme.spacing}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
