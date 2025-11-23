// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:7061";
export const API_ENDPOINTS = {
  GENERATE_DRASHA: "/api/Torah/generate-drasha",
} as const;

// Topic Constants
export const TOPIC_VALUES = {
  WEEKLY_PARASHA: "פרשת שבוע",
} as const;

// UI Constants
export const SPINNER_SIZE = {
  WIDTH: "3rem",
  HEIGHT: "3rem",
} as const;

// Text Constants
export const DEFAULT_LOADER_MESSAGE = "טוען...";
export const DRASHA_LOADER_MESSAGE = "יוצר את דבר התורה שלך...";
export const CREATING_DRASHA_TEXT = "יוצר...";
export const CREATE_DRASHA_BUTTON_TEXT = "צור דבר תורה";

// Modal Constants
export const CONFIRM_MODAL = {
  TITLE: "אישור יצירת דבר תורה חדש",
  MESSAGE: "האם אתה בטוח שברצונך ליצור דבר תורה חדש? דבר התורה הנוכחי יאבד ולא ניתן יהיה לשחזר אותו.",
  CONFIRM_TEXT: "כן, צור חדש",
  CANCEL_TEXT: "ביטול",
} as const;

// Results Section Constants
export const RESULTS_ACTIONS = {
  CREATE_NEW: "✨ צור חדש",
  COPY: "📋 העתק",
  SHARE: "🔗 שתף",
  DOWNLOAD: "⬇️ הורד",
  PRINT: "🖨️ הדפס",
} as const;

export const RESULTS_ACTION_TITLES = {
  CREATE_NEW: "צור דבר תורה חדש",
  COPY: "העתק",
  SHARE: "שתף",
  DOWNLOAD: "הורד",
  PRINT: "הדפס",
} as const;

// Notification Messages
export const NOTIFICATIONS = {
  COPIED_TO_CLIPBOARD: "נשמר ללוח!",
  NO_RESULTS: "לא נמצאו תוצאות",
} as const;

// File Constants
export const FILE_TYPES = {
  TEXT_PLAIN: "text/plain;charset=utf-8",
} as const;

