// Hebrew constants for parashot and commentators
export const PARASHOT = {
  "לך לך": "לך לך",
  "וירא": "וירא",
  "חיי שרה": "חיי שרה",
} as const;

export const COMMENTATORS = {
  "רש\"י": "רש\"י",
  "רמב\"ן": "רמב\"ן",
  "ספורנו": "ספורנו",
} as const;

// Mapping from English values to Hebrew display names
export const COMMENTATOR_DISPLAY: Record<string, string> = {
  rashi: "רש\"י",
  ramban: "רמב\"ן",
  sforno: "ספורנו",
};

export const COMMENTATOR_VALUE: Record<string, string> = {
  "רש\"י": "רש\"י",
  "רמב\"ן": "רמב\"ן",
  "ספורנו": "ספורנו",
};

