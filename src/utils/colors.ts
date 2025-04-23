// Color palette for charts and UI elements
export const colors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  secondary: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
    700: '#0F766E',
    800: '#115E59',
    900: '#134E4A',
  },
  accent: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

// Chart color sets for different sectors
export const getChartColors = (index: number = 0) => {
  const colorSets = [
    { bg: colors.primary[400], border: colors.primary[600] },
    { bg: colors.secondary[400], border: colors.secondary[600] },
    { bg: colors.accent[400], border: colors.accent[600] },
    { bg: '#F472B6', border: '#DB2777' }, // Pink
    { bg: '#818CF8', border: '#4F46E5' }, // Indigo
    { bg: '#34D399', border: '#059669' }, // Emerald
    { bg: '#A78BFA', border: '#7C3AED' }, // Violet
    { bg: '#FB7185', border: '#E11D48' }, // Rose
  ];

  return colorSets[index % colorSets.length];
};

// Get a gradient for charts
export const getGradient = (ctx: CanvasRenderingContext2D, chartArea: any, color: string) => {
  if (!ctx || !chartArea) {
    return color;
  }
  
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, color + '80'); // Add transparency
  gradient.addColorStop(1, color);
  return gradient;
};