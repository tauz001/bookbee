export const API_CONFIG = {
  BASE_URL: "http://localhost:3000/api",
  ENDPOINTS: {
    TRIPS: "/trips",
    BOOKINGS: "/bookings",
    HEALTH: "/health",
    CONTACT: "/contact",
    AUTH: "/auth" // ADD THIS
  }
};

export const APP_ROUTES = {
  HOME: "/",
  TRIPS: "/trips",
  BOOKINGS: "/bookings",
  BOOK_TRIP: "/book",
  HOST_NEW: "/host/new",
  HOST_TRIPS: "/host/trips",
  HOST_DASHBOARD: "/host/dashboard",
  PRIVACY_POLICY: "/privacy-policy",
  PROFILE: "/profile", // ADD THIS
  LOGIN: "/login", // ADD THIS
};

export const BOOKING_TYPES = {
  SEAT: "reserveSeat",
  CAB: "reserveCab"
};

export const BOOKING_STATUS = {
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed"
};

export const USER_TYPES = { // ADD THIS
  COMMUTER: "commuter",
  HOST: "host"
};

// Theme configuration (unchanged)
export const THEME = {
  colors: {
    primary: {
      50: "#fefce8",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24", // Main yellow
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f"
    },
    secondary: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a"
    },
    success: {
      50: "#f0fdf4",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a"
    },
    error: {
      50: "#fef2f2",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626"
    }
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem", 
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem"
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem"
  }
};