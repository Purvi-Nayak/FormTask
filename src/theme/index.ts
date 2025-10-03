// Main theme configuration for shadcn/ui

export * from "./colors";
export * from "./utils";
export { default as ThemeProvider, useTheme } from "./provider";

import {
  shadcnColors,
  customColors,
  primaryColors,
  secondaryColors,
  successColors,
  errorColors,
  neutralColors,
} from "./colors";

import {
  spacing,
  typography,
  animations,
  shadows,
  borderRadius,
  breakpoints,
} from "./utils";

// Complete theme configuration
export const theme = {
  colors: {
    ...shadcnColors,
    custom: customColors,
  },
  spacing,
  typography,
  animations,
  shadows,
  borderRadius,
  breakpoints,

  // Layout configuration
  layout: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },

  // Component default configurations
  components: {
    button: {
      sizes: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
      variants: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    card: {
      base: "rounded-xl border bg-card text-card-foreground shadow",
      header: "flex flex-col space-y-1.5 p-6",
      content: "p-6 pt-0",
      footer: "flex items-center p-6 pt-0",
    },
    input: {
      base: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    },
  },

  // Design tokens
  tokens: {
    // Color tokens using your custom palette
    primary: {
      50: `hsl(${primaryColors[50]})`,
      100: `hsl(${primaryColors[100]})`,
      200: `hsl(${primaryColors[200]})`,
      300: `hsl(${primaryColors[300]})`,
      400: `hsl(${primaryColors[400]})`,
      500: `hsl(${primaryColors[500]})`,
      600: `hsl(${primaryColors[600]})`,
      700: `hsl(${primaryColors[700]})`,
      800: `hsl(${primaryColors[800]})`,
      900: `hsl(${primaryColors[900]})`,
    },

    // Semantic tokens
    semantic: {
      success: `hsl(${successColors[500]})`,
      warning: `hsl(${secondaryColors[500]})`,
      error: `hsl(${errorColors[500]})`,
      info: `hsl(${primaryColors[500]})`,
    },

    // Text tokens
    text: {
      primary: `hsl(${neutralColors[900]})`,
      secondary: `hsl(${neutralColors[600]})`,
      muted: `hsl(${neutralColors[400]})`,
      inverse: `hsl(${neutralColors[50]})`,
    },

    // Background tokens
    background: {
      primary: `hsl(${neutralColors[50]})`,
      secondary: `hsl(${neutralColors[100]})`,
      tertiary: `hsl(${neutralColors[200]})`,
      inverse: `hsl(${neutralColors[900]})`,
    },
  },
} as const;

// Export types for TypeScript
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type CustomColors = typeof customColors;
export type ThemeSpacing = typeof spacing;
export type ThemeTypography = typeof typography;

// Utility to get theme value by path
export function getThemeValue(path: string): string {
  return (
    path.split(".").reduce((obj: any, key: string) => obj?.[key], theme) || ""
  );
}

// Default export
export default theme;
