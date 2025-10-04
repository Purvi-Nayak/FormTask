"use client";

import React from "react";
import { FormBuilderProvider } from "@/lib/form-builder-context";
import { SimpleSidebar } from "./new-sidebar";
import { CenterEditor } from "./new-center-editor";
import { LivePreview } from "./new-live-preview";

export default function FormBuilder() {
  return (
    <FormBuilderProvider>
      <div className="h-screen bg-gray-100 flex overflow-hidden">
        {/* Left Sidebar - 20% */}
        <SimpleSidebar />
        
        {/* Center Editor - 30% */}
        <CenterEditor />
        
        {/* Right Preview - 50% */}
        <LivePreview />
      </div>
    </FormBuilderProvider>
  );
}
