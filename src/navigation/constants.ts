export const SCREEN_NAMES = {
  COW_LIST: 'CowList',
  ADD_COW: 'AddCow',
  COW_DETAIL: 'CowDetail',
} as const;

// Type helper to get screen name types
export type ScreenName = typeof SCREEN_NAMES[keyof typeof SCREEN_NAMES];

