// shadcn/ui color system using HSL values

// Primary brand colors - Modern blue palette
export const primaryColors = {
  50: "214 100% 97%", // #E7F5FF
  100: "213 100% 93%", // #D0EBFF
  200: "212 100% 87%", // #A5D8FF
  300: "211 96% 78%", // #74C0FC
  400: "209 95% 68%", // #339AF0
  500: "208 100% 47%", // #228BE6 - Primary
  600: "208 100% 44%", // #1C7ED6
  700: "209 100% 41%", // #1971C2
  800: "209 100% 37%", // #1864AB
  900: "210 100% 33%", // #145A94
};

// Secondary colors - Sophisticated purple palette
export const secondaryColors = {
  50: "252 100% 97%", // #F3F0FF
  100: "251 91% 95%", // #E5DBFF
  200: "251 95% 85%", // #D0BFFF
  300: "252 94% 85%", // #B197FC
  400: "252 86% 70%", // #9775FA
  500: "258 90% 66%", // #845EF7
  600: "258 100% 52%", // #7950F2
  700: "259 83% 61%", // #7048E8
  800: "263 70% 50%", // #6741D9
  900: "263 69% 42%", // #5F3DC4
};

// Success colors - Fresh green palette
export const successColors = {
  50: "151 81% 96%", // #ECFDF5
  100: "149 80% 90%", // #D1FAE5
  200: "152 76% 80%", // #A7F3D0
  300: "156 72% 67%", // #6EE7B7
  400: "158 64% 52%", // #34D399
  500: "160 84% 39%", // #10B981
  600: "161 94% 30%", // #059669
  700: "162 93% 24%", // #047857
  800: "163 88% 20%", // #065F46
  900: "164 86% 16%", // #064E3B
};

// Error colors - Bold red palette
export const errorColors = {
  50: "0 86% 97%", // #FEF2F2
  100: "0 93% 94%", // #FEE2E2
  200: "0 96% 89%", // #FECACA
  300: "0 94% 82%", // #FCA5A5
  400: "0 91% 71%", // #F87171
  500: "0 84% 60%", // #EF4444
  600: "0 72% 51%", // #DC2626
  700: "0 74% 42%", // #B91C1C
  800: "0 70% 35%", // #991B1B
  900: "0 63% 31%", // #7F1D1D
};

// Neutral colors - Modern gray palette
export const neutralColors = {
  50: "0 0% 98%", // #FAFAFA
  100: "240 5% 96%", // #F4F4F5
  200: "240 6% 90%", // #E4E4E7
  300: "240 5% 84%", // #D4D4D8
  400: "240 4% 67%", // #A1A1AA
  500: "240 4% 46%", // #71717A
  600: "240 5% 34%", // #52525B
  700: "240 5% 26%", // #3F3F46
  800: "240 4% 16%", // #27272A
  900: "240 6% 10%", // #18181B
};

// shadcn/ui semantic color system
export const shadcnColors = {
  // Light theme
  light: {
    background: "0 0% 100%", // white
    foreground: "240 10% 3.9%", // near black
    card: "0 0% 100%", // white
    cardForeground: "240 10% 3.9%", // near black
    popover: "0 0% 100%", // white
    popoverForeground: "240 10% 3.9%", // near black
    primary: primaryColors[500], // blue-500
    primaryForeground: "210 40% 98%", // light blue
    secondary: "240 4.8% 95.9%", // gray-100
    secondaryForeground: "240 5.9% 10%", // gray-900
    muted: "240 4.8% 95.9%", // gray-100
    mutedForeground: "240 3.8% 46.1%", // gray-500
    accent: "240 4.8% 95.9%", // gray-100
    accentForeground: "240 5.9% 10%", // gray-900
    destructive: errorColors[500], // red-500
    destructiveForeground: "210 40% 98%", // light
    border: "240 5.9% 90%", // gray-200
    input: "240 5.9% 90%", // gray-200
    ring: primaryColors[500], // blue-500
    radius: "0.5rem",
  },

  // Dark theme
  dark: {
    background: "240 10% 3.9%", // very dark gray
    foreground: "0 0% 98%", // near white
    card: "240 10% 3.9%", // very dark gray
    cardForeground: "0 0% 98%", // near white
    popover: "240 10% 3.9%", // very dark gray
    popoverForeground: "0 0% 98%", // near white
    primary: "210 40% 98%", // light blue
    primaryForeground: "222.2 84% 4.9%", // dark blue
    secondary: "240 3.7% 15.9%", // dark gray
    secondaryForeground: "0 0% 98%", // near white
    muted: "240 3.7% 15.9%", // dark gray
    mutedForeground: "240 5% 64.9%", // medium gray
    accent: "240 3.7% 15.9%", // dark gray
    accentForeground: "0 0% 98%", // near white
    destructive: "0 62.8% 30.6%", // dark red
    destructiveForeground: "210 40% 98%", // light
    border: "240 3.7% 15.9%", // dark gray
    input: "240 3.7% 15.9%", // dark gray
    ring: "212.7 26.8% 83.9%", // light blue
    radius: "0.5rem",
  },
};

// Custom color palette for your app
export const customColors = {
  primary: primaryColors,
  secondary: secondaryColors,
  success: successColors,
  error: errorColors,
  neutral: neutralColors,
};

// Export individual color functions for easy use
export const getColor = (
  color: keyof typeof customColors,
  shade: keyof typeof primaryColors
) => {
  return `hsl(${customColors[color][shade]})`;
};
