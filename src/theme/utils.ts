import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Main utility function for combining classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Color utility functions
export function hsl(hslString: string) {
  return `hsl(${hslString})`;
}

// Theme-aware color function
export function getThemeColor(
  colorKey: string,
  theme: "light" | "dark" = "light"
) {
  const colors = {
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      primary: "208 100% 47%",
      secondary: "240 4.8% 95.9%",
      muted: "240 4.8% 95.9%",
      accent: "240 4.8% 95.9%",
      destructive: "0 84% 60%",
      border: "240 5.9% 90%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      primary: "210 40% 98%",
      secondary: "240 3.7% 15.9%",
      muted: "240 3.7% 15.9%",
      accent: "240 3.7% 15.9%",
      destructive: "0 62.8% 30.6%",
      border: "240 3.7% 15.9%",
    },
  };

  return colors[theme][colorKey as keyof typeof colors.light] || colorKey;
}

// Responsive utilities
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Spacing utilities
export const spacing = {
  xs: "0.5rem", // 8px
  sm: "1rem", // 16px
  md: "1.5rem", // 24px
  lg: "2rem", // 32px
  xl: "3rem", // 48px
  "2xl": "4rem", // 64px
} as const;

// Typography utilities
export const typography = {
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
} as const;

// Animation utilities
export const animations = {
  transition: {
    fast: "150ms ease-in-out",
    normal: "200ms ease-in-out",
    slow: "300ms ease-in-out",
  },
  easing: {
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

// Shadow utilities
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
} as const;

// Border radius utilities
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  base: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  full: "9999px",
} as const;

// Helper function to create responsive classes
export function responsive(
  base: string,
  breakpoint?: keyof typeof breakpoints
) {
  if (!breakpoint) return base;
  return `${breakpoint}:${base}`;
}

// Helper function for conditional classes
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass?: string
) {
  return condition ? trueClass : falseClass || "";
}

// CSS-in-JS style object to Tailwind class converter helper
export function styleToClass(styles: Record<string, string | number>) {
  // This is a simplified example - you might want to expand this
  const classMap: Record<string, string> = {
    display: "block",
    padding: "p-4",
    margin: "m-4",
    // Add more mappings as needed
  };

  return Object.entries(styles)
    .map(([key, value]) => classMap[key] || "")
    .filter(Boolean)
    .join(" ");
}
